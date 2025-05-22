import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: NextRequest, { params }) {
	try {
		const session = await auth();
		const currentUserId = session?.user?.id ? parseInt(session.user.id) : null;
		const resolvedParams = await params;
		const { username } = resolvedParams;

		// Find the user by username
		const user = await prisma.user.findUnique({
			where: { username },
			select: {
				id: true,
				isProfilePrivate: true,
				followers: {
					select: {
						followerId: true,
					},
				},
			},
		});

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// Check if user has private profile
		const isPrivate = user.isProfilePrivate;
		const isOwnProfile = currentUserId === user.id;
		const isFollowing = currentUserId ? user.followers.some(follower => follower.followerId === currentUserId) : false;

		// For private profiles, check if current user is allowed to see following
		if (isPrivate && !isFollowing && !isOwnProfile) {
			return NextResponse.json(
				{
					error: 'This user has a private profile. Follow them to see who they follow.',
					isPrivate: true,
					isOwnProfile,
				},
				{ status: 403 }
			);
		}

		// Get users that the profile user is following
		const following = await prisma.follow.findMany({
			where: { followerId: user.id },
			include: {
				following: {
					select: {
						id: true,
						username: true,
						name: true,
						profileImage: true,
					},
				},
			},
		});

		// If logged in, get current user's followings to determine isFollowing status
		let currentUserFollowings: number[] = [];
		if (currentUserId) {
			const followings = await prisma.follow.findMany({
				where: { followerId: currentUserId },
				select: { followingId: true },
			});
			currentUserFollowings = followings.map(f => f.followingId);
		}

		const formattedFollowing = following.map(f => ({
			id: f.following.id,
			username: f.following.username,
			name: f.following.name,
			profileImage: f.following.profileImage,
			isFollowing: currentUserFollowings.includes(f.following.id),
		}));

		return NextResponse.json(formattedFollowing);
	} catch (error) {
		console.error('Error fetching following:', error);
		return NextResponse.json({ error: 'Failed to fetch following' }, { status: 500 });
	}
}
