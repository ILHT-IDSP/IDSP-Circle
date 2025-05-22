'use client';
import React, { useState, useRef } from 'react';
import { FaUpload, FaTimes, FaCheck } from 'react-icons/fa';
import Image from 'next/image';
import { AlbumPhoto } from '../create_album';
import { createCroppedImage } from '../../user_registration/add_profilepicture/cropUtils';
import ImageCropper from '../../user_registration/add_profilepicture/ImageCropper';

interface IAlbumFormData {
	title: string;
	coverImage: string;
	description: string;
	isPrivate: boolean;
	creatorId: string | undefined;
	circleId: string | null;
	photos: AlbumPhoto[];
}

interface CreateAlbumStepOneProps {
	formData: IAlbumFormData;
	setFormData: React.Dispatch<React.SetStateAction<IAlbumFormData>>;
	onNext: () => void;
}

export default function CreateAlbumStepOne({ formData, setFormData, onNext }: CreateAlbumStepOneProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [dragActive, setDragActive] = useState<boolean>(false);
	const [showCropper, setShowCropper] = useState(false);
	const [currentFile, setCurrentFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
	const [currentDescription, setCurrentDescription] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		// Use the first file for cropping
		const file = files[0];

		if (file.type.startsWith('image/')) {
			// Create a preview and open the cropper
			const filePreviewUrl = URL.createObjectURL(file);
			setCurrentFile(file);
			setPreviewUrl(filePreviewUrl);
			setShowCropper(true);
		} else {
			alert('Please select an image file');
		}
	};

	const handleCropComplete = (croppedArea: any) => {
		setCroppedAreaPixels(croppedArea);
	};

	const handleCropCancel = () => {
		setShowCropper(false);
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
		setCurrentFile(null);
		setCurrentDescription('');
	};

	const finalizeCroppedImage = async () => {
		if (!previewUrl || !croppedAreaPixels || !currentFile) return;

		try {
			setIsSubmitting(true);

			// Create a cropped image blob
			const croppedImageBlob = await createCroppedImage(previewUrl, croppedAreaPixels);

			// Create a file from the blob
			const croppedFile = new File([croppedImageBlob], currentFile.name, { type: 'image/jpeg' });

			// Create a new preview URL for the cropped image
			const croppedPreviewUrl = URL.createObjectURL(croppedImageBlob);

			// Add the cropped photo to the album
			setFormData(prev => ({
				...prev,
				photos: [
					...(prev.photos || []),
					{
						file: croppedFile,
						previewUrl: croppedPreviewUrl,
						description: currentDescription,
						uploading: false,
						uploaded: false,
					},
				],
			}));

			// Reset form for next photo
			setCurrentDescription('');
		} catch (error) {
			console.error('Image cropping error:', error);
			alert('Failed to crop image');
		} finally {
			setIsSubmitting(false);
			setShowCropper(false);

			// Clean up the blob URL to prevent memory leaks
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
				setPreviewUrl(null);
			}
			setCurrentFile(null);
		}
	};

	const handleRemovePhoto = (index: number) => {
		setFormData(prev => {
			const updatedPhotos = [...prev.photos];
			// Revoke object URL to prevent memory leaks
			URL.revokeObjectURL(updatedPhotos[index].previewUrl);
			updatedPhotos.splice(index, 1);
			return { ...prev, photos: updatedPhotos };
		});
	};

	const handlePhotoDescriptionChange = (index: number, value: string) => {
		setFormData(prev => {
			const updatedPhotos = [...prev.photos];
			updatedPhotos[index].description = value;
			return { ...prev, photos: updatedPhotos };
		});
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
	};
	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			// Use the first file for cropping
			const file = e.dataTransfer.files[0];

			if (file.type.startsWith('image/')) {
				// Create a preview and open the cropper
				const filePreviewUrl = URL.createObjectURL(file);
				setCurrentFile(file);
				setPreviewUrl(filePreviewUrl);
				setShowCropper(true);
			} else {
				alert('Please select an image file');
			}
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.photos.length === 0) {
			alert('Please add at least one photo to continue');
			return;
		}

		onNext();
	};
	return (
		<form
			onSubmit={handleSubmit}
			className='w-full'
		>
			<div className='mb-6'>
				<h2 className='text-xl font-medium mb-4 text-center'>Add Photos to Your Album</h2>

				<div
					onClick={() => fileInputRef.current?.click()}
					onDragOver={handleDragOver}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all min-h-[200px] ${dragActive ? 'border-[var(--primary)] bg-[var(--primary)] bg-opacity-5' : 'border-[var(--foreground)] border-opacity-20 hover:border-opacity-40'}`}
				>
					{' '}
					<FaUpload className='text-4xl mb-4 text-[var(--foreground)] opacity-60' />
					<p className='mb-2 font-medium'>Drag & drop a photo here</p>
					<p className='text-sm opacity-70 mb-4'>or click to browse your files</p>
					<p className='text-xs opacity-50'>JPG, PNG, or GIF (max 5MB each)</p>
					<p className='text-xs opacity-50 mt-1'>Photos will be cropped to fit the album layout</p>
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						onChange={handleFileSelect}
						className='hidden'
						aria-label='Upload photo'
					/>
				</div>
			</div>

			{formData.photos && formData.photos.length > 0 && (
				<div className='mb-6'>
					<div className='flex justify-between items-center mb-4 mt-8'>
						<h3 className='font-medium text-lg'>Selected Photos ({formData.photos.length})</h3>
						<button
							type='button'
							onClick={() => setFormData(prev => ({ ...prev, photos: [] }))}
							className='text-sm text-[#e8083e] hover:underline'
						>
							Remove All
						</button>
					</div>

					<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
						{formData.photos.map((photo, index) => (
							<div
								key={index}
								className='relative'
							>
								<div className='relative aspect-square rounded-lg overflow-hidden border border-[var(--foreground)] border-opacity-30'>
									<Image
										src={photo.previewUrl}
										alt={`Preview ${index + 1}`}
										fill
										className='object-cover'
									/>
								</div>
								<button
									type='button'
									onClick={() => handleRemovePhoto(index)}
									className='absolute top-2 right-2 bg-[rgba(0,0,0,0.6)] rounded-full p-1.5 text-white hover:bg-[rgba(0,0,0,0.8)]'
									aria-label='Remove photo'
								>
									<FaTimes size={14} />
								</button>
								<input
									type='text'
									placeholder='Add description'
									value={photo.description}
									onChange={e => handlePhotoDescriptionChange(index, e.target.value)}
									className='w-full mt-2 px-3 py-1.5 text-sm bg-transparent border border-[var(--foreground)] border-opacity-30 rounded'
								/>
							</div>
						))}
					</div>
				</div>
			)}

			<div className='mt-8 flex justify-center'>
				<button
					type='submit'
					className='px-6 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors'
				>
					Continue to Next Step
				</button>
			</div>

			{/* Image Cropper Modal */}
			{showCropper && previewUrl && (
				<div className='fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50'>
					<div className='bg-[var(--background)] rounded-xl max-w-2xl w-full p-4 flex flex-col'>
						<div className='flex justify-between items-center mb-4'>
							<h2 className='text-xl font-semibold'>Crop Your Image</h2>
							<button
								type='button'
								onClick={handleCropCancel}
								className='text-[var(--foreground)] opacity-60 hover:opacity-100'
							>
								<FaTimes />
							</button>
						</div>

						<ImageCropper
							imageUrl={previewUrl}
							onCropComplete={handleCropComplete}
							onCancel={handleCropCancel}
							onConfirm={finalizeCroppedImage}
							isSubmitting={isSubmitting}
						/>

						<div className='mt-4'>
							<label
								htmlFor='photo-description'
								className='block text-sm font-medium text-[var(--foreground)] mb-1'
							>
								Description (optional)
							</label>
							<input
								id='photo-description'
								type='text'
								value={currentDescription}
								onChange={e => setCurrentDescription(e.target.value)}
								className='w-full px-3 py-2 border border-[var(--foreground)] border-opacity-20 rounded-md bg-[var(--background)]'
								placeholder='Add a description to your photo'
							/>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}
