'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import OptimizedImage from '@/components/common/OptimizedImage';

interface User {
	id: number;
	name: string;
	username: string;
	profileImage?: string;
	isFollowing?: boolean;
}

const UserCard = memo(function UserCard({ user }: { user: User }) {
	const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
	const [isProcessing, setIsProcessing] = useState(false);

	// Update local state if prop changes
	useEffect(() => {
		setIsFollowing(user.isFollowing || false);
	}, [user.isFollowing]);

	const handleFollowToggle = useCallback(async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (isProcessing) return;

		setIsProcessing(true);
		const action = isFollowing ? 'unfollow' : 'follow';

		// Optimistically update UI
		setIsFollowing(!isFollowing);

		// Show toast
		const toastId = toast.loading(isFollowing ? 'Unfollowing...' : 'Following...');

		try {
			const response = await fetch('/api/users/follow', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ targetUserId: user.id, action }),
			});

			if (!response.ok) {
				throw new Error(`Failed to ${action} user`);
			}

			const data = await response.json();

			if (data.action === 'request_sent') {
				toast.success('Follow request sent', { id: toastId });
			} else if (action === 'follow') {
				toast.success(`Following @${user.username}`, { id: toastId });
			} else {
				toast.success(`Unfollowed @${user.username}`, { id: toastId });
			}
			
			// Try to refresh global user state after successful follow/unfollow
			try {
				// Find if we have a global context for refreshing
				const refreshEvent = new CustomEvent('refreshUsers');
				window.dispatchEvent(refreshEvent);
			} catch (refreshError) {
				// Silently fail if there's no global context
				console.debug('Could not refresh global user state', refreshError);
			}
		} catch (error) {
			console.error(`Error ${action}ing user:`, error);

			// Revert optimistic update
			setIsFollowing(isFollowing);			toast.error(`Failed to ${action} user`, { id: toastId });		} finally {
			setIsProcessing(false);
		}
	}, [isFollowing, isProcessing, user.id, user.username]);

	return (
		<div className='flex items-center justify-between bg-[var(--background-secondary)] px-4 py-3 rounded-lg hover:bg-[var(--background-secondary)]/80 transition-colors'>
			<Link
				href={`/${user.username}`}
				className='flex items-center flex-grow'
			>
				<div className='flex-shrink-0 w-12 h-12 rounded-full overflow-hidden mr-4'>
					<OptimizedImage
						src={user.profileImage || '/images/default-avatar.png'}
						alt={user.username}
						width={48}
						height={48}
						className='w-full h-full'
						objectFit='cover'
					/>
				</div>
				<div>
					<p className='text-[var(--foreground)] font-semibold'>{user.name || user.username}</p>
					<p className='text-[var(--foreground-secondary)] text-sm'>@{user.username}</p>
				</div>
			</Link>
			<button
				onClick={handleFollowToggle}
				disabled={isProcessing}
				className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
					isFollowing 
						? 'bg-[var(--background)] border border-[var(--primary)] text-[var(--primary)]' 
						: 'bg-[var(--primary)] text-[var(--background)]'
				} ${isProcessing ? 'opacity-70' : 'hover:opacity-80'}`}
			>
				{isProcessing ? (
					<span className='flex items-center'>
						<span className='h-3 w-3 rounded-full border-2 border-t-transparent border-[var(--primary)] animate-spin mr-1'></span>
						<span>{isFollowing ? 'Unfollowing...' : 'Following...'}</span>
					</span>
				) : isFollowing ? (
					'Following'
				) : (
					'Follow'
				)}
			</button>
		</div>
	);
});

export default UserCard;
