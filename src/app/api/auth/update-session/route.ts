import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

// This endpoint is specifically for the app's session updates, separate from NextAuth's session API
export async function POST(request: NextRequest) {
	try {
		const session = await auth();

		// Check if user is authenticated
		if (!session || !session.user) {
			return NextResponse.json(
				{
					success: false,
					error: 'Unauthorized',
				},
				{ status: 401 }
			);
		}

		// Get the user ID from the session
		const userId = parseInt(session.user.id);
		if (isNaN(userId)) {
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid user ID',
				},
				{ status: 400 }
			);
		}

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
			return NextResponse.json(
				{
					success: false,
					error: 'User not found',
				},
				{ status: 404 }
			);
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
		// Always return a properly formatted JSON response
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to update session',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

// Add OPTIONS method handler for CORS support
export async function OPTIONS() {
	return NextResponse.json(
		{},
		{
			status: 200,
			headers: {
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				'Access-Control-Allow-Origin': '*',
			},
		}
	);
}
