import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
	try {
		const { formData } = await req.json();
		console.log('Server hit for album creation!');
		console.log('Backend album data: ', formData);

		const creatorId = parseInt(formData.creatorId, 10);

		if (isNaN(creatorId)) {
			return NextResponse.json({ error: 'Invalid creator ID' }, { status: 400 });
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
