'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useUpdateSession() {
	const { data: session, update, status } = useSession();
	const router = useRouter();

	const updateSessionData = async () => {
		// If session is loading or undefined, don't proceed
		if (status === 'loading' || !session) {
			console.log('Session not ready for update, status:', status);
			return false;
		}

		// Add retry mechanism
		const maxRetries = 3;
		let retryCount = 0;
		let lastError;

		while (retryCount < maxRetries) {
			try {				// Fetch the latest user data from our session update API
				const response = await fetch('/api/auth/update-session', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					cache: 'no-store',
				});

				if (!response.ok) {
					console.error(`Session update failed with status: ${response.status} (attempt ${retryCount + 1}/${maxRetries})`);
					retryCount++;
					await new Promise(r => setTimeout(r, 1000)); // Wait 1 second before retry
					continue;
				}

				// Check if the response has content before parsing
				const text = await response.text();
				if (!text || text.trim() === '') {
					console.error(`Empty response received from session API (attempt ${retryCount + 1}/${maxRetries})`);
					retryCount++;
					await new Promise(r => setTimeout(r, 1000)); // Wait 1 second before retry
					continue;
				}

				// Parse the JSON after confirming we have content
				const data = JSON.parse(text);

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
				console.error(`Session update error (attempt ${retryCount + 1}/${maxRetries}):`, error);
				lastError = error;
				retryCount++;
				if (retryCount < maxRetries) {
					await new Promise(r => setTimeout(r, 1000)); // Wait 1 second before retry
				}
			}
		}
		console.error(`Session update failed after ${maxRetries} attempts. Last error:`, lastError);
		return false;
	};

	return { updateSessionData };
}
