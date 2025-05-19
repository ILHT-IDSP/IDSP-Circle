import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const albumId = parseInt(params.id);

		if (isNaN(albumId)) {
			return NextResponse.json({ error: 'Invalid album ID' }, { status: 400 });
		}

		// Check if the album exists
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
						isPrivate: true,
					},
				},
				_count: {
					select: {
						Photo: true,
						AlbumLike: true,
						AlbumComment: true,
					},
				},
			},
		});

		if (!album) {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}

		// Check if the user has permission to view this album
		const session = await auth();
		const userId = session?.user ? parseInt(session.user.id) : null;

		// If the album is private, check permissions
		if (album.isPrivate) {
			// For personal albums
			const isCreator = album.creatorId === userId;

			// For circle albums
			let isCircleMember = false;
			if (album.circleId && userId) {
				// Check if user is a member of the circle
				const membership = await prisma.membership.findUnique({
					where: {
						userId_circleId: {
							userId: userId,
							circleId: album.circleId,
						},
					},
				});
				isCircleMember = !!membership;
			}

			if (!isCreator && !isCircleMember) {
				return NextResponse.json({ error: 'You do not have permission to view this private album' }, { status: 403 });
			}
		}

		// Get photos for this album
		const photos = await prisma.photo.findMany({
			where: { albumId: albumId },
			orderBy: { createdAt: 'desc' },
		});
		// Get like status if user is logged in
		let userLikeStatus: boolean | null = null;
		if (userId) {
			const like = await prisma.albumLike.findUnique({
				where: {
					userId_albumId: {
						userId: userId,
						albumId: albumId,
					},
				},
			});
			userLikeStatus = like ? true : false;
		}

		return NextResponse.json({
			album,
			photos,
			userLikeStatus,
		});
	} catch (error) {
		console.error('Error fetching album photos:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const resolvedParamsId = await params.id;
		const albumId = parseInt(resolvedParamsId);
		console.log('Processing photo upload for album:', albumId);

		if (isNaN(albumId)) {
			return NextResponse.json({ error: 'Invalid album ID' }, { status: 400 });
		}

		// Verify authentication
		const session = await auth();
		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const userId = parseInt(session.user.id);

		// Check if the album exists
		const album = await prisma.album.findUnique({
			where: { id: albumId },
		});

		if (!album) {
			return NextResponse.json({ error: 'Album not found' }, { status: 404 });
		}

		const canAddToPersonalAlbum = album.creatorId === userId;

		// For circle albums
		let canAddToCircleAlbum = false;
		if (album.circleId) {
			// Check if user is a member of the circle
			const membership = await prisma.membership.findUnique({
				where: {
					userId_circleId: {
						userId: userId,
						circleId: album.circleId,
					},
				},
			});
			canAddToCircleAlbum = !!membership;
		}

		if (!canAddToPersonalAlbum && !canAddToCircleAlbum) {
			return NextResponse.json({ error: 'You do not have permission to add photos to this album' }, { status: 403 });
		} // Process form data for photo upload
		const formData = await request.formData();
		const file = formData.get('file') as File;
		const description = (formData.get('description') as string) || '';
		const isCoverImage = formData.get('isCoverImage') === 'true';

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 });
		} // Convert file to buffer
		const bytes = await file.arrayBuffer();
		const buffer = new Uint8Array(bytes);

		// Import the uploadToCloudinary function
		const { uploadToCloudinary } = await import('@/lib/cloudinary');

		// Upload to Cloudinary
		let imageData;
		try {
			// Use the existing uploadToCloudinary function
			imageData = await uploadToCloudinary(buffer, 'albums', `album_${albumId}`);

			if (!imageData || !imageData.secure_url) {
				console.error('Failed to get secure_url from Cloudinary response', imageData);
				return NextResponse.json({ error: 'Failed to upload image to Cloudinary' }, { status: 500 });
			}

			console.log('Successfully uploaded to Cloudinary:', imageData.secure_url);
		} catch (error) {
			console.error('Error in Cloudinary upload:', error);
			return NextResponse.json(
				{
					error: 'Failed to upload image to Cloudinary',
					details: error instanceof Error ? error.message : String(error),
				},
				{ status: 500 }
			);
		}
		// Create the photo in the database
		const createdPhoto = await prisma.photo.create({
			data: {
				url: imageData.secure_url,
				description: description,
				albumId,
				updatedAt: new Date(),
			},
		}); // Update the album's coverImage if this is marked as cover image or if album doesn't have one
		if (isCoverImage || !album.coverImage) {
			await prisma.album.update({
				where: { id: albumId },
				data: {
					coverImage: createdPhoto.url,
				},
			});
		}

		return NextResponse.json({
			success: true,
			photo: createdPhoto,
			message: `Added photo to the album`,
		});
	} catch (error) {
		console.error('Error adding photos to album:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
