import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { cacheFn } from '@/lib/cache';

export async function POST(request: NextRequest) {
	try {
		const session = await auth();
		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const userId = parseInt(session.user.id);
		const { albumIds } = await request.json();

		if (!Array.isArray(albumIds) || albumIds.length === 0) {
			return NextResponse.json({ error: 'Invalid album IDs' }, { status: 400 });
		}

		// Convert all albumIds to numbers and validate
		const validAlbumIds = albumIds.map(id => parseInt(id)).filter(id => !isNaN(id));

		if (validAlbumIds.length === 0) {
			return NextResponse.json({ error: 'No valid album IDs provided' }, { status: 400 });
		}

		// Get like statuses for all requested albums in a single query
		return cacheFn(
			`user:${userId}:album-likes:${validAlbumIds.sort().join('-')}`,
			300, // 5 minutes cache
			async () => {
				const albumLikes = await prisma.albumLike.findMany({
					where: {
						userId,
						albumId: {
							in: validAlbumIds,
						},
					},
					select: {
						albumId: true,
					},
				});

				// Get like counts for all albums in a single query
				const albumsWithCounts = await prisma.album.findMany({
					where: {
						id: {
							in: validAlbumIds,
						},
					},
					select: {
						id: true,
						_count: {
							select: {
								AlbumLike: true,
							},
						},
					},
				});

				// Create a map of album IDs to like counts
				const likeCounts = albumsWithCounts.reduce((map, album) => {
					map[album.id] = album._count.AlbumLike;
					return map;
				}, {});

				// Create a set of liked album IDs for quick lookup
				const likedAlbumIds = new Set(albumLikes.map(like => like.albumId));

				// Construct the result object
				const result = validAlbumIds.reduce((acc, albumId) => {
					acc[albumId] = {
						liked: likedAlbumIds.has(albumId),
						likeCount: likeCounts[albumId] || 0,
					};
					return acc;
				}, {});

				return NextResponse.json(result);
			}
		);
	} catch (error) {
		console.error('Error checking batch album like status:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
