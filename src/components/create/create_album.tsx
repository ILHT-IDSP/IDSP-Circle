'use client';
import React, { useState } from 'react';
import { Session } from 'next-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateAlbumTopBar from './album/top_bar';
import CreateAlbumStepOne from './album/step_one';
import CreateAlbumStepTwo from './album/step_two';
import CreateAlbumStepThree from './album/step_three';

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

export default function CreateAlbum({ session }: { session: Session | null }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const circleId = searchParams.get('circleId');
	const [currentStep, setCurrentStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState<IAlbumFormData>({
		coverImage: '',
		title: '',
		description: '',
		isPrivate: true,
		creatorId: session?.user?.id,
		circleId: circleId,
		photos: [],
	});

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		} else {
			router.push('/profile');
		}
	};
	const handleNext = () => {
		// For Step 1, validate that at least one photo is added
		if (currentStep === 1) {
			if (formData.photos.length === 0) {
				alert('Please add at least one photo to continue');
				return;
			}
		}

		// Move to next step if not on last step
		if (currentStep < 3) {
			setCurrentStep(currentStep + 1);
		}
	};
	const handleSubmit = async () => {
		try {
			setIsSubmitting(true);
			console.log('Sending album data to server...', formData);

			// Find the index of the selected cover image (which currently has a blob URL)
			const selectedCoverIndex = formData.photos.findIndex(photo => photo.previewUrl === formData.coverImage);

			// First, create the album without a cover image
			const response = await fetch('/api/create/album', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					formData: {
						title: formData.title,
						description: formData.description,
						coverImage: null, // Don't set the cover image yet - it's currently a blob URL
						isPrivate: formData.isPrivate,
						creatorId: formData.creatorId,
						circleId: formData.circleId,
					},
				}),
			});

			let data;
			try {
				data = await response.json();
			} catch (parseError) {
				console.error('Error parsing album creation response:', parseError);
				throw new Error('Failed to parse server response');
			}

			if (!response.ok) {
				throw new Error(data.error || 'Failed to create album');
			}
			console.log('Album created successfully:', data);
			const albumId = data.album.id;
			const coverImageUrl = null;

			if (formData.photos && formData.photos.length > 0) {
				console.log(`Uploading ${formData.photos.length} photos to album ${albumId}`);

				// Update photos to mark them as uploading
				setFormData(prev => ({
					...prev,
					photos: prev.photos.map(photo => ({
						...photo,
						uploading: true,
						uploaded: false,
					})),
				}));

				for (let i = 0; i < formData.photos.length; i++) {
					const photo = formData.photos[i];
					const isSelectedCoverImage = selectedCoverIndex === i;

					try {
						const photoFormData = new FormData();
						photoFormData.append('file', photo.file);
						photoFormData.append('description', photo.description || '');

						// If this is the selected cover image, mark it as such
						if (isSelectedCoverImage) {
							photoFormData.append('isCoverImage', 'true');
						}

						console.log(`Uploading photo to /api/albums/${albumId}/photos`, photo.file.name);
						// Check if file is too large (Cloudinary free tier has a 5MB limit)
						if (photo.file.size > 5 * 1024 * 1024) {
							console.error(`File ${photo.file.name} is too large (${(photo.file.size / 1024 / 1024).toFixed(2)}MB). Max size is 5MB.`);

							// Mark file as error
							setFormData(prev => ({
								...prev,
								photos: prev.photos.map((p, index) => (index === i ? { ...p, uploading: false, error: 'File too large (max 5MB)' } : p)),
							}));
							continue;
						}
						const uploadResponse = await fetch(`/api/albums/${albumId}/photos`, {
							method: 'POST',
							body: photoFormData,
						});

						let responseData;
						try {
							responseData = await uploadResponse.json();
							console.log('Photo upload response:', responseData);

							// Mark photo as uploaded
							setFormData(prev => ({
								...prev,
								photos: prev.photos.map((p, index) => (index === i ? { ...p, uploading: false, uploaded: true } : p)),
							}));
						} catch (parseError) {
							console.error('Error parsing response:', parseError);

							// Mark photo as failed
							setFormData(prev => ({
								...prev,
								photos: prev.photos.map((p, index) => (index === i ? { ...p, uploading: false, error: 'Upload failed' } : p)),
							}));
						}

						if (!uploadResponse.ok) {
							console.error('Photo upload failed with status:', uploadResponse.status);
							console.error('Response data:', responseData);

							// Mark photo as failed
							setFormData(prev => ({
								...prev,
								photos: prev.photos.map((p, index) => (index === i ? { ...p, uploading: false, error: `Upload failed (${uploadResponse.status})` } : p)),
							}));
						}
					} catch (error) {
						console.error('Error uploading photo:', error);

						// Mark photo as failed
						setFormData(prev => ({
							...prev,
							photos: prev.photos.map((p, index) => (index === i ? { ...p, uploading: false, error: 'Upload failed' } : p)),
						}));

						// Continue with other photos even if one fails
					}
				}

				// Check if all photos are uploaded or have errors
				const allPhotosProcessed = formData.photos.every(p => p.uploaded || p.error);
				if (allPhotosProcessed) {
					// Small delay to show completion status
					setTimeout(() => {
						router.push('/');
					}, 1000);
				} else {
					router.push('/');
				}
			} else {
				router.push('/');
			}
		} catch (error) {
			console.error('Error creating album:', error);
			alert('Failed to create album. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};
	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<div className='w-full'>
						<CreateAlbumStepOne
							formData={formData}
							setFormData={setFormData}
							onNext={handleNext}
						/>
					</div>
				);
			case 2:
				return (
					<div className='w-full'>
						<CreateAlbumStepTwo
							formData={formData}
							setFormData={setFormData}
							onNext={handleNext}
						/>
					</div>
				);
			case 3:
				return (
					<div className='w-full'>
						<CreateAlbumStepThree
							formData={formData}
							setFormData={setFormData}
							onSubmit={handleSubmit}
							isSubmitting={isSubmitting}
						/>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<div className='flex flex-col h-full w-full'>
				{' '}
				<CreateAlbumTopBar
					onClick={currentStep === 3 ? handleSubmit : handleNext}
					onClickTwo={handleBack}
					isSubmitting={isSubmitting}
					currentStep={currentStep}
				/>{' '}
				<div className='flex flex-col items-center px-4 mt-6'>
					{' '}
					<div className='flex justify-center items-center gap-3 mb-6'>
						{[1, 2, 3].map(step => (
							<React.Fragment key={step}>
								<div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentStep >= step ? 'bg-[var(--primary)] opacity-100 transform scale-110' : 'bg-[var(--foreground)] opacity-30'}`} />
								{step < 3 && <div className={`h-0.5 w-7 transition-all duration-300 ${currentStep > step ? 'bg-[var(--primary)] opacity-100' : 'bg-[var(--foreground)] opacity-20'}`} />}
							</React.Fragment>
						))}
					</div>
					<div className='w-full animate-[fadeIn_0.3s_ease-out]'>{renderStepContent()}</div>
				</div>
			</div>
		</>
	);
}
