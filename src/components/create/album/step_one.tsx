'use client';
import React, { useState, useRef } from 'react';
import { FaUpload, FaTimes, FaCheck } from 'react-icons/fa';
import Image from 'next/image';

interface IAlbumFormData {
	title: string;
	coverImage: string;
	description: string;
	isPrivate: boolean;
	creatorId: string | undefined;
	circleId: string | null;
	photos: Array<{
		file: File;
		previewUrl: string;
		description: string;
		uploading: boolean;
		uploaded: boolean;
		error?: string;
	}>;
}

interface CreateAlbumStepOneProps {
	formData: IAlbumFormData;
	setFormData: React.Dispatch<React.SetStateAction<IAlbumFormData>>;
	onNext: () => void;
}

export default function CreateAlbumStepOne({ formData, setFormData, onNext }: CreateAlbumStepOneProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [dragActive, setDragActive] = useState<boolean>(false);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		addFiles(files);
	};

	const addFiles = (files: FileList) => {
		// Convert FileList to array and filter out non-image files
		const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'));

		// Create preview URLs and add to photos state
		const newPhotos = fileArray.map(file => ({
			file,
			previewUrl: URL.createObjectURL(file),
			description: '',
			uploading: false,
			uploaded: false,
		}));

		setFormData(prev => ({
			...prev,
			photos: [...(prev.photos || []), ...newPhotos],
		}));

		// Clear the input to allow selecting the same file again
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
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
			addFiles(e.dataTransfer.files);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		if (formData.photos.length === 0) {
			alert('Please add at least one photo to continue');
			return;
		}
		
		onNext();
	};	return (
		<form onSubmit={handleSubmit} className='w-full'>
			<div className='mb-6'>
				<h2 className='text-xl font-medium mb-4 text-center'>Add Photos to Your Album</h2>

				<div
					onClick={() => fileInputRef.current?.click()}
					onDragOver={handleDragOver}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all min-h-[200px] ${
						dragActive 
							? 'border-[var(--primary)] bg-[var(--primary)] bg-opacity-5' 
							: 'border-[var(--foreground)] border-opacity-20 hover:border-opacity-40'
					}`}
				>					<FaUpload className='text-4xl mb-4 text-[var(--foreground)] opacity-60' />
					<p className='mb-2 font-medium'>Drag & drop photos here</p>
					<p className='text-sm opacity-70 mb-4'>or click to browse your files</p>
					<p className='text-xs opacity-50'>JPG, PNG, or GIF (max 5MB each)</p>
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						multiple
						onChange={handleFileSelect}
						className='hidden'
						aria-label="Upload photos"
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
		</form>
	);
}
