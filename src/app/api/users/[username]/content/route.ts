import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { PrismaUtils } from '@/lib/prisma-utils';

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

		// OPTIMIZATION: Single query to get user data with counts
		const user = await prisma.user.findUnique({
			where: { username },
			select: {
				id: true,
				username: true,
				name: true,
				profileImage: true,
				isProfilePrivate: true, // OPTIMIZATION: Get counts efficiently without fetching all records
				_count: {
					select: {
						Album: true,
						createdCircles: true,
						memberships: true,
					},
				},
			},
		});

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		const isOwnProfile = currentUserId === user.id;

		// OPTIMIZATION: Check privacy and following status in single transaction
		let hasAccess = isOwnProfile || !user.isProfilePrivate;

		if (!hasAccess && currentUserId) {
			const followRelation = await prisma.follow.findUnique({
				where: {
					followerId_followingId: {
						followerId: currentUserId,
						followingId: user.id,
					},
				},
			});
			hasAccess = !!followRelation;
		}

		if (!hasAccess) {
			return NextResponse.json({
				albums: [],
				circles: [],
				isPrivate: true,
				isOwnProfile,
			});
		}

		// OPTIMIZATION: Use transaction to batch all remaining queries
		const result = await PrismaUtils.transaction(async tx => {
			// Get user's accessible circle IDs in one query
			const userCircleAccess = currentUserId
				? await tx.membership.findMany({
						where: { userId: currentUserId },
						select: { circleId: true },
				  })
				: [];
			const accessibleCircleIds = userCircleAccess.map(m => m.circleId);

			// OPTIMIZATION: Single query for albums with proper filtering
			const albums = await tx.album.findMany({
				where: {
					creatorId: user.id,
					OR: [
						{ isPrivate: false },
						{ creatorId: currentUserId }, // User's own albums
						{
							// Private circle albums where current user has access
							AND: [{ circleId: { not: null } }, { circleId: { in: accessibleCircleIds } }],
						},
					],
				},
				select: {
					id: true,
					title: true,
					description: true,
					coverImage: true,
					isPrivate: true,
					createdAt: true,
					circleId: true,
					// OPTIMIZATION: Get photo count without fetching all photos
					_count: {
						select: { Photo: true },
					},
					creator: {
						select: { profileImage: true },
					},
				},
				orderBy: { createdAt: 'desc' },
				// OPTIMIZATION: Limit results to improve performance
				take: 50,
			});

			// OPTIMIZATION: Batch circle queries
			const [createdCircles, membershipCircles] = await Promise.all([
				// Circles created by user
				tx.circle.findMany({
					where: { creatorId: user.id },
					select: {
						id: true,
						name: true,
						avatar: true,
						creatorId: true,
						isPrivate: true,
						_count: { select: { members: true } },
					},
					orderBy: { createdAt: 'desc' },
				}),
				// Circles where user is a member (excluding created ones)
				tx.circle.findMany({
					where: {
						members: { some: { userId: user.id } },
						creatorId: { not: user.id }, // Exclude circles they created
					},
					select: {
						id: true,
						name: true,
						avatar: true,
						creatorId: true,
						isPrivate: true,
						_count: { select: { members: true } },
					},
					orderBy: { createdAt: 'desc' },
				}),
			]);

			return {
				albums,
				createdCircles,
				membershipCircles,
			};
		});

		// OPTIMIZATION: Combine and format circles efficiently
		const allCircles = [...result.createdCircles, ...result.membershipCircles];

		// OPTIMIZATION: Transform data efficiently without additional database calls
		const formattedAlbums = result.albums.map((album: any) => ({
			id: album.id,
			title: album.title,
			description: album.description,
			coverImage: album.coverImage,
			isPrivate: album.isPrivate,
			createdAt: album.createdAt,
			circleId: album.circleId,
			photoCount: album._count.Photo,
			creatorProfileImage: album.creator?.profileImage || null,
		}));

		const formattedCircles = allCircles.map((circle: any) => ({
			id: circle.id,
			name: circle.name,
			avatar: circle.avatar,
			creatorId: circle.creatorId,
			isPrivate: circle.isPrivate,
			memberCount: circle._count.members,
		}));

		return NextResponse.json({
			albums: formattedAlbums,
			circles: formattedCircles,
			isPrivate: false,
			isOwnProfile,
			totalCounts: {
				albums: user._count.Album,
				circlesCreated: user._count.createdCircles,
				circlesJoined: user._count.memberships,
			},
		});
	} catch (error) {
		console.error('Error fetching user content:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
