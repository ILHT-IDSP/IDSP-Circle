'use client';
import { useState } from 'react';
import { Session } from 'next-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateAlbumTopBar from './album/top_bar';
import CreateAlbumStepOne from './album/step_one';
import AlbumAvatar from './album/album_avatar';

interface IAlbumFormData {
	title: string;
	coverImage: string;
	isPrivate: boolean;
	creatorId: string | undefined;
	circleId: string | null;
}

export default function CreateAlbum({ session }: { session: Session | null }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const circleId = searchParams.get('circleId');

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState<IAlbumFormData>({
		coverImage: '',
		title: '',
		isPrivate: true,
		creatorId: session?.user?.id,
		circleId: circleId,
	});

	const handleBack = () => {
		router.push('/profile');
	};
	const handleSubmit = async () => {
		// Validate title
		if (formData.title.trim() === '') {
			alert('Please enter an album title');
			return;
		}

		if (formData.coverImage.trim() === '') {
			alert('Please upload a cover image for your album');
			return;
		}

		try {
			setIsSubmitting(true);
			console.log('Sending album data to server...', formData);

			const response = await fetch('/api/create/album', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ formData }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to create album');
			}
			console.log('Album created successfully:', data);

			router.push('/');
		} catch (error) {
			console.error('Error creating album:', error);
			alert('Failed to create album. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className='flex flex-col h-full w-full'>
				<CreateAlbumTopBar
					onClick={handleSubmit}
					onClickTwo={handleBack}
					isSubmitting={isSubmitting}
				/>{' '}
				<div className='flex flex-col items-center px-4 mt-6'>
					<AlbumAvatar
						coverImage={formData.coverImage}
						setFormData={setFormData}
					/>

					<div className='w-full mt-6'>
						<CreateAlbumStepOne
							formData={formData}
							setFormData={setFormData}
							onSubmit={handleSubmit}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
