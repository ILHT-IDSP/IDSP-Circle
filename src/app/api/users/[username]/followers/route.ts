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

		// For private profiles, check if current user is allowed to see followers
		if (isPrivate && !isFollowing && !isOwnProfile) {
			return NextResponse.json(
				{
					error: 'This user has a private profile. Follow them to see their followers.',
					isPrivate: true,
					isOwnProfile
				},
				{ status: 403 }
			);
		}

		// Get followers of the user
		const followers = await prisma.follow.findMany({
			where: { followingId: user.id },
			include: {
				follower: {
					select: {
						id: true,
						username: true,
						name: true,
						profileImage: true,
					},
				},
			},
		});

		const formattedFollowers = followers.map(f => ({
			id: f.follower.id,
			username: f.follower.username,
			name: f.follower.name,
			profileImage: f.follower.profileImage,
		}));

		return NextResponse.json(formattedFollowers);
	} catch (error) {
		console.error('Error fetching followers:', error);
		return NextResponse.json({ error: 'Failed to fetch followers' }, { status: 500 });
	}
}
