import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { PrismaUtils } from '@/lib/prisma-utils';

export async function GET(request: Request) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const currentUserId = parseInt(session.user.id, 10);
		const url = new URL(request.url);
		const searchQuery = url.searchParams.get('q')?.trim();
		const page = parseInt(url.searchParams.get('page') || '1', 10);
		const limit = Math.min(parseInt(url.searchParams.get('limit') || '20', 10), 50); // Cap limit at 50
		const skip = (page - 1) * limit;

		// OPTIMIZATION: Use transaction to batch all queries
		const result = await PrismaUtils.transaction(async tx => {
			let users;

			if (searchQuery && searchQuery.length >= 2) {
				// OPTIMIZATION: Single query with OR conditions instead of separate queries
				users = await tx.user.findMany({
					where: {
						AND: [
							{
								OR: [{ username: { contains: searchQuery, mode: 'insensitive' } }, { name: { contains: searchQuery, mode: 'insensitive' } }],
							},
							{ id: { not: currentUserId } }, // Exclude current user
						],
					},
					select: {
						id: true,
						name: true,
						username: true,
						profileImage: true,
						isProfilePrivate: true,
						// OPTIMIZATION: Get follower/following counts efficiently
						_count: {
							select: {
								followers: true,
								following: true,
							},
						},
					},
					orderBy: [
						// OPTIMIZATION: Better ordering for search relevance
						{ username: 'asc' },
						{ name: 'asc' },
					],
					take: limit,
					skip: skip,
				});
			} else {
				// Return recent users if no search query
				users = await tx.user.findMany({
					where: {
						id: { not: currentUserId },
					},
					select: {
						id: true,
						name: true,
						username: true,
						profileImage: true,
						isProfilePrivate: true,
						_count: {
							select: {
								followers: true,
								following: true,
							},
						},
					},
					orderBy: { createdAt: 'desc' },
					take: limit,
					skip: skip,
				});
			}

			// OPTIMIZATION: Single query to get all following relationships
			// Instead of checking each user individually
			const userIds = users.map(user => user.id);
			const followingRelations = await tx.follow.findMany({
				where: {
					followerId: currentUserId,
					followingId: { in: userIds },
				},
				select: { followingId: true },
			});

			return { users, followingRelations };
		});

		// OPTIMIZATION: Create a Set for O(1) lookup instead of array.includes()
		const followingIds = new Set(result.followingRelations.map(f => f.followingId));

		// OPTIMIZATION: Transform data efficiently without additional queries
		const transformedUsers = result.users.map(user => ({
			id: user.id,
			username: user.username,
			name: user.name,
			profileImage: user.profileImage,
			isPrivate: user.isProfilePrivate,
			isFollowing: followingIds.has(user.id),
			followerCount: user._count.followers,
			followingCount: user._count.following,
		}));

		return NextResponse.json({
			users: transformedUsers,
			pagination: {
				page,
				limit,
				hasMore: result.users.length === limit, // Simple way to check if there are more results
			},
		});
	} catch (error) {
		console.error('Error searching users:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
