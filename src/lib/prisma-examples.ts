import prisma from './prisma';
import { PrismaUtils, userBasicSelect, albumBasicSelect } from './prisma-utils';

/**
 * Query optimization examples - reference implementations
 *
 * This file contains examples of how to optimize your Prisma queries
 * using the utilities from prisma-utils.ts
 */

/**
 * Example 1: Use select to avoid over-fetching
 * Only get the fields you actually need
 */
export async function getOptimizedUserProfile(username: string) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: {
			...userBasicSelect,
			bio: true,
			coverImage: true,
			isProfilePrivate: true,
			followers: {
				select: {
					follower: { select: userBasicSelect },
				},
				take: 3, // Limit related records
			},
			following: {
				select: {
					following: { select: userBasicSelect },
				},
				take: 3, // Limit related records
			},
			createdAt: true,
		},
	});

	return user;
}

/**
 * Example 2: Use include strategically for related data
 * Only when needed and with limits on the number of records
 */
export async function getCirclesWithLimitedMembers(userId: number) {
	const circles = await prisma.circle.findMany({
		where: {
			members: {
				some: {
					userId,
				},
			},
		},
		include: {
			members: {
				take: 5, // Limit to 5 members preview
				include: {
					user: {
						select: userBasicSelect,
					},
				},
			},
			_count: {
				select: { members: true }, // Get total count efficiently
			},
		},
	});

	return circles;
}

/**
 * Example 3: Use batched queries to avoid N+1 problems
 */
export async function getUsersWithAlbums(userIds: number[]) {
	// First get all users in a single query
	const users = await prisma.user.findMany({
		where: {
			id: {
				in: userIds,
			},
		},
		select: {
			...userBasicSelect,
			bio: true,
		},
	});	// Then get all albums for these users in a single query instead of one query per user
	const albumLoader = PrismaUtils.createBatchLoader(
		async (ids: number[]) => {
			return prisma.album.findMany({
				where: {
					creatorId: {
						in: ids,
					},
					isPrivate: false,
				},
				select: {
					...albumBasicSelect,
					creatorId: true,
				},
				orderBy: { createdAt: 'desc' },
				take: 10, // Only get the 10 most recent albums per user
			});
		},
		album => album.creatorId as number
	);

	// Load all albums at once
	const albumsMap = await albumLoader(userIds);

	// Combine the data
	const result = users.map(user => ({
		...user,
		albums: albumsMap.get(user.id) || [],
	}));

	return result;
}

/**
 * Example 4: Use cursor-based pagination for large collections
 */
export async function getPaginatedAlbums(userId: number, cursor?: number) {
	return PrismaUtils.paginateCursor(prisma.album, {
		take: 12,
		cursor,
		where: {
			creatorId: userId,
		},
		include: {
			_count: {
				select: { Photo: true },
			},
		},
	});
}

/**
 * Example 5: Use transactions for multiple operations
 */
export async function createAlbumWithPhotos(userId: number, albumData: { title: string; description?: string; isPrivate: boolean }, photosData: { url: string; description?: string }[]) {
	// Use transaction to ensure all operations succeed or fail together
	return PrismaUtils.transaction(async tx => {
		// Create album
		const album = await tx.album.create({
			data: {
				...albumData,
				creatorId: userId,
				coverImage: photosData.length > 0 ? photosData[0].url : undefined,
			},
		});

		// Create all photos in a single transaction
		if (photosData.length > 0) {
			await tx.photo.createMany({
				data: photosData.map(photo => ({
					...photo,
					albumId: album.id,
					updatedAt: new Date(),
				})),
			});
		}

		return album;
	});
}

/**
 * Example 6: Use createMany for bulk operations
 */
export async function addMultipleMembersToCircle(circleId: number, userIds: number[]) {
	// Check for existing memberships to avoid conflicts
	const existingMemberships = await prisma.membership.findMany({
		where: {
			circleId,
			userId: { in: userIds },
		},
		select: { userId: true },
	});

	const existingUserIds = new Set(existingMemberships.map(m => m.userId));

	// Filter out users that are already members
	const newUserIds = userIds.filter(id => !existingUserIds.has(id));

	if (newUserIds.length === 0) {
		return { count: 0 };
	}

	// Add all new members in a single query
	return prisma.membership.createMany({
		data: newUserIds.map(userId => ({
			circleId,
			userId,
			role: 'MEMBER',
		})),
	});
}
