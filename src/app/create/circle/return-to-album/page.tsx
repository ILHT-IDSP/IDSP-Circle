'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Loading component to display while suspense is active
function LoadingState() {
	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)] mx-auto mb-4'></div>
				<p className='text-lg'>Loading...</p>
			</div>
		</div>
	);
}

// Main component wrapped with useSearchParams
function ReturnToAlbumContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const circleId = searchParams.get('circleId');

	useEffect(() => {
		// Store the circle ID if provided
		if (circleId) {
			sessionStorage.setItem('newlyCreatedCircleId', circleId);
		}

		// Set the flag to indicate we're returning from circle creation
		sessionStorage.setItem('returnToAlbumCreation', 'true');

		// Redirect back to the album creation page
		router.push('/create/album');
	}, [circleId, router]);

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)] mx-auto mb-4'></div>
				<p className='text-lg'>Returning to album creation...</p>
			</div>
		</div>
	);
}

// Default export with Suspense boundary
export default function ReturnToAlbumPage() {
	return (
		<Suspense fallback={<LoadingState />}>
			<ReturnToAlbumContent />
		</Suspense>
	);
}
