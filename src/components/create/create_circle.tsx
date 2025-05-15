'use client';
import CreateCircleTopBar from '@/components/create/circle/top_bar';
import { useState } from 'react';
import { Session } from 'next-auth';
import CreateCircleStepOne from './circle/step_one';
import CircleAvatar from './circle/circle_avatar';
import { ICircleFormData } from './circle/circle_types';
import { useRouter } from 'next/navigation';

export default function CreateCircle({ session }: { session: Session | null }) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState<ICircleFormData>({
		avatar: '',
		name: '',
		isPrivate: false, 
		members: [session?.user?.id as string],
		creatorId: session?.user?.id as string,
	});

	const handleBack = () => {
		router.push('/profile');
	};

	const handleSubmit = async () => {
		if (formData.name.trim() === '') {
			alert('Please enter a circle name');
			return;
		}

		try {
			setIsSubmitting(true);
			console.log('Sending formdata to server...', formData);

			const response = await fetch('/api/create/circle', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ formData }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to create circle');
			}

			console.log('Circle created successfully:', data);

			if (data.circle && data.circle.id) {
				router.push(`/circle/${data.circle.id}`);
			} else {
				router.push('/profile');
			}
		} catch (error) {
			console.error('Error creating circle:', error);
			alert('Failed to create circle. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className='flex flex-col h-full w-full'>
				<CreateCircleTopBar
					onClick={handleSubmit}
					onClickTwo={handleBack}
					isSubmitting={isSubmitting}
				/>

				<div className='flex flex-col items-center px-4 mt-6'>
					<CircleAvatar
						avatar={formData.avatar}
						setFormData={setFormData}
					/>

					<div className='w-full mt-6'>
						<CreateCircleStepOne
							formData={formData}
							setFormData={setFormData}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
