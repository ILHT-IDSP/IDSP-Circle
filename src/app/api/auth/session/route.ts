import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

// This endpoint is used to update session data without requiring a full logout/login
export async function POST(request: NextRequest) {
	try {
		const session = await auth();

		// Check if user is authenticated
		if (!session?.user) {
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

// GET handler to support NextAuth session management
export async function GET(request: NextRequest) {
	try {
		const session = await auth();

		// If there's no session, return a 200 with an empty object as NextAuth expects
		if (!session) {
			return NextResponse.json({});
		}

		// Return the session data with proper error handling
		return NextResponse.json({
			...session,
			user: session?.user || null,
		});
	} catch (error) {
		console.error('Error retrieving session:', error);
		// Return an empty object instead of an error to match NextAuth's expected format
		return NextResponse.json({});
	}
}

// HEAD method is used by NextAuth for session checking
export async function HEAD(request: NextRequest) {
	try {
		const session = await auth();
		return new Response(null, {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Error in HEAD session check:', error);
		return new Response(null, { status: 200 });
	}
}

// OPTIONS method is needed for CORS preflight requests
export async function OPTIONS(request: NextRequest) {
	return new Response(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	});
}

// PATCH method is used by NextAuth for updating session data
export async function PATCH(request: NextRequest) {
	try {
		const session = await auth();

		// If there's no session, return a 401
		if (!session?.user) {
			return NextResponse.json(
				{
					success: false,
					error: 'Unauthorized',
				},
				{ status: 401 }
			);
		}

		// Handle session update similar to POST
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
		console.error('Error updating session via PATCH:', error);
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
