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
	profileData?: ProfileUser;
	session: Session | null;
	onFollowUpdate?: (isFollowing: boolean) => void;
}

export default function ProfileHeader({ profileData, session, onFollowUpdate }: ProfileHeaderProps) {
	const defaultProfileData = {
		id: -1,
		username: 'user',
		name: '',
		bio: '',
		profileImage: '',
		coverImage: '',
		isProfilePrivate: false,
		circlesCount: 0,
		albumsCount: 0,
		followersCount: 0,
		followingCount: 0,
		isFollowing: false,
		isOwnProfile: true,
	};

	const profile = profileData || defaultProfileData;

	const [isFollowing, setIsFollowing] = useState(profile.isFollowing);
	const [showUnfollowConfirm, setShowUnfollowConfirm] = useState(false);
	const [followersCount, setFollowersCount] = useState(profile.followersCount);
	const [followingCount, setFollowingCount] = useState(profile.followingCount);

	useEffect(() => {
		if (profileData) {
			setIsFollowing(profileData.isFollowing || false);
			setFollowersCount(profileData.followersCount || 0);
			setFollowingCount(profileData.followingCount || 0);
		}
	}, [profileData]);

	const handleUploadClick = () => {
		// Only allow upload if it's user's OWN profile
		if (profile.isOwnProfile) {
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

		// Make sure onFollowUpdate is defined
		const updateFollowState = onFollowUpdate || (() => {});

		if (showUnfollowConfirm) {
			// confirmed unfollow
			setShowUnfollowConfirm(false);
			setIsFollowing(false);
			setFollowersCount(count => Math.max(0, count - 1));
			updateFollowState(false);

			try {
				const response = await fetch('/api/users/follow', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ targetUserId: profile.id, action: 'unfollow' }),
				});
				const data = await response.json();
				if (data.followerCount !== undefined) setFollowersCount(data.followerCount);
				if (data.followingCount !== undefined) setFollowingCount(data.followingCount);
			} catch (error) {
				console.error('Error unfollowing user:', error);
				setIsFollowing(true);
				setFollowersCount(count => count + 1);
				updateFollowState(true);
			}
			return;
		}

		if (isFollowing) {
			setShowUnfollowConfirm(true);
		} else {
			setIsFollowing(true);
			setFollowersCount(count => count + 1);
			updateFollowState(true);

			try {
				const response = await fetch('/api/users/follow', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ targetUserId: profile.id, action: 'follow' }),
				});
				const data = await response.json();
				if (data.followerCount !== undefined) setFollowersCount(data.followerCount);
				if (data.followingCount !== undefined) setFollowingCount(data.followingCount);
			} catch (error) {
				console.error('Error following user:', error);
				setIsFollowing(false);
				setFollowersCount(count => Math.max(0, count - 1));
				updateFollowState(false);
			}
		}
	};

	return (
		<div className='relative flex flex-col items-center mb-6 rounded-2xl py-4 px-6'>
			{profile.isOwnProfile && (
				<input
					type='file'
					id='upload-profile-pic'
					className='hidden'
					accept='image/*'
					onChange={handleChange}
				/>
			)}

			<Image
				src={profile.profileImage || '/images/default-avatar.png'}
				alt='Profile'
				width={96}
				height={96}
				className={`w-24 h-24 rounded-full object-cover `}
				onClick={handleUploadClick}
			/>

			{profile.name && <p className='text-lg font-semibold mt-2'>{profile.name}</p>}

			<p className='text-xl font-bold mt-1'>@{profile.username}</p>

			{profile.bio && <p className='mt-2 text-center'>{profile.bio}</p>}

			<div className='flex space-x-6 mt-3'>
				<div className='text-center'>
					<p className=' font-semibold'>{profile.circlesCount}</p>
					<p className='text-sm'>circles</p>
				</div>
				<div className='text-center'>
					<p className=' font-semibold'>{profile.albumsCount}</p>
					<p className='text-sm'>albums</p>
				</div>
				<Link
					href={`/${profile.username}/followers`}
					className='text-center'
				>
					<p className=' font-semibold'>{followersCount}</p>
					<p className='text-sm'>followers</p>
				</Link>
				<Link
					href={`/${profile.username}/following`}
					className='text-center'
				>
					<p className=' font-semibold'>{followingCount}</p>
					<p className='text-sm'>following</p>
				</Link>
			</div>

			{profile.isOwnProfile && (
				<Link
					href='/settings'
					className='absolute right-4 top-4'
				>
					<Settings className='w-6 h-6 ' />
				</Link>
			)}

			<div className='mt-4'>
				{profile.isOwnProfile ? (
					<Link href='/profile/edit-profile'>
						<button className='px-6 py-2 bg-[var(--primary)] text-white hover:opacity-90 font-medium rounded-md transition'>Edit Profile</button>
					</Link>
				) : (
					<button
						className={`px-6 py-2 rounded-lg hover:opacity-70 hover:cursor-pointer transition ${showUnfollowConfirm ? 'bg-red-500 text-white' : isFollowing ? 'bg-[var(--background-secondary)] border border-[var(--border)]' : 'bg-[var(--primary)] text-white'}`}
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
