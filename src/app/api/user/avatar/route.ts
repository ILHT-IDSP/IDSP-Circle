import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (if you're using it)
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
	secure_url: string;
	public_id: string;
	format: string;
	width: number;
	height: number;
	resource_type: string;
	created_at: string;
}

export async function POST(request: NextRequest) {
	try {
		const session = await auth();

		// Check if user is authenticated
		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		// Get form data with the image
		const formData = await request.formData();
		const file = (formData.get('file') as File) || (formData.get('avatar') as File); // Check for both 'file' and 'avatar'

		if (!file) {
			return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
		}

		// Convert file to buffer
		const buffer = Buffer.from(await file.arrayBuffer());

		// Upload to Cloudinary or other storage
		// This is a generic implementation - you might need to adjust based on your image hosting
		let imageUrl;

		if (process.env.CLOUDINARY_CLOUD_NAME) {
			// If using Cloudinary
			const uploadPromise = new Promise((resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream({ folder: 'profile-images' }, (error, result) => {
					if (error) reject(error);
					else resolve(result);
				});

				uploadStream.end(buffer);
			});

			const uploadResult = (await uploadPromise) as CloudinaryUploadResult;
			imageUrl = uploadResult.secure_url;
		} else {
			// Simple file storage example (not recommended for production)
			// In a real app, you'd use a proper storage solution
			const fileName = `profile-${session.user.id}-${Date.now()}.${file.type.split('/')[1]}`;
			const publicPath = `/uploads/profiles/${fileName}`;

			// Store file logic would go here
			// For now, just use a placeholder URL
			imageUrl = publicPath;
		}

		// Update user record in the database
		await prisma.user.update({
			where: {
				id: parseInt(session.user.id),
			},
			data: {
				profileImage: imageUrl,
			},
		});
		return NextResponse.json({
			success: true,
			imageUrl,
			url: imageUrl, // Add the url field to match the /api/upload response format
		});
	} catch (error) {
		console.error('Error uploading profile image:', error);
		return NextResponse.json({ error: 'Failed to upload profile image' }, { status: 500 });
	}
}
