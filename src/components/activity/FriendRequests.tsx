'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

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
	// Map to track optimistic actions and their status
	const [optimisticActions, setOptimisticActions] = useState<Map<number, string>>(new Map());

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
				toast.error('Failed to load friend requests');
			} finally {
				setIsLoading(false);
			}
		};

		fetchFriendRequests();
	}, []);

	const handleAccept = async (request: FriendRequest) => {
		const requestId = request.id;
		const displayName = request.requester?.name || request.requester?.username || request.user?.name || request.user?.username || 'user';

		// Mark as processing
		setProcessingIds(prev => [...prev, requestId]);

		// Add to optimistic actions map
		setOptimisticActions(prev => {
			const updated = new Map(prev);
			updated.set(requestId, 'accepting');
			return updated;
		});

		// Create toast
		const toastId = toast.loading(`Accepting ${displayName}'s request...`);

		try {
			const res = await fetch(`/api/activity/friendrequests`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: requestId, action: 'accept' }),
			});

			if (!res.ok) throw new Error('Failed to accept friend request');

			// Update optimistic action status
			setOptimisticActions(prev => {
				const updated = new Map(prev);
				updated.set(requestId, 'accepted');
				return updated;
			});

			toast.success(`You're now following ${displayName}`, { id: toastId });

			// Add a small delay for animation
			setTimeout(() => {
				setFriendRequests(friendRequests.filter(req => req.id !== requestId));
				setProcessingIds(prev => prev.filter(id => id !== requestId));

				// Remove from optimistic actions after animation
				setOptimisticActions(prev => {
					const updated = new Map(prev);
					updated.delete(requestId);
					return updated;
				});
			}, 800);
		} catch (err) {
			console.error(err);
			setError('Failed to accept friend request');

			// Update optimistic action status
			setOptimisticActions(prev => {
				const updated = new Map(prev);
				updated.delete(requestId);
				return updated;
			});

			setProcessingIds(prev => prev.filter(id => id !== requestId));
			toast.error(`Failed to accept ${displayName}'s request`, { id: toastId });
		}
	};

	const handleDecline = async (request: FriendRequest) => {
		const requestId = request.id;
		const displayName = request.requester?.name || request.requester?.username || request.user?.name || request.user?.username || 'user';

		// Mark as processing
		setProcessingIds(prev => [...prev, requestId]);

		// Add to optimistic actions map
		setOptimisticActions(prev => {
			const updated = new Map(prev);
			updated.set(requestId, 'declining');
			return updated;
		});

		// Create toast
		const toastId = toast.loading(`Declining ${displayName}'s request...`);

		try {
			const res = await fetch(`/api/activity/friendrequests`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: requestId, action: 'decline' }),
			});

			if (!res.ok) throw new Error('Failed to decline friend request');

			// Update optimistic action status
			setOptimisticActions(prev => {
				const updated = new Map(prev);
				updated.set(requestId, 'declined');
				return updated;
			});

			toast.success(`Declined ${displayName}'s request`, { id: toastId });

			// Add a small delay for animation
			setTimeout(() => {
				setFriendRequests(friendRequests.filter(req => req.id !== requestId));
				setProcessingIds(prev => prev.filter(id => id !== requestId));

				// Remove from optimistic actions after animation
				setOptimisticActions(prev => {
					const updated = new Map(prev);
					updated.delete(requestId);
					return updated;
				});
			}, 800);
		} catch (err) {
			console.error(err);
			setError('Failed to decline friend request');

			// Update optimistic action status
			setOptimisticActions(prev => {
				const updated = new Map(prev);
				updated.delete(requestId);
				return updated;
			});

			setProcessingIds(prev => prev.filter(id => id !== requestId));
			toast.error(`Failed to decline ${displayName}'s request`, { id: toastId });
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
				const isProcessing = processingIds.includes(request.id);
				const actionStatus = optimisticActions.get(request.id);

				// Determine opacity and animation based on status
				let cardClasses = 'relative p-4 border rounded-lg bg-[var(--background-secondary)] transition-all duration-300';
				if (isProcessing) {
					cardClasses += ' opacity-80';
				}
				if (actionStatus === 'accepted') {
					cardClasses += ' scale-95 opacity-60 border-green-500';
				}
				if (actionStatus === 'declined') {
					cardClasses += ' scale-95 opacity-60 border-red-300';
				}

				return (
					<div
						key={request.id}
						className={cardClasses}
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
									onClick={() => handleAccept(request)}
									disabled={isProcessing}
									className={`px-4 py-1 rounded-md hover:opacity-90 text-sm font-medium transition-all ${actionStatus === 'accepting' ? 'bg-[var(--primary)] text-white opacity-70' : actionStatus === 'accepted' ? 'bg-green-500 text-white' : 'bg-[var(--primary)] text-white'}`}
								>
									{actionStatus === 'accepting' ? 'Accepting...' : actionStatus === 'accepted' ? 'Accepted' : 'Accept'}
								</button>
								<button
									onClick={() => handleDecline(request)}
									disabled={isProcessing}
									className={`px-4 py-1 rounded-md text-sm font-medium transition-all ${actionStatus === 'declining' ? 'border border-[var(--border)] opacity-70' : actionStatus === 'declined' ? 'bg-red-100 text-red-500 border border-red-200' : 'border border-[var(--border)]'}`}
								>
									{actionStatus === 'declining' ? 'Declining...' : actionStatus === 'declined' ? 'Declined' : 'Decline'}
								</button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
