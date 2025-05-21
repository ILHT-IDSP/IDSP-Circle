'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useUpdateSession() {
	const { data: session, update } = useSession();
	const router = useRouter();
	const updateSessionData = async () => {
		try {
			// Fetch the latest user data from our session update API
			const response = await fetch('/api/auth/session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch updated user data');
			}

			const data = await response.json();

			if (data.success && data.user) {
				// Use the next-auth update function to update the session client-side
				await update({
					...session,
					user: {
						...session?.user,
						name: data.user.name,
						username: data.user.username,
						image: data.user.image,
						circleCount: data.user.circleCount,
						albumCount: data.user.albumCount,
						followersCount: data.user.followersCount,
						followingCount: data.user.followingCount,
					},
				});

				// Force a revalidation of the current page to reflect updated data
				router.refresh();
				console.log('Session updated successfully with new data:', data.user);
				return true;
			}
			return false;
		} catch (error) {
			console.error('Error updating session:', error);
			return false;
		}
	};

	return { updateSessionData };
}
