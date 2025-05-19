import Image from 'next/image';
import React, { useState, useRef } from 'react';
import ImageUploadCropper from '../common/ImageUploadCropper';
import { createCroppedImage } from '../user_registration/add_profilepicture/cropUtils';

interface CoverImageUploadProps {
	albumId: number;
	currentCoverImage: string | null;
	onImageUpdate: (newCoverImageUrl: string) => void;
}

const CoverImageUpload: React.FC<CoverImageUploadProps> = ({ albumId, currentCoverImage, onImageUpdate }) => {
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState('');
	const cropperRef = useRef<HTMLDivElement>(null);
	const [showCropper, setShowCropper] = useState(false);

	const handleUploadStart = () => {
		setIsUploading(true);
		setError('');
	};

	const handleUploadComplete = async (imageUrl: string) => {
		try {
			// Make an API call to update the album cover in the database
			const response = await fetch(`/api/albums/${albumId}/cover`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ coverImageUrl: imageUrl }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to update album cover');
			}

			onImageUpdate(imageUrl);
		} catch (err) {
			console.error('Error setting album cover:', err);
			setError(err instanceof Error ? err.message : 'Failed to update album cover');
		} finally {
			setIsUploading(false);
		}
	};

	const handleUploadError = (errorMessage: string) => {
		setError(errorMessage);
		setIsUploading(false);
	};
	const triggerFileInput = () => {
		// Access the input inside the ImageUploadCropper
		const input = cropperRef.current?.querySelector('input');
		if (input) {
			input.click();
		}
	};

	return (
		<div className='mb-4'>
			<div className='flex items-center mb-2'>
				<span className='text-gray-700 dark:text-gray-300 text-sm font-bold'>Cover Image</span>
				{isUploading && <span className='ml-2 text-xs text-gray-500'>Uploading...</span>}
			</div>

			{error && <div className='bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-2 text-sm'>{error}</div>}

			<div
				className='relative'
				ref={cropperRef}
			>
				{currentCoverImage && (
					<div className='mb-2'>
						<Image
							src={currentCoverImage}
							alt='Album cover'
							width={400}
							height={200}
							className='w-full h-32 object-cover rounded'
						/>
					</div>
				)}

				<button
					type='button'
					onClick={triggerFileInput}
					className='bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600'
					disabled={isUploading}
				>
					{currentCoverImage ? 'Change Cover Image' : 'Upload Cover Image'}
				</button>

				<ImageUploadCropper
					onUploadStart={handleUploadStart}
					onUploadComplete={handleUploadComplete}
					onUploadError={handleUploadError}
					uploadEndpoint='/api/upload'
					aspectRatio={16 / 9} // Album covers often use 16:9 aspect ratio
				/>
			</div>
		</div>
	);
};

export default CoverImageUpload;
