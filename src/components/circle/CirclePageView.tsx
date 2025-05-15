'use client';

import { Session } from 'next-auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import CircleHeader from './CircleHeader';
import CircleMembers from './CircleMembers';
import CircleAlbums from './CircleAlbums';

interface CircleDetails {
	id: number;
	name: string;
	avatar: string | null;
	description: string | null;
	isPrivate: boolean;
	createdAt: string;
	membersCount: number;
	isCreator: boolean;
	isMember: boolean;
}

export default function CirclePageView({ circleId, session }: { circleId: number; session: Session | null }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [circle, setCircle] = useState<CircleDetails | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchCircleDetails = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/circles/${circleId}`);

				if (!response.ok) {
					if (response.status === 404) {
						router.push('/profile');
						return;
					}
					throw new Error('Failed to fetch circle details');
				}

				const data = await response.json();
				setCircle(data);
			} catch (err) {
				console.error('Error fetching circle details:', err);
				setError('Could not load circle information. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		if (circleId) {
			fetchCircleDetails();
		}
	}, [circleId, router]);
	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--primary)]'></div>
			</div>
		);
	}

	if (error || !circle) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen p-4'>
				<h2 className='text-xl font-semibold text-red-500 mb-4'>Error</h2>
				<p className='text-center text-[var(--foreground)]'>{error || 'Circle not found'}</p>
				<button
					onClick={() => router.push('/profile')}
					className='mt-6 px-6 py-2 rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'
				>
					Back to Profile
				</button>
			</div>
		);
	}
	return (
		<div className='flex flex-col min-h-screen pb-20 bg-[var(--background)] text-[var(--foreground)]'>
			<CircleHeader
				circle={circle}
				session={session}
			/>
			<CircleMembers circleId={circleId} />
			<CircleAlbums circleId={circleId} />
		</div>
	);
}
