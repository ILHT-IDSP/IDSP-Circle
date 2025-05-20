/**
 * Creates a cropped image based on the original image and crop area
 * @param imageSrc - Source URL of the image
 * @param pixelCrop - Object with x, y, width, height properties in pixels
 * @returns Promise with blob for the cropped image
 */
export const createCroppedImage = async (imageSrc: string, pixelCrop: { x: number; y: number; width: number; height: number }): Promise<Blob> => {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('No 2d context');
	}

	// Set canvas size to the cropped area size
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	// Draw the cropped image onto the canvas
	ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
	// Convert the canvas to a blob
	return new Promise((resolve, reject) => {
		try {
			canvas.toBlob(
				blob => {
					if (!blob) {
						reject(new Error('Canvas is empty'));
						return;
					}
					resolve(blob);
				},
				'image/jpeg',
				0.95
			); // JPEG at 95% quality
		} catch (error) {
			console.error('Error creating blob:', error);
			reject(error);
		}
	});
};

/**
 * Creates an image element and loads an image
 * @param url - URL of the image
 * @returns Promise with the loaded image
 */
const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', error => reject(error));
		image.src = url;
		image.setAttribute('crossOrigin', 'anonymous'); // Needed for CORS compatibility
	});
