import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { AlbumPhoto } from '../create_album';

interface PhotoReuploadProps {
	photos: AlbumPhoto[];
	onPhotosReupload: (photos: AlbumPhoto[]) => void;
	onCancel: () => void;
}

export default function PhotoReupload({ photos, onPhotosReupload, onCancel }: PhotoReuploadProps) {
	const [reuploadedPhotos, setReuploadedPhotos] = useState<AlbumPhoto[]>(photos);
	// Using callback refs instead of ref array
	const fileInputRefs = React.useRef<Map<number, HTMLInputElement | null>>(new Map());

	const setFileInputRef = (index: number) => (el: HTMLInputElement | null) => {
		if (el) fileInputRefs.current.set(index, el);
	};

	const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) return;

		const file = event.target.files[0];

		// Update the photo at the specific index with the new File object
		setReuploadedPhotos(currentPhotos => currentPhotos.map((photo, i) => (i === index ? { ...photo, file, error: undefined } : photo)));
	};
	const triggerFileInput = (index: number) => {
		const inputRef = fileInputRefs.current.get(index);
		if (inputRef) inputRef.click();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Check if all photos have file objects
		const allPhotosHaveFiles = reuploadedPhotos.every(photo => photo.file);

		if (!allPhotosHaveFiles) {
			alert('Please re-upload all photos before continuing');
			return;
		}

		onPhotosReupload(reuploadedPhotos);
	};

	return (
		<div className='p-4 bg-white dark:bg-[var(--background)] rounded-lg shadow-md'>
			<h3 className='text-xl font-medium mb-4 text-center'>Re-upload Your Photos</h3>
			<p className='text-sm opacity-70 mb-6 text-center'>Your photo data was lost during navigation. Please re-upload each photo to continue.</p>

			<form onSubmit={handleSubmit}>
				<div className='space-y-4'>
					{reuploadedPhotos.map((photo, index) => (
						<div
							key={index}
							className='flex items-center space-x-4 p-2 border rounded-lg'
						>
							{' '}
							<div className='w-20 h-20 relative'>
								<Image
									src={photo.previewUrl}
									alt={`Photo ${index + 1}`}
									className='object-cover rounded-md'
									fill
									sizes='80px'
								/>
							</div>
							<div className='flex-grow'>
								<p className='font-medium mb-1'>Photo {index + 1}</p>
								{photo.description && <p className='text-sm opacity-70 mb-2'>Caption: {photo.description}</p>}{' '}
								<input
									type='file'
									accept='image/*'
									ref={setFileInputRef(index)}
									onChange={e => handleFileChange(index, e)}
									className='hidden'
								/>
								<button
									type='button'
									onClick={() => triggerFileInput(index)}
									className='px-3 py-1 text-sm bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-hover)] transition-colors'
								>
									{photo.file ? 'Change File' : 'Upload File'}
								</button>
								{photo.file && <span className='ml-2 text-sm text-green-500'>✓ File selected</span>}
								{!photo.file && <span className='ml-2 text-sm text-red-500'>File needed</span>}
							</div>
						</div>
					))}
				</div>

				<div className='flex justify-center space-x-4 mt-8'>
					<button
						type='button'
						onClick={onCancel}
						className='px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-lg hover:bg-[var(--primary-hover)] hover:text-white transition-colors'
					>
						Go Back to Step 1
					</button>
					<button
						type='submit'
						className='px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors'
					>
						Continue
					</button>
				</div>
			</form>
		</div>
	);
}
