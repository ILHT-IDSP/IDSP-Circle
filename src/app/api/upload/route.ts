import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
	const data = await req.formData();
	const file = data.get('file') as File;

	if (!file) {
		return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
	}

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	try {
		const result = await new Promise<any>((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						folder: 'profile_pictures',
						transformation: [
							{ width: 500, height: 500, crop: 'limit' }, // Ensure image is not too large
							{ quality: 'auto' }, // Optimize image quality
						],
					},
					(error, result) => {
						if (error) reject(error);
						else resolve(result);
					}
				)
				.end(buffer);
		});

		return NextResponse.json({ url: result.secure_url });
	} catch (error: unknown) {
		console.error('Upload error:', error);
		return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
	}
}
