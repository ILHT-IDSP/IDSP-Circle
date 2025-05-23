import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { PrismaUtils } from '@/lib/prisma-utils';

// Get comments for an album
export async function GET(request: NextRequest, { params }) {
	try {
		const { id } = await params;
		const albumId = parseInt(id);
		if (isNaN(albumId)) {
			return NextResponse.json({ error: 'Invalid album ID' }, { status: 400 });
		}

		// OPTIMIZATION: Use transaction to batch album existence check and comments query
		const result = await PrismaUtils.transaction(async (tx) => {
			// Check if album exists
			const album = await tx.album.findUnique({
				where: { id: albumId },
				select: { id: true },
			});

			if (!album) {
				return { album: null, comments: [] };
			}

			// Get comments for this album with user info
			const comments = await tx.albumComment.findMany({
				where: {
					albumId: albumId,
				},
				include: {
					User: {
						select: {
							id: true,
							username: true,
							name: true,
							profileImage: true,
						},
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			});

			return { album, comments };
		});

		if (!result.album) {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}

		return NextResponse.json(result.comments);
	} catch (error) {
		console.error('Error fetching album comments:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

// Add a comment to an album
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

		const { content } = await request.json();
		if (!content || typeof content !== 'string' || content.trim() === '') {
			return NextResponse.json({ error: 'Comment content is required' }, { status: 400 });
		}

		const userId = parseInt(session.user.id);

		// OPTIMIZATION: Use transaction to batch all operations
		const comment = await PrismaUtils.transaction(async (tx) => {
			// Get album details with creator info in one query
			const albumWithCreator = await tx.album.findUnique({
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

			if (!albumWithCreator) {
				throw new Error('Album not found');
			}

			// Get current user info for activity creation
			const currentUser = await tx.user.findUnique({
				where: { id: userId },
				select: { name: true, username: true },
			});

			// Create the comment
			const newComment = await tx.albumComment.create({
				data: {
					content: content.trim(),
					userId: userId,
					albumId: albumId,
					updatedAt: new Date(),
				},
				include: {
					User: {
						select: {
							id: true,
							username: true,
							name: true,
							profileImage: true,
						},
					},
				},
			});

			// Create activity for album owner if it's not the user's own album
			if (albumWithCreator.creator && albumWithCreator.creator.id !== userId) {
				const actorName = currentUser?.name || currentUser?.username || 'Someone';

				await tx.activity.create({
					data: {
						type: 'album_comment',
						content: `${actorName} commented on your album "${albumWithCreator.title}"`,
						userId: albumWithCreator.creator.id, // Activity belongs to album creator
						circleId: albumWithCreator.circleId || null,
					},
				});
			}

			return newComment;
		});

		return NextResponse.json(comment);
	} catch (error) {
		console.error('Error adding album comment:', error);
		if (error instanceof Error && error.message === 'Album not found') {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
