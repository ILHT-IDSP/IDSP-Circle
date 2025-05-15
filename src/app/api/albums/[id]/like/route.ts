import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const session = await auth();
		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { id } = await params;
		const albumId = parseInt(id);
		if (isNaN(albumId)) {
			return NextResponse.json({ error: 'Invalid album ID' }, { status: 400 });
		}

		const userId = parseInt(session.user.id);

		// Check if album exists
		const album = await prisma.album.findUnique({
			where: { id: albumId },
		});

		if (!album) {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}

		// Check if user has already liked this album
		const existingLike = await prisma.albumLike.findUnique({
			where: {
				userId_albumId: {
					userId: userId,
					albumId: albumId,
				},
			},
		});

		if (existingLike) {
			// User has already liked this album, so unlike it
			await prisma.albumLike.delete({
				where: {
					userId_albumId: {
						userId: userId,
						albumId: albumId,
					},
				},
			});

			return NextResponse.json({ liked: false });
		} else {
			// User hasn't liked this album, so like it
			await prisma.albumLike.create({
				data: {
					userId: userId,
					albumId: albumId,
				},
			});

			return NextResponse.json({ liked: true });
		}
	} catch (error) {
		console.error('Error processing album like:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

// Get like status for the current user
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const session = await auth();
		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { id } = await params;
		const albumId = parseInt(id);
		if (isNaN(albumId)) {
			return NextResponse.json({ error: 'Invalid album ID' }, { status: 400 });
		}

		const userId = parseInt(session.user.id);

		// Check if album exists
		const album = await prisma.album.findUnique({
			where: { id: albumId },
			include: {
				_count: {
					select: {
						AlbumLike: true,
					},
				},
			},
		});

		if (!album) {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}

		// Check if user has liked this album
		const existingLike = await prisma.albumLike.findUnique({
			where: {
				userId_albumId: {
					userId: userId,
					albumId: albumId,
				},
			},
		});

		return NextResponse.json({
			liked: !!existingLike,
			likeCount: album._count.AlbumLike,
		});
	} catch (error) {
		console.error('Error checking album like status:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
