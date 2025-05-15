/* eslint-disable @typescript-eslint/no-unused-vars */
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
	onFollowUpdate: (isFollowing: boolean) => void;}

export default function ProfileHeader({ profileData, session, onFollowUpdate }: ProfileHeaderProps) {
	const [isFollowing, setIsFollowing] = useState(profileData.isFollowing);
	const [showUnfollowConfirm, setShowUnfollowConfirm] = useState(false);
	const [followersCount, setFollowersCount] = useState(profileData.followersCount);
	const [followingCount, setFollowingCount] = useState(profileData.followingCount);

	// Update local when profileData changes
	useEffect(() => {
		setIsFollowing(profileData.isFollowing);
		setFollowersCount(profileData.followersCount);
		setFollowingCount(profileData.followingCount);
	}, [profileData]);

	const handleUploadClick = () => {
		// Only allow upload if it's user's OWN profile
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
			// Redirect to login if not authd
			window.location.href = '/auth/login';
			return;
		}

		if (showUnfollowConfirm) {
			// confirmed unfollow
			setShowUnfollowConfirm(false);
			setIsFollowing(false);
			setFollowersCount(count => Math.max(0, count - 1));
			onFollowUpdate(false);

			try {
				const response = await fetch('/api/users/follow', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ targetUserId: profileData.id, action: 'unfollow' }),
				});
				const data = await response.json();
				if (data.followerCount !== undefined) setFollowersCount(data.followerCount);
				if (data.followingCount !== undefined) setFollowingCount(data.followingCount);
			} catch (error) {
				console.error('Error unfollowing user:', error);
				setIsFollowing(true);
				setFollowersCount(count => count + 1);
				onFollowUpdate(true);
			}
			return;
		}

		if (isFollowing) {
			setShowUnfollowConfirm(true);
	} else {
			setIsFollowing(true);
			setFollowersCount(count => count + 1);
		onFollowUpdate(true);

			try {
				const response = await fetch('/api/users/follow', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ targetUserId: profileData.id, action: 'follow' }),
				});
				const data = await response.json();
				if (data.followerCount !== undefined) setFollowersCount(data.followerCount);
				if (data.followingCount !== undefined) setFollowingCount(data.followingCount);
			} catch (error) {
				console.error('Error following user:', error);
				setIsFollowing(false);
				setFollowersCount(count => Math.max(0, count - 1));
				onFollowUpdate(false);
			}
		}};

	return (
		<div className='relative flex flex-col items-center mb-6  rounded-2xl py-4 px-6 '>
			{profileData.isOwnProfile && (
				<input
					type='file'
					id='upload-profile-pic'
					className='hidden'
					accept='image/*'
					onChange={handleChange}/>)}
			
			{/* Profile pic*/}
			<Image
				src={profileData.profileImage || '/images/default-avatar.png'}
				alt='Profile'
				width={96}
				height={96}
				className={`w-24 h-24 rounded-full object-cover border-4 border-circles-dark-blue ${profileData.isOwnProfile ? 'cursor-pointer' : ''}`}
				onClick={handleUploadClick}
			/>
			{/* Name*/}
			{profileData.name && <p className='text-lg font-semibold text-circles-dark mt-2'>{profileData.name}</p>}
			{/* Username */}
			<p className='text-xl font-bold text-circles-dark mt-1'>@{profileData.username}</p>
			{/* Bio */}
			{profileData.bio && <p className='text-circles-dark mt-2 text-center'>{profileData.bio}</p>}
			
			{/* circles / albums / followers / following */}
			<div className='flex space-x-6 mt-3'>
				<div className='text-center'>
					<p className='text-circles-dark-blue font-semibold'>{profileData.circlesCount}</p>
					<p className='text-circles-dark text-sm'>circles</p>
				</div>
				<div className='text-center'>
					<p className='text-circles-dark-blue font-semibold'>{profileData.albumsCount}</p>
					<p className='text-circles-dark text-sm'>albums</p>
				</div>
				<Link href={`/${profileData.username}/followers`} className='text-center'>
					<p className='text-circles-dark-blue font-semibold'>{followersCount}</p>
					<p className='text-circles-dark text-sm'>followers</p>
				</Link>
				<Link href={`/${profileData.username}/following`} className='text-center'>
					<p className='text-circles-dark-blue font-semibold'>{followingCount}</p>
					<p className='text-circles-dark text-sm'>following</p>
				</Link>
			</div>

			{/* Settings button */}
			{profileData.isOwnProfile && (
				<Link href='/settings' className='absolute right-4 top-4'>
					<Settings className='w-6 h-6 text-circles-dark-blue' />
				</Link>
			)}
			
			<div className='mt-4'>
				{profileData.isOwnProfile ? (
					<Link href='/profile/edit-profile'>
						<button className='px-6 py-2 bg-[#689bff] text-white hover:bg-[#0044CC] hover:cursor-pointer font-medium rounded-md hover:bg-opacity-90 transition'>
							Edit Profile
						</button>
					</Link>
				) : (
					<button 
						className={`px-6 py-2 rounded-full transition ${
							showUnfollowConfirm 
								? 'bg-red-500 text-white' 
								: isFollowing 
									? 'bg-circles-light text-circles-dark border border-circles-dark' 
									: 'bg-[#689bff] text-circles-light'
						}`}
						onClick={handleFollowAction}
					>
						{showUnfollowConfirm ? (
							<div className='flex items-center gap-2'>
								<span>Unfollow?</span>
								<Check className='w-4 h-4' />
							</div>
						) : isFollowing ? (
							'Following'
						) : (
							'Follow'
						)}
					</button>
				)}
			</div>
		</div>
	);
}
