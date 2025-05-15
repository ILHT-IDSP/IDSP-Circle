import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }) {
	try {
		const [session, resolvedParams] = await Promise.all([auth(), params]);
		const userId = session?.user?.id ? parseInt(session.user.id, 10) : null;
		const circleId = parseInt(resolvedParams.id, 10);

		if (isNaN(circleId)) {
			return NextResponse.json({ error: 'Invalid circle ID' }, { status: 400 });
		}

		// Check if the circle exists and if it's private
		const circle = await prisma.circle.findUnique({
			where: { id: circleId },
			select: {
				isPrivate: true,
				creatorId: true,
			},
		});

		if (!circle) {
			return NextResponse.json({ error: 'Circle not found' }, { status: 404 });
		}

		// For private circles, check if the user is a member
		if (circle.isPrivate && userId !== circle.creatorId) {
			const membership = await prisma.membership.findUnique({
				where: {
					userId_circleId: {
						userId: userId as number,
						circleId,
					},
				},
			});

			if (!membership) {
				return NextResponse.json({ error: 'Access denied to private circle' }, { status: 403 });
			}
		}

		// Get all albums for this circle
		const albums = await prisma.album.findMany({
			where: { circleId },
			include: {
				creator: {
					select: {
						profileImage: true,
					},
				},
			},
			orderBy: { createdAt: 'desc' },
		}); // Format the response
		const formattedAlbums = albums.map(album => ({
			id: album.id,
			title: album.title,
			coverImage: album.coverImage,
			creatorImage: album.creator?.profileImage || null,
		}));

		return NextResponse.json(formattedAlbums);
	} catch (error) {
		console.error('Error fetching circle albums:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
