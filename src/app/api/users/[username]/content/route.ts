import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define interfaces for better type checking
interface Circle {
	id: number;
	name: string;
	avatar: string | null;
	creatorId: number;
}

interface Album {
	id: number;
	title: string;
	coverImage: string | null;
	creator?: {
		profileImage: string | null;
	};
}

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }) {
	try {
		// Await the params to get the username
		const resolvedParams = await params;
		const username = resolvedParams.username;

		// Find the user
		const user = await prisma.user.findUnique({
			where: { username },
			select: {
				id: true,
				isProfilePrivate: true,
			},
		});

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		} // Get user's albums
		const albums = await prisma.album.findMany({
			where: {
				creatorId: user.id,
			},
			select: {
				id: true,
				title: true,
				coverImage: true,
				creator: {
					select: {
						profileImage: true,
					},
				},
			},
		});

		// Get user's circles (both created and joined)
		const createdCircles = await prisma.circle.findMany({
			where: {
				creatorId: user.id,
			},
			select: {
				id: true,
				name: true,
				avatar: true,
				creatorId: true,
			},
		});

		const memberships = await prisma.membership.findMany({
			where: {
				userId: user.id,
			},
			select: {
				circle: {
					select: {
						id: true,
						name: true,
						avatar: true,
						creatorId: true,
					},
				},
			},
		});

		// Filter out circles the user created to avoid duplicates
		const joinedCircles = memberships.map(membership => membership.circle as Circle).filter(circle => circle.creatorId !== user.id);

		// Combine all circles
		const allCircles = [...createdCircles, ...joinedCircles]; // Transform the data to match the expected format in the frontend
		const formattedAlbums = albums.map((album: Album) => ({
			id: album.id,
			name: album.title,
			image: album.coverImage || '/images/albums/default.svg',
			userProfileImage: album.creator?.profileImage || '/images/default-avatar.png',
		}));

		const formattedCircles = allCircles.map(circle => ({
			id: circle.id,
			name: circle.name,
			image: circle.avatar || '/images/circles/default.svg',
		}));

		return NextResponse.json({
			albums: formattedAlbums,
			circles: formattedCircles,
			isPrivate: user.isProfilePrivate || false,
		});
	} catch (error) {
		console.error('Error fetching user content:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
