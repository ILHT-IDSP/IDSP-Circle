import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: NextRequest, { params }) {
	try {
		const resolvedParams = await params;
		const { username } = resolvedParams;

		// Find the user by username
		const user = await prisma.user.findUnique({
			where: { username },
			select: { id: true },
		});

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
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

		const formattedFollowing = following.map(f => ({
			id: f.following.id,
			username: f.following.username,
			name: f.following.name,
			profileImage: f.following.profileImage,
		}));

		return NextResponse.json(formattedFollowing);
	} catch (error) {
		console.error('Error fetching following:', error);
		return NextResponse.json({ error: 'Failed to fetch following' }, { status: 500 });
	}
}
