import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: Request) {
	try {
		const { formData } = await req.json();
		console.log('Server hit for album creation!');
		console.log('Backend album data: ', formData);

		// Get current user from session to ensure the request is authenticated
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const creatorId = parseInt(formData.creatorId, 10);

		// Verify the user creating the album is the authenticated user
		if (creatorId !== parseInt(session.user.id, 10)) {
			return NextResponse.json({ error: 'Unauthorized - User ID mismatch' }, { status: 403 });
		}

		if (isNaN(creatorId)) {
			return NextResponse.json({ error: 'Invalid creator ID' }, { status: 400 });
		}

		// Check if the album is being added to a circle
		if (formData.circleId) {
			const circleId = parseInt(formData.circleId, 10);

			if (isNaN(circleId)) {
				return NextResponse.json({ error: 'Invalid circle ID' }, { status: 400 });
			}

			// Check if the user is a member of the circle
			const membership = await prisma.membership.findUnique({
				where: {
					userId_circleId: {
						userId: creatorId,
						circleId,
					},
				},
			});

			// Check if the user is the creator of the circle
			const circle = await prisma.circle.findUnique({
				where: { id: circleId },
				select: { creatorId: true },
			});

			// If not a member or creator, deny access
			if (!membership && circle?.creatorId !== creatorId) {
				return NextResponse.json({ error: 'You can only add albums to circles you are a member of' }, { status: 403 });
			}

			// Check if the user has permission to create albums in this circle
			if (membership && membership.role !== 'ADMIN' && membership.role !== 'MODERATOR' && circle?.creatorId !== creatorId) {
				return NextResponse.json({ error: 'You do not have permission to create albums in this circle' }, { status: 403 });
			}
		}

		// Create the album
		const newAlbum = await prisma.album.create({
			data: {
				creatorId,
				title: formData.title,
				description: formData.description || '',
				coverImage: formData.coverImage || null,
				isPrivate: formData.isPrivate || true,
				circleId: formData.circleId ? parseInt(formData.circleId, 10) : null,
			},
		});

		console.log(`Created album: ${newAlbum.title}`);

		return NextResponse.json(
			{
				message: 'Successfully created album',
				album: newAlbum,
			},
			{ status: 200 }
		);
	} catch (err) {
		console.error('Error creating album:', err);
		return NextResponse.json({ error: 'Failed to create album' }, { status: 500 });
	}
}
