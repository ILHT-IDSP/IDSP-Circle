'use client';

import { useState, useRef } from 'react';
import { FaTimes, FaUpload } from 'react-icons/fa';
import OptimizedImage from '../common/OptimizedImage';

interface Photo {
	id: number;
	url: string;
	description: string | null;
	createdAt: string;
}

interface AddPhotoModalProps {
	albumId: number;
	isOpen: boolean;
	onClose: () => void;
	onPhotoAdded: (photo: Photo) => void;
}

const AddPhotoModal: React.FC<AddPhotoModalProps> = ({ albumId, isOpen, onClose, onPhotoAdded }) => {
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [description, setDescription] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);

	// Prevent body scrolling when modal is open
	useState(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Check file type
		if (!file.type.startsWith('image/')) {
			setError('Please select an image file');
			return;
		}

		// Check file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			setError('Image must be less than 5MB');
			return;
		}

		setError(null);
		setSelectedImage(file);

		// Create preview URL
		const reader = new FileReader();
		reader.onloadend = () => {
			setPreviewUrl(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!selectedImage) {
			setError('Please select an image');
			return;
		}

		setIsUploading(true);
		setError(null);

		try {
			// Create form data for the file upload
			const formData = new FormData();
			formData.append('file', selectedImage);
			formData.append('albumId', albumId.toString());

			if (description) {
				formData.append('description', description);
			}

			// Upload the image
			const uploadResponse = await fetch('/api/upload/photo', {
				method: 'POST',
				body: formData,
			});

			if (!uploadResponse.ok) {
				const errorData = await uploadResponse.json();
				throw new Error(errorData.error || 'Failed to upload image');
			}

			const photoData = await uploadResponse.json();

			// Call the callback to update the UI
			onPhotoAdded(photoData);

			// Close the modal
			onClose();
		} catch (error) {
			console.error('Error uploading image:', error);
			setError(error instanceof Error ? error.message : 'Failed to upload image');
		} finally {
			setIsUploading(false);
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
					{' '}
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
					{' '}
					{/* Preview area */}
					<div
						onClick={() => fileInputRef.current?.click()}
						className='border-2 border-dashed border-[var(--foreground)] border-opacity-20 rounded-lg p-4 mb-4 flex flex-col items-center justify-center cursor-pointer hover:border-opacity-40 transition-all'
						style={{ minHeight: previewUrl ? 'auto' : '200px' }}
					>
						{previewUrl ? (
							<div
								className='relative w-full'
								style={{ maxHeight: '300px' }}
							>
								<OptimizedImage
									src={previewUrl}
									alt='Preview'
									width={400}
									height={300}
									className='rounded-lg mx-auto object-contain'
									fallbackSrc='/images/albums/default.svg'
								/>
							</div>
						) : (
							<>
								<FaUpload className='text-[var(--foreground)] opacity-40 text-3xl mb-2' />
								<p className='text-[var(--foreground)] opacity-70 mb-1'>Click to select an image</p>
								<p className='text-[var(--foreground)] opacity-50 text-sm'>JPG, PNG, GIF up to 5MB</p>
							</>
						)}
					</div>
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						onChange={handleImageChange}
						className='hidden'
					/>
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
					{error && <div className='mb-4 text-red-500 text-sm'>{error}</div>} {/* Buttons */}
					<div className='flex justify-end gap-2'>
						<button
							type='button'
							onClick={onClose}
							disabled={isUploading}
							className='px-4 py-2 text-[var(--foreground)] hover:bg-[var(--foreground)] hover:bg-opacity-5 rounded-md'
						>
							Cancel
						</button>{' '}
						<button
							type='submit'
							disabled={!selectedImage || isUploading}
							className={`px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] rounded-md flex items-center gap-2 ${!selectedImage || isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
						>
							{isUploading ? 'Uploading...' : 'Upload Photo'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddPhotoModal;
