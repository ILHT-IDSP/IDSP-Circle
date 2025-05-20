import React, { useState } from 'react';
import Image from 'next/image';
import { AlbumPhoto } from '../create_album';

interface IAlbumFormData {
	title: string;
	coverImage: string;
	description: string;
	isPrivate: boolean;
	creatorId: string | undefined;
	circleId: string | null;
	photos: AlbumPhoto[];
}

interface CreateAlbumStepThreeProps {
	formData: IAlbumFormData;
	setFormData: React.Dispatch<React.SetStateAction<IAlbumFormData>>;
	onSubmit: () => void;
	isSubmitting: boolean;
}

export default function CreateAlbumStepThree({ formData, setFormData, onSubmit, isSubmitting }: CreateAlbumStepThreeProps) {
	// Initialize the selected cover image based on the formData
	const [selectedCoverImageIndex, setSelectedCoverImageIndex] = useState<number | null>(() => {
		if (formData.coverImage) {
			const index = formData.photos.findIndex(photo => photo.previewUrl === formData.coverImage);
			return index >= 0 ? index : null;
		}
		return null;
	});

	const handleSelectCoverImage = (index: number) => {
		setSelectedCoverImageIndex(index);
		setFormData(prev => ({
			...prev,
			coverImage: prev.photos[index].previewUrl,
		}));
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			title: e.target.value,
		}));
	};

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData(prev => ({
			...prev,
			description: e.target.value,
		}));
	};

	const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			isPrivate: e.target.value === 'private',
		}));
	};

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();

		// Validations
		if (!formData.title.trim()) {
			alert('Please enter an album title');
			return;
		}

		if (!formData.coverImage) {
			alert('Please select a cover image for the album');
			return;
		}

		onSubmit();
	};

	return (
		<form
			onSubmit={handleSubmitForm}
			className='w-full'
		>
			<div className='mb-8'>
				<h2 className='text-xl font-medium mb-4 text-center'>Finalize Your Album</h2>

				{/* Cover Image Selection */}
				<div className='mb-8'>
					<h3 className='font-medium mb-3'>Select Cover Image *</h3>
					<p className='text-sm opacity-70 mb-4'>Choose one photo to be your album cover</p>
					<div className='grid grid-cols-4 gap-3'>
						{formData.photos.map((photo, index) => (
							<div
								key={index}
								onClick={() => handleSelectCoverImage(index)}
								className={`relative cursor-pointer rounded-lg overflow-hidden aspect-square border-2 ${selectedCoverImageIndex === index ? 'border-[var(--primary)]' : 'border-transparent hover:border-[var(--foreground)] hover:border-opacity-30'}`}
							>
								<Image
									src={photo.previewUrl}
									alt={`Photo ${index + 1}`}
									fill
									className='object-cover'
								/>
								{/* Upload Status Indicators */}
								{isSubmitting && (
									<div className='absolute inset-0 flex items-center justify-center'>
										{photo.error ? (
											<div className='absolute top-2 right-2 bg-red-500 rounded-full p-2 shadow-md'>
												<svg
													width='16'
													height='16'
													viewBox='0 0 24 24'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'
														fill='white'
													/>
												</svg>
												<span className='absolute bottom-[-20px] left-[-40px] right-[-40px] text-white text-xs text-center bg-red-500 bg-opacity-90 py-1 px-2 rounded-md whitespace-nowrap'>{photo.error}</span>
											</div>
										) : photo.uploaded ? (
											<div className='absolute top-2 right-2 bg-green-500 rounded-full p-2 shadow-md'>
												<svg
													width='16'
													height='16'
													viewBox='0 0 24 24'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'
														fill='white'
													/>
												</svg>
											</div>
										) : photo.uploading ? (
											<div className='absolute bottom-2 right-2 bg-white bg-opacity-70 rounded-full p-1.5 shadow-md'>
												<div className='animate-spin rounded-full h-5 w-5 border-2 border-t-[var(--primary)] border-r-transparent border-b-[var(--primary)] border-l-transparent'></div>
											</div>
										) : null}
									</div>
								)}

								{/* Selected Cover Image Indicator */}
								{selectedCoverImageIndex === index && !isSubmitting && (
									<div className='absolute inset-0 bg-[var(--primary)] bg-opacity-20 flex items-center justify-center'>
										<div className='bg-[var(--primary)] rounded-full p-2'>
											<svg
												width='20'
												height='20'
												viewBox='0 0 24 24'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'
													fill='white'
												/>
											</svg>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Album Details */}
				<div className='mb-6'>
					<h3 className='font-medium mb-4'>Album Details</h3>

					<div className='space-y-4'>
						<div>
							<label
								htmlFor='album-title'
								className='block text-sm font-medium mb-1'
							>
								Title *
							</label>
							<input
								type='text'
								id='album-title'
								value={formData.title}
								onChange={handleTitleChange}
								className='w-full px-3 py-2 border border-[var(--foreground)] border-opacity-20 rounded-md bg-transparent focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]'
								placeholder='Give your album a title'
								required
							/>
						</div>

						<div>
							<label
								htmlFor='album-description'
								className='block text-sm font-medium mb-1'
							>
								Description (Optional)
							</label>
							<textarea
								id='album-description'
								value={formData.description}
								onChange={handleDescriptionChange}
								className='w-full px-3 py-2 border border-[var(--foreground)] border-opacity-20 rounded-md bg-transparent focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]'
								placeholder='Describe your album...'
								rows={3}
							/>
						</div>

						<div>
							<label className='block text-sm font-medium mb-2'>Privacy</label>
							<div className='space-y-2'>
								<label className='flex items-center'>
									<input
										type='radio'
										name='privacy'
										value='private'
										checked={formData.isPrivate}
										onChange={handlePrivacyChange}
										className='mr-2'
									/>
									<span>Private (Only you and selected circle can view)</span>
								</label>
								<label className='flex items-center'>
									<input
										type='radio'
										name='privacy'
										value='public'
										checked={!formData.isPrivate}
										onChange={handlePrivacyChange}
										className='mr-2'
									/>
									<span>Public (Anyone can view)</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>{' '}
			<div className='mt-8 flex flex-col items-center'>
				{isSubmitting ? (
					<div className='flex flex-col items-center justify-center'>
						<div className='flex items-center mb-4'>
							<div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[var(--primary)] mr-3'></div>
							<span>Creating album and uploading photos...</span>
						</div>

						{/* Upload Progress Bar */}
						<div className='w-full max-w-md bg-gray-300 bg-opacity-30 rounded-full h-2.5 mb-2'>
							<div
								className='bg-[var(--primary)] h-2.5 rounded-full transition-all duration-300'
								style={{
									width: `${formData.photos.length > 0 ? (formData.photos.filter(p => p.uploaded || p.error).length / formData.photos.length) * 100 : 0}%`,
								}}
							></div>
						</div>

						<div className='text-sm opacity-70'>
							{formData.photos.filter(p => p.uploaded).length} of {formData.photos.length} photos uploaded
							{formData.photos.filter(p => p.error).length > 0 && ` (${formData.photos.filter(p => p.error).length} failed)`}
						</div>
					</div>
				) : (
					<button
						type='submit'
						className='px-6 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
						disabled={!formData.title || !formData.coverImage}
					>
						Create Album
					</button>
				)}
			</div>
		</form>
	);
}
