import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: Request) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const currentUserId = parseInt(session.user.id, 10);
		const url = new URL(request.url);
		const searchQuery = url.searchParams.get('q');
		const page = parseInt(url.searchParams.get('page') || '1', 10);
		const limit = parseInt(url.searchParams.get('limit') || '20', 10);
		const skip = (page - 1) * limit;

		let users;
		if (searchQuery) {
			// Search by name or username (case-insensitive)
			users = await prisma.user.findMany({
				where: {
					OR: [
						{
							name: {
								contains: searchQuery,
								mode: 'insensitive',
							},
						},
						{
							username: {
								contains: searchQuery,
								mode: 'insensitive',
							},
						},
					],
					NOT: {
						id: currentUserId, // Exclude current user
					},
				},
				select: {
					id: true,
					name: true,
					username: true,
					profileImage: true,
				},
				take: limit,
				skip: skip,
			});
		} else {
			// Return all users if no search query is provided
			users = await prisma.user.findMany({
				where: {
					NOT: {
						id: currentUserId, // Exclude current user
					},
				},
				select: {
					id: true,
					name: true,
					username: true,
					profileImage: true,
				},
				orderBy: {
					createdAt: 'desc', // Newest users first
				},
				take: limit,
				skip: skip,
			});
		}

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

		// Add isFollowing flag to each user
		const usersWithFollowStatus = users.map(user => ({
			...user,
			isFollowing: followingIds.includes(user.id),
		}));

		return NextResponse.json(usersWithFollowStatus);
	} catch (error) {
		console.error('Error fetching users:', error);
		return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
	}
}
