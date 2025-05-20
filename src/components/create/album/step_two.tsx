'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Circle } from '../circle/circle_types';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
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

interface CreateAlbumStepTwoProps {
	formData: IAlbumFormData;
	setFormData: React.Dispatch<React.SetStateAction<IAlbumFormData>>;
	onNext: () => void;
}

export default function CreateAlbumStepTwo({ formData, setFormData, onNext }: CreateAlbumStepTwoProps) {
	const [circles, setCircles] = useState<Circle[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
	const router = useRouter();

	const fetchCircles = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/getCircles');
			
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to fetch circles');
			}
			
			const data = await response.json();
			setCircles(data.data || []);
			setError(null);
		} catch (error) {
			console.error('Error fetching circles:', error);
			setError('Unable to load your circles. Please try again later.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCircles();
	}, []);

	useEffect(() => {
		// If we have a circleId from URL parameters, select that circle
		if (formData.circleId) {
			const circleFromParams = circles.find(c => c.id.toString() === formData.circleId);
			if (circleFromParams) {
				setSelectedCircle(circleFromParams);
			} else {
				// Reset circle ID if the user doesn't have access to the circle
				setFormData(prev => ({
					...prev,
					circleId: null,
				}));
			}
		}
	}, [circles, formData.circleId, setFormData]);

	const handleCircleSelect = (circle: Circle) => {
		setSelectedCircle(circle);
		setFormData(prev => ({
			...prev,
			circleId: circle.id.toString(),
		}));
	};	const handleClearSelection = () => {
		setSelectedCircle(null);
		setFormData(prev => ({
			...prev,
			circleId: null,
		}));
	};
		const handleNavigateToCreateCircle = () => {
		try {
			// Save the current album form state to sessionStorage
			const albumStateToSave = {
				...formData,
				// For File objects, we can't store them directly in sessionStorage
				// Store only the necessary data for each photo
				photos: formData.photos.map(photo => ({
					previewUrl: photo.previewUrl,
					description: photo.description,
					uploading: false,
					uploaded: false,
				}))
			};
			
			// Store the album state and the current step
			sessionStorage.setItem('albumCreationState', JSON.stringify(albumStateToSave));
			sessionStorage.setItem('albumCreationStep', '2');
			
			// Navigate to circle creation page with returnToAlbum flag
			router.push('/create/circle?returnToAlbum=true');
		} catch (error) {
			console.error('Error saving album state:', error);
			alert('There was an error navigating to circle creation. Please try again.');
		}
	};

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		onNext();
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-[200px]'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]'></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[200px] p-4'>
				<div className='text-red-500 mb-4'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='48'
						height='48'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<circle
							cx='12'
							cy='12'
							r='10'
						></circle>
						<line
							x1='12'
							y1='8'
							x2='12'
							y2='12'
						></line>
						<line
							x1='12'
							y1='16'
							x2='12'
							y2='16'
						></line>
					</svg>
				</div>
				<h3 className='text-lg font-medium mb-2'>Error</h3>
				<p className='text-center'>{error}</p>
				<button
					type='button'
					onClick={onNext}
					className='mt-4 px-6 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors'
				>
					Continue Without Circle
				</button>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmitForm}
			className='w-full'
		>
			<div className='mb-8'>
				<h2 className='text-xl font-medium mb-4 text-center'>Choose a Circle for Your Album</h2>				<>
					<div className="flex justify-between items-center mb-4">
						<h3 className='font-medium'>Select a Circle (Optional)</h3>
						<button 
							type='button'
							onClick={handleNavigateToCreateCircle}
							className='flex items-center gap-2 text-sm px-3 py-1.5 bg-[var(--primary)] text-white rounded-full hover:bg-[var(--primary-hover)] transition-colors'
						>
							<FaPlus size={12} />
							<span>Create New Circle</span>
						</button>
					</div>
					<p className='text-sm opacity-70 mb-4'>Choose a circle to share this album with, or leave unselected to keep it personal</p>

					{circles.length > 0 ? (
						<>
							<div className='grid grid-cols-3 gap-y-6 gap-x-4 justify-items-center'>
								{circles.map(circle => (
									<div
										key={circle.id}
										className='flex flex-col items-center'
										onClick={() => handleCircleSelect(circle)}
									>
										<button
											type='button'
											className={`relative p-1 rounded-full ${selectedCircle?.id === circle.id ? 'ring-2 ring-[var(--primary)] ring-offset-2' : ''}`}
										>
											<Image
												src={circle.avatar || '/images/circles/default.svg'}
												alt={circle.name}
												width={80}
												height={80}
												className='w-16 h-16 rounded-full border-2 border-[var(--background)] object-cover'
											/>
											{selectedCircle?.id === circle.id && (
												<div className='absolute bottom-0 right-0 bg-[var(--primary)] rounded-full p-1'>
													<svg
														width='14'
														height='14'
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
											)}
										</button>
										<span className='text-[var(--foreground)] text-xs text-center mt-2 max-w-[80px] truncate'>{circle.name}</span>
									</div>
								))}
							</div>
							
							{selectedCircle && (
								<div className='mt-4 flex justify-center'>
									<button
										type='button'
										onClick={handleClearSelection}
										className='text-sm text-[var(--primary)] underline'
									>
										Clear Selection
									</button>
								</div>
							)}
						</>
					) : (
						<div className='p-6 text-center bg-opacity-10 bg-[var(--muted)] rounded-lg'>
							<p className='mb-3'>You&apos;re not a member of any circles yet</p>
							<p className='text-sm opacity-70 mb-4'>Your album will be created as a personal album or you can create a new circle</p>
						</div>					)}
				</>
			</div>

			<div className='mt-8 flex justify-center'>
				<button
					type='submit'
					className='px-6 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors'
				>
					Continue
				</button>
			</div>
		</form>
	);
}
