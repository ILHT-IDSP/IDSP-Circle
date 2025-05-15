'use client';

import { Session } from 'next-auth';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

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

export default function ProfileScreen({ session }: { session: Session | null }) {
	const params = useParams();
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [profileData, setProfileData] = useState<ProfileUser | null>(null);
	// Get username from URL params
	const username = typeof params?.username === 'string' ? params.username : Array.isArray(params?.username) ? params.username[0] : null;

	// Add function to handle follower count updates
	const handleFollowUpdate = (isFollowing: boolean) => {
		if (profileData) {
			setProfileData({
				...profileData,
				followersCount: isFollowing ? profileData.followersCount + 1 : Math.max(0, profileData.followersCount - 1),
				isFollowing: isFollowing,
			});
		}
	};

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				if (!username) {
					throw new Error('Username not provided');
				}

				const response = await fetch(`/api/users/${username}`);

				if (!response.ok) {
					if (response.status === 404) {
						throw new Error('User not found');
					}
					throw new Error('Failed to fetch user data');
				}

				const data = await response.json();
				setProfileData(data);
				setLoading(false);
			} catch (err) {
				console.error('Error fetching profile data:', err);
				setError(err instanceof Error ? err.message : 'An error occurred');
				setLoading(false);
			}
		};

		fetchProfileData();
	}, [username]);

	if (loading) {
		return (
			<div className='min-h-screen bg-circles-dark px-4 pt-6 pb-20 flex items-center justify-center'>
				<div className='text-circles-light text-lg'>Loading profile...</div>
			</div>
		);
	}

	if (error || !profileData) {
		return (
			<div className='min-h-screen bg-circles-dark px-4 pt-6 pb-20 flex flex-col items-center justify-center'>
				<div className='text-circles-light text-lg mb-4'>{error || 'Profile not found'}</div>
				<button
					onClick={() => router.push('/')}
					className='bg-circles-dark-blue text-circles-light px-4 py-2 rounded-lg'
				>
					Go Home
				</button>
			</div>
		);
	}
	return (
		<div className='min-h-screen bg-circles-dark px-4 pt-6 pb-20'>
			<ProfileHeader
				profileData={profileData}
				session={session}
				onFollowUpdate={handleFollowUpdate}
			/>
			<ProfileTabs />
		</div>
	);
}
