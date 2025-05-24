import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { PrismaUtils } from '@/lib/prisma-utils';

export async function GET(request: NextRequest) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const currentUserId = parseInt(session.user.id, 10);

		// Get the search term from the query parameters
		const searchParams = request.nextUrl.searchParams;
		const term = searchParams.get('term');

		// OPTIMIZATION: Use transaction to batch user search and follow status queries
		const result = await PrismaUtils.transaction(async tx => {
			let userQuery;

			if (!term || term.trim().length < 2) {
				// Return top users when no search term
				userQuery = tx.user.findMany({
					where: {
						NOT: {
							id: currentUserId, // Exclude the current user
						},
					},
					select: {
						id: true,
						username: true,
						name: true,
						profileImage: true,
						isProfilePrivate: true,
					},
					orderBy: {
						createdAt: 'desc', // Newest users first
					},
					take: 20, // Limit results
				});
			} else {
				// Search users by username or name
				userQuery = tx.user.findMany({
					where: {
						OR: [{ username: { contains: term, mode: 'insensitive' } }, { name: { contains: term, mode: 'insensitive' } }],
						NOT: {
							id: currentUserId, // Exclude the current user
						},
					},
					select: {
						id: true,
						username: true,
						name: true,
						profileImage: true,
						isProfilePrivate: true,
					},
					take: 20, // Limit results
				});
			}

			// OPTIMIZATION: Batch user search and follow status queries
			const [users, followings] = await Promise.all([
				userQuery,
				// Get all users the current user is following
				tx.follow.findMany({
					where: {
						followerId: currentUserId,
					},
					select: {
						followingId: true,
					},
				}),
			]);

			return { users, followings };
		});

		const followingIds = result.followings.map(follow => follow.followingId);

		return NextResponse.json({
			users: result.users.map(user => ({
				id: user.id,
				username: user.username,
				name: user.name,
				profileImage: user.profileImage,
				isPrivate: user.isProfilePrivate,
				isFollowing: followingIds.includes(user.id), // Add follow status
			})),
		});
	} catch (error) {
		console.error('Error searching users:', error);
		return NextResponse.json({ error: 'Failed to search users' }, { status: 500 });
	}
}
