import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { PrismaUtils } from '@/lib/prisma-utils';

export async function POST(request: NextRequest, { params }) {
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
		// OPTIMIZATION: Use transaction to batch album lookup and like status check
		const result = await PrismaUtils.transaction(async (tx) => {
			// Check if album exists
			const album = await tx.album.findUnique({
				where: { id: albumId },
				include: {
					creator: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});

			if (!album) {
				return { error: 'Album not found', status: 404 };
			}

			// Check if user has already liked this album
			const existingLike = await tx.albumLike.findUnique({
				where: {
					userId_albumId: {
						userId: userId,
						albumId: albumId,
					},
				},
			});

			return { album, existingLike };
		});

		if ('error' in result) {
			return NextResponse.json({ error: result.error }, { status: result.status });
		}

		const { album, existingLike } = result;
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
			await PrismaUtils.transaction(async (tx) => {
				// Create the like record
				await tx.albumLike.create({
					data: {
						userId: userId,
						albumId: albumId,
					},
				});

				// Only create activity if the album has a creator and it's not the current user
				if (album.creator && album.creator.id !== userId) {
					// Get the current user's name or username
					const currentUser = await tx.user.findUnique({
						where: { id: userId },
						select: { name: true, username: true },
					});

					const actorName = currentUser?.name || currentUser?.username || 'Someone';

					// Create activity for the album creator
					await tx.activity.create({
						data: {
							type: 'album_like',
							content: `${actorName} liked your album "${album.title}"`,
							userId: album.creator.id, // Activity belongs to the album creator
							circleId: album.circleId || null,
						},
					});
				}
			});

			return NextResponse.json({ liked: true });
		}
	} catch (error) {
		console.error('Error processing album like:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

// Get like status for the current user
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
