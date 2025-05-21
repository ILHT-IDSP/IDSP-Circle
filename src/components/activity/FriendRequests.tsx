'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FriendRequest {
	id: number;
	content: string;
	createdAt: string;
	user: {
		id: number;
		name: string | null;
		username: string;
		profileImage?: string | null;
	};
	requester?: {
		id: number;
		name: string | null;
		username: string;
		profileImage?: string | null;
	};
}

export default function FriendRequests() {
	const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [processingIds, setProcessingIds] = useState<number[]>([]);

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
		setProcessingIds(prev => [...prev, requestId]);
		try {
			const res = await fetch(`/api/activity/friendrequests`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: requestId, action: 'accept' }),
			});

			if (!res.ok) throw new Error('Failed to accept friend request');

			// Add a small delay for animation
			setTimeout(() => {
				setFriendRequests(friendRequests.filter(request => request.id !== requestId));
				setProcessingIds(prev => prev.filter(id => id !== requestId));
			}, 300);

			console.log(`Accepted friend request ID: ${requestId}`);
		} catch (err) {
			console.error(err);
			setError('Failed to accept friend request');
			setProcessingIds(prev => prev.filter(id => id !== requestId));
		}
	};

	const handleDecline = async (requestId: number) => {
		setProcessingIds(prev => [...prev, requestId]);
		try {
			const res = await fetch(`/api/activity/friendrequests`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: requestId, action: 'decline' }),
			});

			if (!res.ok) throw new Error('Failed to decline friend request');

			// Add a small delay for animation
			setTimeout(() => {
				setFriendRequests(friendRequests.filter(request => request.id !== requestId));
				setProcessingIds(prev => prev.filter(id => id !== requestId));
			}, 300);

			console.log(`Declined friend request ID: ${requestId}`);
		} catch (err) {
			console.error(err);
			setError('Failed to decline friend request');
			setProcessingIds(prev => prev.filter(id => id !== requestId));
		}
	};

	if (isLoading) {
		return <div className='text-center p-4'>Loading friend requests...</div>;
	}

	if (error) {
		return <div className='text-center p-4 text-red-500'>{error}</div>;
	}

	if (friendRequests.length === 0) {
		return <div className='text-center p-4'>No friend requests at this time.</div>;
	}

	return (
		<div className='space-y-4'>
			{friendRequests.map(request => {
				// Determine which user to show (requester if available, fallback to user)
				const displayUser = request.requester || request.user;

				return (
					<div
						key={request.id}
						className={`relative p-4 border rounded-lg bg-[var(--background-secondary)] transition-opacity ${processingIds.includes(request.id) ? 'opacity-60' : 'opacity-100'}`}
					>
						<div className='flex items-center space-x-3'>
							<Link href={`/${displayUser.username}`}>
								<Image
									src={displayUser.profileImage || '/images/default-avatar.png'}
									alt={displayUser.name || displayUser.username}
									width={48}
									height={48}
									className='rounded-full object-cover w-12 h-12'
								/>
							</Link>
							<div className='flex-grow'>
								<Link
									href={`/${displayUser.username}`}
									className='font-semibold hover:underline'
								>
									{displayUser.name || displayUser.username}
								</Link>
								<p className='text-sm text-gray-500'>@{displayUser.username}</p>
								<p className='text-sm mt-1'>wants to follow you</p>
							</div>
							<div className='flex flex-col space-y-2'>
								<button
									onClick={() => handleAccept(request.id)}
									disabled={processingIds.includes(request.id)}
									className='px-4 py-1 bg-[var(--primary)] text-white rounded-md hover:opacity-90 text-sm font-medium'
								>
									Accept
								</button>
								<button
									onClick={() => handleDecline(request.id)}
									disabled={processingIds.includes(request.id)}
									className='px-4 py-1 border border-[var(--border)] rounded-md  text-sm font-medium'
								>
									Decline
								</button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
