import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

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
	creator: {
		profileImage: string | null;
	} | null;
}

export async function GET(request: Request, { params }) {
	try {
		const session = await auth();
		const currentUserId = session?.user?.id ? parseInt(session.user.id) : null;

		// Get the username from params
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
		}

		// Check if this is the user's own profile
		const isOwnProfile = currentUserId === user.id;

		// Check if the profile is private and the current user is not following them and not the owner
		if (user.isProfilePrivate && currentUserId !== user.id) {
			// Check if the current user is following this user
			const isFollowing = currentUserId
				? await prisma.follow.findFirst({
						where: {
							followerId: currentUserId,
							followingId: user.id,
						},
				  })
				: null;			// If not following and profile is private, return restricted data
			if (!isFollowing) {
				return NextResponse.json({
					albums: [],
					circles: [],
					isPrivate: true,
					isOwnProfile: currentUserId === user.id
				});
			}
		}
		
		// Get current user's circle memberships to check private circle access
		const userCircleMemberships = currentUserId ? await prisma.membership.findMany({
			where: {
				userId: currentUserId,
			},
			select: {
				circleId: true,
			},
		}) : [];
		
		const userCircleIds = userCircleMemberships.map(m => m.circleId);

		// Get user's albums with photo counts, filtering private circle albums
		const albums = await prisma.album.findMany({
			where: {
				AND: [
					{
						creatorId: user.id,
					},
					{
						OR: [
							{
								// Personal albums (not in any circle)
								circleId: null,
							},
							{
								// Public circle albums
								Circle: {
									isPrivate: false,
								},
							},
							{
								// User viewing their own profile can see all their albums
								creatorId: currentUserId,
							},
							{
								// Private circle albums where the viewing user is a member
								AND: [
									{
										Circle: {
											isPrivate: true,
										},
									},
									{
										circleId: {
											in: userCircleIds,
										},
									},
								],
							},
						],
					},
				],
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
				_count: {
					select: {
						Photo: true,
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
		const formattedAlbums = albums.map((album: any) => ({
			id: album.id,
			name: album.title,
			image: album.coverImage || '/images/albums/default.svg',
			userProfileImage: album.creator?.profileImage || '/images/default-avatar.png',
			photoCount: album._count.Photo,
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
			isOwnProfile: currentUserId === user.id
		});
	} catch (error) {
		console.error('Error fetching user content:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
