import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

// Get album details
export async function GET(request: NextRequest, { params }) {
	try {
		const { id } = await params;
		const albumId = parseInt(id);

		if (isNaN(albumId)) {
			return NextResponse.json({ error: 'Invalid album ID' }, { status: 400 });
		}

		const album = await prisma.album.findUnique({
			where: { id: albumId },
			include: {
				creator: {
					select: {
						id: true,
						username: true,
						name: true,
						profileImage: true,
					},
				},
				Circle: {
					select: {
						id: true,
						name: true,
						avatar: true,
					},
				},
				_count: {
					select: {
						AlbumLike: true,
						AlbumComment: true,
						Photo: true,
					},
				},
			},
		});

		if (!album) {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}

		return NextResponse.json(album);
	} catch (error) {
		console.error('Error fetching album:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

// Update album details
export async function PATCH(request: NextRequest, { params }) {
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

		const { title, description, isPrivate, coverImage } = await request.json();

		// Get the album to check permissions
		const album = await prisma.album.findUnique({
			where: { id: albumId },
		});

		if (!album) {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}
		// Check if user has permission to update the album
		const userId = parseInt(session.user.id);

		if (album.creatorId !== userId) {
			// For circle albums, check if user is a member of the circle
			if (album.circleId) {
				const membership = await prisma.membership.findUnique({
					where: {
						userId_circleId: {
							userId,
							circleId: album.circleId,
						},
					},
				});

				if (!membership) {
					return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
				}
				// Allow the creator of the album to edit it regardless of role
			} else {
				return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
			}
		}

		// Update the album
		const updatedAlbum = await prisma.album.update({
			where: { id: albumId },
			data: {
				...(title !== undefined && { title }),
				...(description !== undefined && { description }),
				...(isPrivate !== undefined && { isPrivate }),
				...(coverImage !== undefined && { coverImage }),
			},
		});

		return NextResponse.json(updatedAlbum);
	} catch (error) {
		console.error('Error updating album:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

// Delete an album
export async function DELETE(request: NextRequest, { params }) {
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

		// Get the album to check permissions
		const album = await prisma.album.findUnique({
			where: { id: albumId },
		});

		if (!album) {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}
		// Check if user has permission to delete the album
		const userId = parseInt(session.user.id);

		if (album.creatorId !== userId) {
			// For circle albums, check if user is a member of the circle
			if (album.circleId) {
				const membership = await prisma.membership.findUnique({
					where: {
						userId_circleId: {
							userId,
							circleId: album.circleId,
						},
					},
				});
				if (!membership) {
					return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
				}
				// Only allow the creator to delete the album for now
				return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
			} else {
				return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
			}
		}

		// Delete the album
		await prisma.album.delete({
			where: { id: albumId },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error deleting album:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
