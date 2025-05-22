'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';

interface JoinRequest {
	id: number;
	content: string;
	createdAt: string;
	requesterId: number;
	requester: {
		id: number;
		username: string;
		name: string | null;
		profileImage: string | null;
	} | null;
}

export default function CircleJoinRequests({ circleId }: { circleId: number }) {
	const router = useRouter();
	const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [processingIds, setProcessingIds] = useState<number[]>([]);
	const [optimisticActions, setOptimisticActions] = useState<Map<number, 'accept' | 'decline'>>(new Map());

	useEffect(() => {
		const fetchJoinRequests = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/circles/${circleId}/joinrequests`);

				if (!response.ok) {
					if (response.status === 403) {
						router.push(`/circle/${circleId}`);
						return;
					}
					throw new Error('Failed to fetch join requests');
				}

				const data = await response.json();
				setJoinRequests(data.joinRequests || []);
			} catch (err) {
				console.error('Error fetching join requests:', err);
				setError('Could not load join requests. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchJoinRequests();
	}, [circleId, router]);

	const handleAccept = async (requestId: number) => {
		// Prevent multiple actions on the same request
		if (processingIds.includes(requestId)) return;

		// Find the request for the toast message
		const request = joinRequests.find(req => req.id === requestId);
		if (!request || !request.requester) return;

		// Optimistic UI update
		setProcessingIds(prev => [...prev, requestId]);
		setOptimisticActions(prev => new Map(prev).set(requestId, 'accept'));

		// Show toast
		const toastId = toast.loading(`Accepting ${request.requester.name || request.requester.username}'s request...`);

		try {
			const response = await fetch(`/api/circles/${circleId}/joinrequests`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					requestId,
					action: 'accept',
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to accept join request');
			}

			// Success toast
			toast.success(`Added ${request.requester.name || request.requester.username} to the circle!`, { id: toastId });

			// Remove with animation
			setTimeout(() => {
				setJoinRequests(prev => prev.filter(req => req.id !== requestId));
				setProcessingIds(prev => prev.filter(id => id !== requestId));
				setOptimisticActions(prev => {
					const updated = new Map(prev);
					updated.delete(requestId);
					return updated;
				});
				router.refresh();
			}, 300);
		} catch (err) {
			console.error('Error accepting join request:', err);
			toast.error('Failed to accept request. Please try again.', { id: toastId });

			// Revert optimistic update
			setProcessingIds(prev => prev.filter(id => id !== requestId));
			setOptimisticActions(prev => {
				const updated = new Map(prev);
				updated.delete(requestId);
				return updated;
			});
		}
	};

	const handleDecline = async (requestId: number) => {
		// Prevent multiple actions on the same request
		if (processingIds.includes(requestId)) return;

		// Find the request for the toast message
		const request = joinRequests.find(req => req.id === requestId);
		if (!request || !request.requester) return;

		// Optimistic UI update
		setProcessingIds(prev => [...prev, requestId]);
		setOptimisticActions(prev => new Map(prev).set(requestId, 'decline'));

		// Show toast
		const toastId = toast.loading(`Declining ${request.requester.name || request.requester.username}'s request...`);

		try {
			const response = await fetch(`/api/circles/${circleId}/joinrequests`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					requestId,
					action: 'decline',
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to decline join request');
			}

			// Success toast
			toast.success(`Declined join request from ${request.requester.name || request.requester.username}`, { id: toastId });

			// Remove with animation
			setTimeout(() => {
				setJoinRequests(prev => prev.filter(req => req.id !== requestId));
				setProcessingIds(prev => prev.filter(id => id !== requestId));
				setOptimisticActions(prev => {
					const updated = new Map(prev);
					updated.delete(requestId);
					return updated;
				});
				router.refresh();
			}, 300);
		} catch (err) {
			console.error('Error declining join request:', err);
			toast.error('Failed to decline request. Please try again.', { id: toastId });

			// Revert optimistic update
			setProcessingIds(prev => prev.filter(id => id !== requestId));
			setOptimisticActions(prev => {
				const updated = new Map(prev);
				updated.delete(requestId);
				return updated;
			});
		}
	};

	if (loading) {
		return (
			<div className='p-4 space-y-4'>
				<div className='animate-pulse'>
					<div className='h-24 bg-[var(--background-secondary)] rounded-lg opacity-60'></div>
					<div className='h-24 bg-[var(--background-secondary)] rounded-lg opacity-60 mt-4'></div>
					<div className='h-24 bg-[var(--background-secondary)] rounded-lg opacity-60 mt-4'></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='text-center py-8'>
				<p className='text-[var(--groovy-red)] mb-2'>{error}</p>
				<button
					onClick={() => window.location.reload()}
					className='text-sm bg-[var(--background-secondary)] px-4 py-2 rounded-full hover:opacity-80 transition'
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className='px-4 space-y-4'>
			{joinRequests.length === 0 ? (
				<div className='text-center py-8'>
					<p className='text-[var(--foreground)] opacity-60'>There are no pending join requests</p>
				</div>
			) : (
				joinRequests.map(request => (
					<div
						key={request.id}
						className={`p-4 rounded-lg border transition-all duration-300 ${processingIds.includes(request.id) ? 'opacity-70 scale-98' : 'opacity-100'} ${optimisticActions.get(request.id) === 'accept' ? 'bg-[var(--background-secondary)] border-green-500 border-opacity-50' : optimisticActions.get(request.id) === 'decline' ? 'bg-[var(--background-secondary)] border-red-500 border-opacity-50' : 'bg-[var(--background-secondary)] border-[var(--border)] hover:shadow-sm'}`}
					>
						<div className='flex items-start mb-3'>
							{request.requester && (
								<Link href={`/${request.requester.username}`}>
									<div className='relative mr-3 flex-shrink-0'>
										<Image
											src={request.requester.profileImage || '/images/default-avatar.png'}
											alt={request.requester.name || request.requester.username}
											width={48}
											height={48}
											className='rounded-full object-cover border border-[var(--border)]'
										/>
									</div>
								</Link>
							)}
							<div className='flex-1'>
								{request.requester && (
									<Link
										href={`/${request.requester.username}`}
										className='hover:underline'
									>
										<p className='font-semibold'>
											{request.requester.name || request.requester.username}
											<span className='font-normal text-[var(--foreground-secondary)] ml-1'>@{request.requester.username}</span>
										</p>
									</Link>
								)}
								<p className='text-sm text-[var(--foreground-secondary)] mt-1'>{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</p>
								<p className='mt-2'>wants to join your circle</p>
							</div>
						</div>

						<div className='flex space-x-2 justify-end'>
							{' '}
							<button
								disabled={processingIds.includes(request.id)}
								onClick={() => handleDecline(request.id)}
								className={`font-medium py-1.5 px-4 rounded-lg text-sm transition-all ${optimisticActions.get(request.id) === 'decline' ? 'bg-red-500 text-white' : 'bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]'} hover:opacity-80 disabled:opacity-50 ${processingIds.includes(request.id) && optimisticActions.get(request.id) === 'decline' ? 'animate-pulse' : ''}`}
							>
								{processingIds.includes(request.id) && optimisticActions.get(request.id) === 'decline' ? 'Declining...' : 'Decline'}
							</button>
							<button
								disabled={processingIds.includes(request.id)}
								onClick={() => handleAccept(request.id)}
								className={`font-medium py-1.5 px-4 rounded-lg text-sm transition-all ${optimisticActions.get(request.id) === 'accept' ? 'bg-green-500 text-white' : 'bg-[var(--primary)] text-white'} hover:opacity-80 disabled:opacity-50 ${processingIds.includes(request.id) && optimisticActions.get(request.id) === 'accept' ? 'animate-pulse' : ''}`}
							>
								{processingIds.includes(request.id) && optimisticActions.get(request.id) === 'accept' ? 'Accepting...' : 'Accept'}
							</button>
						</div>
					</div>
				))
			)}
		</div>
	);
}
