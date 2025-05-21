'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CircleInvite {
	id: number;
	content: string;
	formattedContent?: string;
	createdAt: string;
	user: {
		id: number;
		name: string;
		username: string;
		profileImage?: string | null;
	};
	circle: {
		id: number;
		name: string;
		avatar?: string | null;
		description?: string | null;
	};
	inviter?: {
		id: number;
		name: string | null;
		username: string;
		profileImage?: string | null;
	} | null;
}

export default function CircleInvites() {
	const [circleInvites, setCircleInvites] = useState<CircleInvite[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [processingIds, setProcessingIds] = useState<number[]>([]);

	useEffect(() => {
		const fetchCircleInvites = async () => {
			try {
				const res = await fetch('/api/activity/circleinvites');
				if (!res.ok) throw new Error('Failed to load circle invites');
				const data = await res.json();
				setCircleInvites(data);
			} catch (err) {
				console.error(err);
				setError('Failed to load circle invites');
			} finally {
				setIsLoading(false);
			}
		};

		fetchCircleInvites();
	}, []);

	const handleAccept = async (inviteId: number) => {
		setProcessingIds(prev => [...prev, inviteId]);
		try {
			const res = await fetch(`/api/activity/circleinvites`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: inviteId, action: 'accept' }),
			});

			if (!res.ok) throw new Error('Failed to accept invite');

			// Add a small delay for animation
			setTimeout(() => {
				setCircleInvites(circleInvites.filter(invite => invite.id !== inviteId));
				setProcessingIds(prev => prev.filter(id => id !== inviteId));
			}, 300);

			console.log(`Accepted invite ID: ${inviteId}`);
		} catch (err) {
			console.error(err);
			setError('Failed to accept invite');
			setProcessingIds(prev => prev.filter(id => id !== inviteId));
		}
	};

	const handleDecline = async (inviteId: number) => {
		setProcessingIds(prev => [...prev, inviteId]);
		try {
			const res = await fetch(`/api/activity/circleinvites`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: inviteId, action: 'decline' }),
			});

			if (!res.ok) throw new Error('Failed to decline invite');

			// Add a small delay for animation
			setTimeout(() => {
				setCircleInvites(circleInvites.filter(invite => invite.id !== inviteId));
				setProcessingIds(prev => prev.filter(id => id !== inviteId));
			}, 300);

			console.log(`Declined invite ID: ${inviteId}`);
		} catch (err) {
			console.error(err);
			setError('Failed to decline invite');
			setProcessingIds(prev => prev.filter(id => id !== inviteId));
		}
	};

	if (isLoading)
		return (
			<div className='flex justify-center items-center py-12'>
				<div className='animate-pulse flex flex-col space-y-4 w-full max-w-md'>
					<div className='h-24 bg-[var(--background-secondary)] rounded-lg opacity-60'></div>
					<div className='h-24 bg-[var(--background-secondary)] rounded-lg opacity-60'></div>
					<div className='h-24 bg-[var(--background-secondary)] rounded-lg opacity-60'></div>
				</div>
			</div>
		);

	if (error)
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

	return (
		<div className='px-4 space-y-4'>
			{circleInvites.length === 0 ? (
				<div className='text-center py-8'>
					<p className='text-[var(--foreground)] opacity-60'>You have no circle invitations</p>
				</div>
			) : (
				circleInvites.map(invite => (
					<div
						key={invite.id}
						className={`bg-[var(--background-secondary)] rounded-lg p-4 shadow-sm border border-[var(--border)] transition-all duration-300 ${processingIds.includes(invite.id) ? 'opacity-50 scale-95' : 'opacity-100'}`}
					>
						<div className='flex justify-between items-start mb-4'>
							<div className='flex items-center'>
								{invite.inviter && (
									<Link
										href={`/${invite.inviter.username}`}
										className='flex items-center group'
									>
										<div className='relative'>
											<Image
												src={invite.inviter.profileImage || '/images/default-avatar.png'}
												alt={invite.inviter.username}
												width={40}
												height={40}
												className='rounded-full mr-3 object-cover border border-transparent group-hover:border-[var(--primary)] transition-all'
											/>
										</div>
										<div className='gap-1'>
											<p className='  font-semibold group-hover:text-[var(--primary)] transition-colors'>{invite.inviter.name || invite.inviter.username}</p>
											<p className=' text-sm text-[var(--foreground-secondary)]'>@{invite.inviter.username}</p>
											<p className='text-xs mt-1 opacity-70'>{invite.formattedContent || invite.content}</p>
										</div>
									</Link>
								)}
								{!invite.inviter && (
									<div className='flex items-center'>
										<div className='w-10 h-10 rounded-full bg-[var(--background-secondary)] border border-[var(--border)] mr-3'></div>
										<div>
											<p className='font-semibold'>Someone</p>
											<p className='text-xs mt-1 opacity-70'>{invite.formattedContent || invite.content}</p>
										</div>
									</div>
								)}
							</div>
							<p className='text-xs opacity-50'>{new Date(invite.createdAt).toLocaleDateString()}</p>
						</div>

						<div className='flex justify-between items-center mt-3 pt-3 border-t border-[var(--border)]'>
							<Link
								href={`/circle/${invite.circle.id}`}
								className='flex items-center group'
							>
								<div className='relative'>
									<Image
										src={invite.circle.avatar || '/images/circles/default.svg'}
										alt={invite.circle.name}
										width={36}
										height={36}
										className='rounded-full mr-3 object-cover aspect-square border border-[var(--border)] group-hover:border-[var(--primary)] transition-all'
									/>
								</div>
								<div>
									<p className='text-sm font-medium group-hover:text-[var(--primary)] transition-colors'>{invite.circle.name}</p>
									{invite.circle.description && <p className='text-xs opacity-80 mt-0.5 line-clamp-1'>{invite.circle.description}</p>}
								</div>
							</Link>

							<div className='flex space-x-2'>
								<button
									disabled={processingIds.includes(invite.id)}
									onClick={() => handleAccept(invite.id)}
									className='bg-[var(--primary)] text-white font-medium py-1.5 px-4 rounded-lg text-sm hover:opacity-80 transition disabled:opacity-50'
								>
									{processingIds.includes(invite.id) ? 'Processing...' : 'Accept'}
								</button>
								<button
									disabled={processingIds.includes(invite.id)}
									onClick={() => handleDecline(invite.id)}
									className='bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] font-medium py-1.5 px-4 rounded-lg text-sm hover:opacity-80 transition disabled:opacity-50'
								>
									{processingIds.includes(invite.id) ? 'Processing...' : 'Decline'}
								</button>
							</div>
						</div>
					</div>
				))
			)}
		</div>
	);
}
