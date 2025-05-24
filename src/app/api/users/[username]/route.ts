import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { PrismaUtils } from '@/lib/prisma-utils';

export async function GET(request: NextRequest, { params }) {
	try {
		const username = (await params).username;
		const session = await auth();		// Get user data first, then check follow status
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

		// Check follow status if user is logged in
		const isFollowing = session?.user ? !!(await prisma.follow.findFirst({
			where: {
				followerId: parseInt(session.user.id),
				followingId: user.id,
			},
		})) : false;

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
