import Image from 'next/image';
import { IFormDataProps } from '../register_types';

import SkipButton from './skip_button';
import { useRef, useState } from 'react';
import ImageCropper from './ImageCropper';
import { createCroppedImage } from './cropUtils';

export default function AddProfilePicture({ formData, setFormData, onNext }: IFormDataProps & { onNext: () => void }) {
	const [preview, setPreview] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [uploadLoading, setUploadLoading] = useState(false);
	const [showCropper, setShowCropper] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = async (file: File) => {
		if (file) {
			setSelectedFile(file);
			const previewUrl = URL.createObjectURL(file);
			setPreview(previewUrl);
			setShowCropper(true);
		}
	};
	const uploadCroppedImage = async () => {
		if (!preview || !croppedAreaPixels) return;

		try {
			setUploadLoading(true);
			// Create a cropped image blob
			const croppedImageBlob = await createCroppedImage(preview, croppedAreaPixels);

			// Create a file from the blob
			const croppedFile = new File([croppedImageBlob], selectedFile?.name || 'cropped-image.jpg', { type: 'image/jpeg' });

			// Upload the cropped file
			const uploadData = new FormData();
			uploadData.append('file', croppedFile);

			const res = await fetch('/api/upload', {
				method: 'POST',
				body: uploadData,
			});
			const data = await res.json();

			if (data.url) {
				setFormData(prev => ({ ...prev, profileImage: data.url }));
			} else {
				setFormData(prev => ({ ...prev, profileImage: '' }));
			}
		} catch (error) {
			console.error('Error uploading cropped image:', error);
		} finally {
			setUploadLoading(false);
			setShowCropper(false);

			// Clean up the blob URL to prevent memory leaks
			if (preview) {
				URL.revokeObjectURL(preview);
				setPreview(null);
			}
			setSelectedFile(null);
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Check if the file is an image
			if (file.type.startsWith('image/')) {
				handleFileUpload(file);
			} else {
				alert('Please select an image file');
			}
		}
	};

	const handleSkip = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setFormData(prev => ({ ...prev, profileImage: '/images/default-avatar.png' }));
		onNext();
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);

		const file = e.dataTransfer?.files?.[0];
		if (file && file.type.startsWith('image/')) {
			handleFileUpload(file);
		} else if (file) {
			alert('Please drop an image file');
		}
	};
	return (
		<>
			{' '}
			<div>
				{' '}
				<div
					className={`flex flex-col items-center ${isDragging ? 'bg-blue-100 dark:bg-blue-900/30' : ''} transition-colors duration-200 p-4 pb-8 rounded-lg border-2 ${isDragging ? 'border-blue-500 dark:border-blue-400 border-dashed' : 'border-transparent'}`}
					id='profile-picture-container'
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<div className='mb-4 relative'>
						<div className='relative inline-block'>
							{' '}
							<Image
								src={formData.profileImage || '/images/default-avatar.png'}
								width={150}
								height={150}
								alt='profile picture preview'
								className='rounded-full object-cover border-2 border-gray-200 dark:border-gray-700'
							/>
							{uploadLoading && (
								<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full'>
									<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white'></div>
								</div>
							)}
							{formData.profileImage && !uploadLoading && (
								<button
									onClick={() => inputRef.current?.click()}
									className='absolute bottom-0 right-0 bg-blue-600 dark:bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors'
									aria-label='Change profile picture'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-4 w-4'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
										/>
									</svg>
								</button>
							)}
						</div>
					</div>
					<p className='text-gray-500 dark:text-gray-400 mb-4 text-center'>{isDragging ? 'Drop your image here' : 'Drag and drop your image here, or click to select'}</p>
					<input
						type='file'
						accept='image/*'
						onChange={handleChange}
						ref={inputRef}
						style={{ display: 'none' }}
					/>{' '}
					<button
						type='button'
						className='bg-blue-600 dark:bg-blue-500 text-2xl text-white text-center rounded-full p-2 m-au w-full max-w-full transition-colors hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50'
						onClick={() => inputRef.current?.click()}
						disabled={uploadLoading}
					>
						{uploadLoading ? 'Uploading...' : 'Add Picture'}
					</button>
					{/* Show Next button only if a Cloudinary profile image is set (not a blob: URL) */}
					{formData.profileImage && formData.profileImage.startsWith('http') && (
						<div className='mt-4 w-full'>
							<button
								type='button'
								className='bg-blue-800 dark:bg-blue-700 text-2xl text-white text-center rounded-full p-3 m-au w-full max-w-full transition-colors hover:bg-blue-900 dark:hover:bg-blue-800'
								onClick={onNext}
							>
								Next
							</button>
						</div>
					)}
					{/* Only show Skip button if Next button is not visible */}
					{(!formData.profileImage || !formData.profileImage.startsWith('http')) && <SkipButton onClick={handleSkip} />}
				</div>
			</div>
			{/* Image Cropper Modal */}
			{showCropper && preview && (
				<ImageCropper
					imageUrl={preview}
					onCropComplete={cropData => setCroppedAreaPixels(cropData)}
					onCancel={() => {
						setShowCropper(false);
						if (preview) {
							URL.revokeObjectURL(preview);
							setPreview(null);
						}
						setSelectedFile(null);
					}}
					onConfirm={() => {
						uploadCroppedImage();
					}}
					isSubmitting={uploadLoading}
				/>
			)}
		</>
	);
}
