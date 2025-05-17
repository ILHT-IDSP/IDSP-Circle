import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_SECRET,
	secure: true,
});

/**
 * Uploads a file to Cloudinary
 * @param buffer The file buffer
 * @param folder The folder to upload to
 * @param publicIdPrefix Optional public ID prefix for the file
 * @returns The Cloudinary response
 */
export const uploadToCloudinary = async (buffer: Uint8Array, folder: string = 'uploads', publicIdPrefix: string = ''): Promise<any> => {
	return new Promise((resolve, reject) => {
		const uploadOptions: any = {
			folder,
			public_id: publicIdPrefix ? `${publicIdPrefix}_${Date.now()}` : undefined,
			resource_type: 'auto',
		};

		cloudinary.uploader
			.upload_stream(uploadOptions, (error: any, result: any) => {
				if (error) {
					console.error('Cloudinary upload error:', error);
					return reject(error);
				}
				resolve(result);
			})
			.end(buffer);
	});
};

export default cloudinary;
