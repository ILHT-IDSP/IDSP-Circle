'use client';

import { useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import OptimizedImage from '../common/OptimizedImage';
import ImageUploadCropper from '../common/ImageUploadCropper';

interface Photo {
	id: number;
	url: string;
	description: string | null;
	createdAt: string;
}

interface CroppablePhotoUploadProps {
	albumId: number;
	isOpen: boolean;
	onClose: () => void;
	onPhotoAdded: (photo: Photo) => void;
}

const CroppablePhotoUpload: React.FC<CroppablePhotoUploadProps> = ({ albumId, isOpen, onClose, onPhotoAdded }) => {
	const [description, setDescription] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
	const cropperRef = useRef<HTMLDivElement>(null);

	// Prevent body scrolling when modal is open
	useState(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	const handleUploadStart = () => {
		setIsUploading(true);
		setError(null);
	};

	const handleUploadComplete = (imageUrl: string) => {
		setUploadedImageUrl(imageUrl);
		setIsUploading(false);
	};

	const handleUploadError = (errorMessage: string) => {
		setError(errorMessage);
		setIsUploading(false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!uploadedImageUrl) {
			setError('Please select and crop an image');
			return;
		}

		setIsUploading(true);
		setError(null);

		try {
			// The image is already uploaded by the ImageUploadCropper
			// We just need to associate it with the album and add description
			const response = await fetch('/api/upload/photo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					imageUrl: uploadedImageUrl,
					albumId: albumId,
					description: description || null,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to save photo to album');
			}

			const photoData = await response.json();

			// Call the callback to update the UI
			onPhotoAdded(photoData);

			// Close the modal
			onClose();
		} catch (error) {
			console.error('Error saving photo to album:', error);
			setError(error instanceof Error ? error.message : 'Failed to save photo');
		} finally {
			setIsUploading(false);
		}
	};

	const triggerFileInput = () => {
		// Access the input inside the ImageUploadCropper
		const input = cropperRef.current?.querySelector('input');
		if (input) {
			input.click();
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className='fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50 p-4'
			onClick={e => {
				// Close when clicking outside the modal
				if (e.target === e.currentTarget && !isUploading) onClose();
			}}
		>
			<div
				className='bg-[var(--background)] rounded-xl max-w-lg w-full overflow-hidden shadow-xl'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex justify-between items-center p-4 border-b border-[var(--foreground)] border-opacity-20'>
					<h2 className='text-xl font-semibold'>Add Photo to Album</h2>
					<button
						onClick={onClose}
						disabled={isUploading}
						className='text-[var(--foreground)] opacity-60 hover:opacity-100'
						aria-label='Close'
					>
						<FaTimes />
					</button>
				</div>

				<form
					onSubmit={handleSubmit}
					className='p-4'
				>
					{/* Image upload/preview area */}
					<div className='mb-6'>
						<div
							className='relative cursor-pointer'
							onClick={triggerFileInput}
							ref={cropperRef}
						>
							{uploadedImageUrl ? (
								<div className='relative aspect-square w-full max-w-md mx-auto mb-2'>
									<OptimizedImage
										src={uploadedImageUrl}
										alt='Uploaded photo'
										width={400}
										height={400}
										className='object-cover rounded-lg w-full h-full'
										fallbackSrc='/images/albums/default.svg'
									/>
								</div>
							) : (
								<div className='border-2 border-dashed border-[var(--foreground)] border-opacity-20 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-opacity-40 transition-all h-56'>
									<p className='text-[var(--foreground)] opacity-70 mb-1'>Click to select and crop an image</p>
									<p className='text-[var(--foreground)] opacity-50 text-sm'>JPG, PNG, GIF up to 5MB</p>
								</div>
							)}

							{isUploading && (
								<div className='absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
									<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white'></div>
								</div>
							)}
						</div>

						<ImageUploadCropper
							onUploadStart={handleUploadStart}
							onUploadComplete={handleUploadComplete}
							onUploadError={handleUploadError}
							uploadEndpoint='/api/upload'
							aspectRatio={1} // 1:1 aspect ratio for consistent photo display
						/>
					</div>

					{/* Description input */}
					<div className='mb-4'>
						<label
							htmlFor='description'
							className='block text-sm font-medium text-[var(--foreground)] mb-1'
						>
							Description (optional)
						</label>
						<textarea
							id='description'
							value={description}
							onChange={e => setDescription(e.target.value)}
							className='w-full px-3 py-2 border border-[var(--foreground)] border-opacity-20 rounded-md bg-[var(--background)]'
							placeholder='Add a description to your photo'
							rows={3}
						/>
					</div>

					{/* Error message */}
					{error && <div className='mb-4 text-red-500 text-sm'>{error}</div>}

					{/* Buttons */}
					<div className='flex justify-end gap-2'>
						<button
							type='button'
							onClick={onClose}
							disabled={isUploading}
							className='px-4 py-2 text-[var(--foreground)] hover:bg-[var(--foreground)] hover:bg-opacity-5 rounded-md'
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={!uploadedImageUrl || isUploading}
							className={`px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] rounded-md flex items-center gap-2 ${!uploadedImageUrl || isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
						>
							{isUploading ? 'Saving...' : 'Add to Album'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CroppablePhotoUpload;
