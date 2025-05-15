import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

// Get comments for an album
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

		const { content } = await request.json();
		if (!content || typeof content !== 'string' || content.trim() === '') {
			return NextResponse.json({ error: 'Comment content is required' }, { status: 400 });
		}

		const userId = parseInt(session.user.id);

		// Check if album exists
		const album = await prisma.album.findUnique({
			where: { id: albumId },
		});

		if (!album) {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}

		// Create the comment
		const comment = await prisma.albumComment.create({
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

		return NextResponse.json(comment);
	} catch (error) {
		console.error('Error adding album comment:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
