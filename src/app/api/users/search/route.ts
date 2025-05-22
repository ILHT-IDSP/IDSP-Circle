import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

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

		if (!term || term.trim().length < 2) {
			// Return top users instead of empty array when no search term
			const topUsers = await prisma.user.findMany({
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

			// Get all users the current user is following
			const followings = await prisma.follow.findMany({
				where: {
					followerId: currentUserId,
				},
				select: {
					followingId: true,
				},
			});

			const followingIds = followings.map(follow => follow.followingId);

			return NextResponse.json({
				users: topUsers.map(user => ({
					id: user.id,
					username: user.username,
					name: user.name,
					profileImage: user.profileImage,
					isPrivate: user.isProfilePrivate,
					isFollowing: followingIds.includes(user.id), // Add follow status
				})),
			});
		}

		// Search users by username or name
		const users = await prisma.user.findMany({
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
			take: 20, // Increased limit
		});

		// Get all users the current user is following
		const followings = await prisma.follow.findMany({
			where: {
				followerId: currentUserId,
			},
			select: {
				followingId: true,
			},
		});

		const followingIds = followings.map(follow => follow.followingId);

		return NextResponse.json({
			users: users.map(user => ({
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
