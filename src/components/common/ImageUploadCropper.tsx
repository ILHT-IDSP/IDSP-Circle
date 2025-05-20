'use client';
import { useState, useRef, useCallback } from 'react';
import { createCroppedImage } from '../user_registration/add_profilepicture/cropUtils';
import ImageCropper from '../user_registration/add_profilepicture/ImageCropper';

interface ImageUploadCropperProps {
	onUploadStart?: () => void;
	onUploadComplete: (imageUrl: string) => void;
	onUploadError?: (error: string) => void;
	uploadEndpoint?: string;
	aspectRatio?: number;
}

export default function ImageUploadCropper({
	onUploadStart,
	onUploadComplete,
	onUploadError,
	uploadEndpoint = '/api/upload',
	aspectRatio = 1, // default to square (1:1) for profile pictures
}: ImageUploadCropperProps) {
	const [preview, setPreview] = useState<string | null>(null);
	const [showCropper, setShowCropper] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileSelection = () => {
		inputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.type.startsWith('image/')) {
			// Create a preview and open the cropper
			const previewUrl = URL.createObjectURL(file);
			setPreview(previewUrl);
			setSelectedFile(file);
			setShowCropper(true);
		} else {
			if (onUploadError) {
				onUploadError('Please select an image file');
			}
		}
	};

	const handleCropComplete = (croppedArea: any) => {
		setCroppedAreaPixels(croppedArea);
	};

	const handleCropCancel = () => {
		setShowCropper(false);
		if (preview) {
			URL.revokeObjectURL(preview);
			setPreview(null);
		}
		setSelectedFile(null);
	};

	const uploadCroppedImage = async () => {
		if (!preview || !croppedAreaPixels) return;

		try {
			setIsSubmitting(true);
			if (onUploadStart) {
				onUploadStart();
			}

			// Create a cropped image blob
			const croppedImageBlob = await createCroppedImage(preview, croppedAreaPixels);

			// Create a file from the blob
			const croppedFile = new File([croppedImageBlob], selectedFile?.name || 'cropped-image.jpg', { type: 'image/jpeg' });

			// Upload the cropped file
			const formData = new FormData();
			formData.append('file', croppedFile);

			const response = await fetch(uploadEndpoint, {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();

			if (data.url) {
				onUploadComplete(data.url);
			} else {
				if (onUploadError) {
					onUploadError('Failed to upload image');
				}
			}
		} catch (error: unknown) {
			console.error('Image upload error:', error);
			if (onUploadError) {
				onUploadError('Failed to upload image');
			}
		} finally {
			setIsSubmitting(false);
			setShowCropper(false);

			// Clean up the blob URL to prevent memory leaks
			if (preview) {
				URL.revokeObjectURL(preview);
				setPreview(null);
			}
			setSelectedFile(null);
		}
	};

	return (
		<>
			<input
				ref={inputRef}
				type='file'
				accept='image/*'
				className='hidden'
				onChange={handleFileChange}
			/>

			{showCropper && preview && (
				<ImageCropper
					imageUrl={preview}
					onCropComplete={handleCropComplete}
					onCancel={handleCropCancel}
					onConfirm={uploadCroppedImage}
					isSubmitting={isSubmitting}
				/>
			)}
		</>
	);
}
