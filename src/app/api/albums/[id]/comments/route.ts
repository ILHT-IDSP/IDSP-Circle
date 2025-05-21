import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

// Get comments for an album
export async function GET(request: NextRequest, { params }) {
	try {
		const { id } = await params;
		const albumId = parseInt(id);
		if (isNaN(albumId)) {
			return NextResponse.json({ error: 'Invalid album ID' }, { status: 400 });
		}

		// Check if album exists
		const album = await prisma.album.findUnique({
			where: { id: albumId },
		});

		if (!album) {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}

		// Get comments for this album with user info
		const comments = await prisma.albumComment.findMany({
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

		return NextResponse.json(comments);
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

		const album = await prisma.album.findUnique({
			where: { id: albumId },
		});

		if (!album) {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}
		// Get album details with creator info
		const albumWithCreator = await prisma.album.findUnique({
			where: { id: albumId },
			include: {
				creator: {
					select: { 
						id: true,
						name: true
					}
				}
			}
		});

		let comment;
		await prisma.$transaction(async (prisma) => {
			// Create the comment
			comment = await prisma.albumComment.create({
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
			if (albumWithCreator && albumWithCreator.creator && albumWithCreator.creator.id !== userId) {
				await prisma.activity.create({
					data: {
						type: 'album_comment',
						content: `commented on your album "${albumWithCreator.title}"`,
						userId: albumWithCreator.creator.id, // Activity belongs to album creator
						circleId: albumWithCreator.circleId || null
					}
				});
			}
		});

		return NextResponse.json(comment);
	} catch (error) {
		console.error('Error adding album comment:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
