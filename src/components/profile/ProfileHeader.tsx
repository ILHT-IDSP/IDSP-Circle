'use client';

import { Settings, Check, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Session } from 'next-auth';
import { useState, useEffect } from 'react';

interface ProfileUser {
	id: number;
	username: string;
	name?: string | null;
	bio?: string | null;
	profileImage?: string | null;
	coverImage?: string | null;
	isProfilePrivate?: boolean;
	circlesCount: number;
	albumsCount: number;
	followersCount: number;
	followingCount: number;
	isFollowing: boolean;
	isOwnProfile: boolean;
}

interface ProfileHeaderProps {
	profileData: ProfileUser;
	session: Session | null;
	onFollowUpdate: (isFollowing: boolean) => void;
}

export default function ProfileHeader({ profileData, session, onFollowUpdate }: ProfileHeaderProps) {
	const [isFollowing, setIsFollowing] = useState(profileData.isFollowing);
	const [showUnfollowConfirm, setShowUnfollowConfirm] = useState(false);
	const [followersCount, setFollowersCount] = useState(profileData.followersCount);
	const [followingCount, setFollowingCount] = useState(profileData.followingCount);

	// Update local state when profileData changes
	useEffect(() => {
		setIsFollowing(profileData.isFollowing);
		setFollowersCount(profileData.followersCount);
		setFollowingCount(profileData.followingCount);
	}, [profileData]);

	const handleUploadClick = () => {
		// Only allow upload if it's the user's own profile
		if (profileData.isOwnProfile) {
			document.getElementById('upload-profile-pic')?.click();
		}
	};

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const formData = new FormData();
		formData.append('avatar', file);
		await fetch('/api/user/avatar', { method: 'POST', body: formData });
		window.location.reload();
	};
	const handleFollowAction = async () => {
		if (!session) {
			// Redirect to login if not authenticated
			window.location.href = '/auth/login';
			return;
		}

		if (showUnfollowConfirm) {
			// User confirmed unfollow
			setShowUnfollowConfirm(false);
			setIsFollowing(false);

			// Update follower count immediately for better UX
			setFollowersCount(count => Math.max(0, count - 1));

			// Notify parent component
			onFollowUpdate(false);

			// Call API to unfollow
			try {
				const response = await fetch('/api/users/follow', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						targetUserId: profileData.id,
						action: 'unfollow',
					}),
				});

				if (response.ok) {
					const data = await response.json();
					// Update with the accurate count from the server
					if (data.followerCount !== undefined) {
						setFollowersCount(data.followerCount);
					}
					if (data.followingCount !== undefined) {
						setFollowingCount(data.followingCount);
					}
				}
			} catch (error) {
				console.error('Error unfollowing user:', error);
				// Revert UI state on error
				setIsFollowing(true);
				setFollowersCount(count => count + 1);
				onFollowUpdate(true);
			}
			return;
		}

		if (isFollowing) {
			// Show confirmation before unfollowing
			setShowUnfollowConfirm(true);
		} else {
			// Follow user
			setIsFollowing(true);

			// Update follower count immediately for better UX
			setFollowersCount(count => count + 1);

			// Notify parent component
			onFollowUpdate(true);

			try {
				const response = await fetch('/api/users/follow', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						targetUserId: profileData.id,
						action: 'follow',
					}),
				});

				if (response.ok) {
					const data = await response.json();
					// Update with the accurate count from the server
					if (data.followerCount !== undefined) {
						setFollowersCount(data.followerCount);
					}
					if (data.followingCount !== undefined) {
						setFollowingCount(data.followingCount);
					}
				}
			} catch (error) {
				console.error('Error following user:', error);
				// Revert UI state on error
				setIsFollowing(false);
				setFollowersCount(count => Math.max(0, count - 1));
				onFollowUpdate(false);
			}
		}
	};

	return (
		<div className='relative flex flex-col items-center mb-6 bg-circles-light rounded-2xl py-4 px-6 shadow-lg'>
			{profileData.isOwnProfile && (
				<input
					type='file'
					id='upload-profile-pic'
					className='hidden'
					accept='image/*'
					onChange={handleChange}
				/>
			)}
			{/* Profile picture */}
			<Image
				src={profileData.profileImage || '/images/default-avatar.png'}
				alt='Profile'
				width={96}
				height={96}
				className={`w-24 h-24 rounded-full object-cover border-4 border-circles-dark-blue ${profileData.isOwnProfile ? 'cursor-pointer' : ''}`}
				onClick={handleUploadClick}
			/>
			{/* Name (if available) */}
			{profileData.name && <p className='text-lg font-semibold text-circles-dark mt-2'>{profileData.name}</p>}
			{/* Username */}
			<p className='text-xl font-bold text-circles-dark mt-1'>@{profileData.username}</p>
			{/* Bio (if available) */}
			{profileData.bio && <p className='text-circles-dark mt-2 text-center'>{profileData.bio}</p>} {/* circles / albums / followers / following */}
			<div className='flex space-x-6 mt-3'>
				<div className='text-center'>
					<p className='text-circles-dark-blue font-semibold'>{profileData.circlesCount}</p>
					<p className='text-circles-dark text-sm'>circles</p>
				</div>
				<div className='text-center'>
					<p className='text-circles-dark-blue font-semibold'>{profileData.albumsCount}</p>
					<p className='text-circles-dark text-sm'>albums</p>{' '}
				</div>{' '}
				<div className='text-center'>
					<p className='text-circles-dark-blue font-semibold'>{followersCount}</p>
					<p className='text-circles-dark text-sm'>followers</p>
				</div>
				<div className='text-center'>
					<p className='text-circles-dark-blue font-semibold'>{followingCount}</p>
					<p className='text-circles-dark text-sm'>following</p>
				</div>
			</div>
			{/* Display Settings button only if it's the user's own profile */}
			{profileData.isOwnProfile && (
				<Link
					href='/settings'
					className='absolute right-4 top-4'
				>
					<Settings className='w-6 h-6 text-circles-dark-blue' />
				</Link>
			)}
			{/* Action button based on whether it's the user's own profile or not */}
			{profileData.isOwnProfile ? (
				<Link
					href='/profile/edit-profile'
					className='mt-4 bg-circles-dark-blue text-circles-light text-sm font-semibold py-2 px-4 rounded-lg'
				>
					Edit Profile
				</Link>
			) : (
				<>
					{showUnfollowConfirm ? (
						<div className='mt-4 flex items-center space-x-2'>
							<button
								onClick={() => setShowUnfollowConfirm(false)}
								className='bg-circles-dark-blue text-circles-light text-sm font-semibold py-2 px-4 rounded-l-lg flex items-center'
							>
								<X
									size={16}
									className='mr-1'
								/>{' '}
								Cancel
							</button>
							<button
								onClick={handleFollowAction}
								className='bg-red-500 text-white text-sm font-semibold py-2 px-4 rounded-r-lg flex items-center'
							>
								<Check
									size={16}
									className='mr-1'
								/>{' '}
								Unfollow
							</button>
						</div>
					) : (
						<button
							onClick={handleFollowAction}
							className={`mt-4 text-sm font-semibold py-2 px-4 rounded-lg ${isFollowing ? 'bg-circles-light border border-circles-dark-blue text-circles-dark-blue' : 'bg-circles-dark-blue text-circles-light'}`}
						>
							{isFollowing ? 'Following' : 'Follow'}
						</button>
					)}
				</>
			)}
		</div>
	);
}
