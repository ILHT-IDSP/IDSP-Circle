import Image from 'next/image';
import React, { useState, useRef } from 'react';

interface CoverImageUploadProps {
	albumId: number;
	currentCoverImage: string | null;
	onImageUpdate: (newCoverImageUrl: string) => void;
}

const CoverImageUpload: React.FC<CoverImageUploadProps> = ({ albumId, currentCoverImage, onImageUpdate }) => {
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
		if (!allowedTypes.includes(file.type)) {
			setError('Please select a valid image file (JPEG, PNG, or WebP)');
			return;
		}

		setIsUploading(true);
		setError('');

		const formData = new FormData();
		formData.append('file', file);
		formData.append('isCoverImage', 'true');

		try {
			const response = await fetch(`/api/albums/${albumId}/cover`, {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to upload cover image');
			}

			const data = await response.json();
			onImageUpdate(data.coverImageUrl);
		} catch (err) {
			console.error('Error uploading cover image:', err);
			setError(err instanceof Error ? err.message : 'An error occurred during upload');
		} finally {
			setIsUploading(false);
		}
	};

	const triggerFileInput = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className='mb-4'>
			<div className='flex items-center mb-2'>
				<span className='text-gray-700 dark:text-gray-300 text-sm font-bold'>Cover Image</span>
				{isUploading && <span className='ml-2 text-xs text-gray-500'>Uploading...</span>}
			</div>

			{error && <div className='bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-2 text-sm'>{error}</div>}

			<div className='relative'>
				{currentCoverImage && (
					<div className='mb-2'>
						<Image
							fill
							src={currentCoverImage}
							alt='Album cover'
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

				<input
					type='file'
					ref={fileInputRef}
					onChange={handleFileChange}
					className='hidden'
					accept='image/jpeg,image/png,image/webp'
				/>
			</div>
		</div>
	);
};

export default CoverImageUpload;
