'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Circle } from '../circle/circle_types';

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

interface CreateAlbumStepTwoProps {
	formData: IAlbumFormData;
	setFormData: React.Dispatch<React.SetStateAction<IAlbumFormData>>;
	onNext: () => void;
}

export default function CreateAlbumStepTwo({ formData, setFormData, onNext }: CreateAlbumStepTwoProps) {
	const [circles, setCircles] = useState<Circle[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);

	useEffect(() => {
		const getCircles = async () => {
			try {
				const response = await fetch('/api/getCircles');
				if (!response.ok) throw new Error('Failed to fetch circles');
				const data = await response.json();
				setCircles(data.data || []);
			} catch (error) {
				console.error('Error fetching circles:', error);
			} finally {
				setLoading(false);
			}
		};
		getCircles();
	}, []);

	useEffect(() => {
		// If we have a circleId from URL parameters, select that circle
		if (formData.circleId) {
			const circleFromParams = circles.find(c => c.id.toString() === formData.circleId);
			if (circleFromParams) {
				setSelectedCircle(circleFromParams);
			}
		}
	}, [circles, formData.circleId]);

	const handleCircleSelect = (circle: Circle) => {
		setSelectedCircle(circle);
		setFormData(prev => ({
			...prev,
			circleId: circle.id.toString(),
		}));
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

	return (
		<form
			onSubmit={handleSubmitForm}
			className='w-full'
		>
			<div className='mb-8'>
				<h2 className='text-xl font-medium mb-4 text-center'>Choose a Circle for Your Album</h2>

				{/* Circle selection */}
				<div className='mb-8'>
					<h3 className='font-medium mb-3'>Select a Circle (Optional)</h3>
					<p className='text-sm opacity-70 mb-4'>Choose a circle to share this album with, or leave unselected to keep it personal</p>

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
				</div>
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
