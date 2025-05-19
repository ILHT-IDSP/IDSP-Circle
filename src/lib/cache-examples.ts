import prisma from './prisma';
import { cacheFn, clearCache, clearCachePattern } from './cache';

/**
 * Cache key generators for different entity types
 */
const cacheKeys = {
	user: (id: number) => `user:${id}`,
	userByUsername: (username: string) => `user:username:${username}`,
	circle: (id: number) => `circle:${id}`,
	album: (id: number) => `album:${id}`,
	userAlbums: (userId: number) => `user:${userId}:albums`,
	circleAlbums: (circleId: number) => `circle:${circleId}:albums`,
	userCircles: (userId: number) => `user:${userId}:circles`,
};

/**
 * Cache durations for different entity types (in seconds)
 */
const cacheDurations = {
	user: 3600, // 1 hour
	circle: 3600, // 1 hour
	album: 1800, // 30 minutes
	userAlbums: 900, // 15 minutes
	circleAlbums: 900, // 15 minutes
	userCircles: 900, // 15 minutes
	// Add more cache durations as needed
};

/**
 * Example 1: Cache user profile
 */
export async function getCachedUserProfile(username: string) {
	return cacheFn(cacheKeys.userByUsername(username), cacheDurations.user, async () => {
		return prisma.user.findUnique({
			where: { username },
			include: {
				settings: true,
				_count: {
					select: {
						followers: true,
						following: true,
						Album: true,
					},
				},
			},
		});
	});
}

/**
 * Example 2: Cache circle details
 */
export async function getCachedCircle(circleId: number) {
	return cacheFn(cacheKeys.circle(circleId), cacheDurations.circle, async () => {
		return prisma.circle.findUnique({
			where: { id: circleId },
			include: {
				creator: {
					select: {
						id: true,
						username: true,
						name: true,
						profileImage: true,
					},
				},
				_count: {
					select: { members: true, posts: true, Album: true },
				},
			},
		});
	});
}

/**
 * Example 3: Cache user's albums
 */
export async function getCachedUserAlbums(userId: number) {
	return cacheFn(cacheKeys.userAlbums(userId), cacheDurations.userAlbums, async () => {
		return prisma.album.findMany({
			where: {
				creatorId: userId,
				isPrivate: false,
			},
			orderBy: { createdAt: 'desc' },
			include: {
				_count: {
					select: { Photo: true },
				},
			},
		});
	});
}

/**
 * Example 4: Update user and invalidate related caches
 */
export async function updateUserAndInvalidateCache(userId: number, data: { name?: string; bio?: string; profileImage?: string; coverImage?: string }) {
	// Update the user
	const user = await prisma.user.update({
		where: { id: userId },
		data,
		select: {
			id: true,
			username: true,
		},
	});

	// Invalidate user cache
	await clearCache(cacheKeys.user(userId));
	await clearCache(cacheKeys.userByUsername(user.username));

	// Invalidate related caches that might contain this user's data
	await clearCachePattern(`user:${userId}:*`);

	return user;
}

/**
 * Example 5: Create a new album and invalidate related caches
 */
export async function createAlbumAndInvalidateCache(userId: number, circleId: number | null, albumData: { title: string; description?: string; isPrivate: boolean }) {
	// Create the album
	const album = await prisma.album.create({
		data: {
			...albumData,
			creatorId: userId,
			circleId,
		},
	});

	// Invalidate related caches
	if (userId) {
		await clearCache(cacheKeys.userAlbums(userId));
	}

	if (circleId) {
		await clearCache(cacheKeys.circleAlbums(circleId));
	}

	return album;
}
