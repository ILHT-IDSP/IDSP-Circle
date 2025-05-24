import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { PrismaUtils } from '@/lib/prisma-utils';

export const maxDuration = 30; // Set max duration to 30 seconds for this API route

export async function POST(req: NextRequest) {
	try {
		// Check authentication
		const session = await auth();
		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		// Parse the form data
		const formData = await req.formData();
		const file = formData.get('file') as File;
		const albumId = Number(formData.get('albumId'));
		const description = formData.get('description') as string | null;

		// Validate inputs
		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 });
		}

		if (isNaN(albumId)) {
			return NextResponse.json({ error: 'Invalid album ID' }, { status: 400 });
		}

		const userId = parseInt(session.user.id);

		// OPTIMIZATION: Use transaction to batch album validation and permission checks
		const permissionResult = await PrismaUtils.transaction(async (tx) => {
			// Check if the album exists
			const album = await tx.album.findUnique({
				where: { id: albumId },
				include: {
					Circle: {
						select: {
							id: true,
						},
					},
				},
			});

			if (!album) {
				return { album: null, hasPermission: false };
			}

			// For personal albums
			const canAddToPersonalAlbum = album.creatorId === userId;

			// For circle albums - check membership if applicable
			let canAddToCircleAlbum = false;
			if (album.circleId) {
				const membership = await tx.membership.findUnique({
					where: {
						userId_circleId: {
							userId: userId,
							circleId: album.circleId,
						},
					},
				});
				canAddToCircleAlbum = !!membership;
			}

			const hasPermission = canAddToPersonalAlbum || canAddToCircleAlbum;

			return { album, hasPermission };
		});

		if (!permissionResult.album) {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}

		if (!permissionResult.hasPermission) {
			return NextResponse.json({ error: 'You do not have permission to add photos to this album' }, { status: 403 });
		}

		// Upload the image to Cloudinary
		const imageBuffer = await file.arrayBuffer();
		const imageData = new Uint8Array(imageBuffer);

		const cloudinaryResult = await uploadToCloudinary(imageData, 'photos', `album_${albumId}`);

		if (!cloudinaryResult || !cloudinaryResult.secure_url) {
			return NextResponse.json({ error: 'Failed to upload image to cloud storage' }, { status: 500 });
		}

		// Save the photo to the database
		const photo = await prisma.photo.create({
			data: {
				url: cloudinaryResult.secure_url,
				description: description || null,
				albumId: albumId,
				updatedAt: new Date(),
			},
		});

		return NextResponse.json(photo);
	} catch (error) {
		console.error('Error uploading photo:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
