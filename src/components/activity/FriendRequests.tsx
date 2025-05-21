'use client';

import { useEffect, useState } from 'react';

interface FriendRequest {
	id: number;
	user: {
		id: number;
		name: string;
	};
}

export default function FriendRequests() {
	const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const fetchFriendRequests = async () => {
			try {
				const res = await fetch('/api/activity/friendrequests');
				if (!res.ok) throw new Error('Failed to load friend requests');
				const data = await res.json();
				setFriendRequests(data);
			} catch (err) {
				console.error(err);
				setError('Failed to load friend requests');
			} finally {
				setIsLoading(false);
			}
		};

		fetchFriendRequests();
	}, []);

	const handleAccept = async (requestId: number) => {
		try {
			const res = await fetch(`/api/activity/friendrequests/${requestId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ action: 'accept' }),
			});

			if (!res.ok) throw new Error('Failed to accept friend request');

			setFriendRequests(friendRequests.filter(request => request.id !== requestId));
			console.log(`Accepted friend request ID: ${requestId}`);
		} catch (err) {
			console.error(err);
			setError('Failed to accept friend request');
		}
	};
	const handleDecline = async (requestId: number) => {
		try {
			const res = await fetch(`/api/activity/friendrequests/${requestId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ action: 'decline' }),
			});

			if (!res.ok) throw new Error('Failed to decline friend request');

			setFriendRequests(friendRequests.filter(request => request.id !== requestId));
			console.log(`Declined friend request ID: ${requestId}`);
		} catch (err) {
			console.error(err);
			setError('Failed to decline friend request');
		}
	};

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p className='text-red-500'>{error}</p>;

	return (
		<div className='px-4 space-y-4'>
			{friendRequests.map(request => (
				<div
					key={request.id}
					className='flex justify-between items-center mb-4'
				>
					<div>
						<p className='text-circles-light font-semibold'>{request.user.name}</p>
						<p className='text-circles-light text-sm'>ID: {request.user.id}</p>
					</div>
					<div className='flex space-x-2'>
						<button
							onClick={() => handleAccept(request.id)}
							className='bg-circles-dark-blue text-circles-light font-semibold py-1 px-4 rounded-lg'
						>
							accept
						</button>
						<button
							onClick={() => handleDecline(request.id)}
							className='bg-gray-600 text-circles-light font-semibold py-1 px-4 rounded-lg'
						>
							decline
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
