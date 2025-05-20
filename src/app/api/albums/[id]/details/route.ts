import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { cacheFn } from '@/lib/cache';

export async function GET(request: NextRequest, { params }) {
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

		return cacheFn(
			`user:${userId}:album:${albumId}:details`,
			300, // 5 minutes cache
			async () => {
				// Fetch album details with photo count, creator info, and like status in a single query
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
						_count: {
							select: {
								Photo: true,
								AlbumLike: true,
								AlbumComment: true,
							},
						},
						AlbumLike: {
							where: {
								userId,
							},
							take: 1,
						},
					},
				});

				if (!album) {
					return NextResponse.json({ error: 'Album not found' }, { status: 404 });
				}

				// Check if this is a private album that the user shouldn't access
				if (album.isPrivate && album.creator && album.creator.id !== userId) {
					// Check if the user is in the same circle as the album (if album belongs to a circle)
					let hasAccess = false;
					if (album.circleId) {
						const membership = await prisma.membership.findUnique({
							where: {
								userId_circleId: {
									userId,
									circleId: album.circleId,
								},
							},
						});
						hasAccess = !!membership;
					}

					if (!hasAccess) {
						return NextResponse.json({ error: 'Access denied' }, { status: 403 });
					}
				}

				// Create a new object without the AlbumLike field that we'll remove later
				const formattedAlbum = {
					...album,
					liked: album.AlbumLike.length > 0,
					likeCount: album._count.AlbumLike,
					commentCount: album._count.AlbumComment,
					photoCount: album._count.Photo,
				};

				// Create a new object without the AlbumLike property to avoid using delete operator
				const { AlbumLike, ...cleanedAlbum } = formattedAlbum;

				return NextResponse.json(cleanedAlbum);
			}
		);
	} catch (error) {
		console.error('Error fetching album details:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
