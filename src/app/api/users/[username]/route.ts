import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
	try {
		const resolvedParams = await params;
		const username = resolvedParams.username;
		const session = await auth();

		// Get the user data
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
			select: {
				id: true,
				username: true,
				name: true,
				bio: true,
				profileImage: true,
				coverImage: true,
				isProfilePrivate: true,
				_count: {
					select: {
						createdCircles: true,
						Album: true,
						followers: true,
						following: true,
					},
				},
			},
		});

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// Check if the current user is following the profile user
		let isFollowing = false;
		if (session?.user) {
			const followRecord = await prisma.follow.findFirst({
				where: {
					followerId: parseInt(session.user.id),
					followingId: user.id,
				},
			});
			isFollowing = !!followRecord;
		}

		// Format response
		const responseData = {
			id: user.id,
			username: user.username,
			name: user.name,
			bio: user.bio,
			profileImage: user.profileImage,
			coverImage: user.coverImage,
			isProfilePrivate: user.isProfilePrivate,
			circlesCount: user._count.createdCircles,
			albumsCount: user._count.Album,
			followersCount: user._count.followers,
			followingCount: user._count.following,
			isFollowing,
			isOwnProfile: session?.user ? parseInt(session.user.id) === user.id : false,
		};

		return NextResponse.json(responseData);
	} catch (error) {
		console.error('Error fetching user:', error);
		return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
	}
}
