import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

// This endpoint is used to update session data without requiring a full logout/login
export async function POST(request: NextRequest) {
	try {
		const session = await auth();

		// Check if user is authenticated
		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		// Get the user ID from the session
		const userId = parseInt(session.user.id);

		// Fetch the latest user data from the database
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: {
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

		// Return the updated user data
		return NextResponse.json({
			success: true,
			user: {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email,
				image: user.profileImage,
				circleCount: user._count.createdCircles || 0,
				albumCount: user._count.Album || 0,
				followersCount: user._count.followers || 0,
				followingCount: user._count.following || 0,
			},
		});
	} catch (error) {
		console.error('Error updating session:', error);
		return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
	}
}
