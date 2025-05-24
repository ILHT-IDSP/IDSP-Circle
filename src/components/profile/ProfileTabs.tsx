'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AlbumCard from '@/components/album/AlbumCard';
import AlbumGrid from '@/components/album/AlbumGrid';
import CircleHolder from '@/components/circle_holders';
import ThemeToggle from '../theme/NewThemeToggle';

interface Item {
	id: number;
	name: string;
	image: string;
	userProfileImage?: string;
	photoCount: number;
}

interface UserContent {
	albums: Item[];
	circles: Item[];
	isPrivate: boolean;
	isOwnProfile?: boolean;
}

export default function ProfileTabs() {
	const params = useParams();
	const router = useRouter();
	const username = useMemo(() => {
		return typeof params?.username === 'string' 
			? params.username 
			: Array.isArray(params?.username) 
				? params.username[0] 
				: null;
	}, [params?.username]);

	const [activeTab, setActiveTab] = useState<'albums' | 'circles'>('albums');
	const [content, setContent] = useState<UserContent>({ albums: [], circles: [], isPrivate: false });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchUserContent = useCallback(async () => {
		if (!username) {
			setError('Username not provided');
			setLoading(false);
			return;
		}

		try {
			setLoading(true);
			setError(null);
			const response = await fetch(`/api/users/${username}/content`);

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('User not found');
				}
				throw new Error('Failed to fetch user content');
			}

			const data = await response.json();
			setContent(data);
		} catch (err) {
			console.error('Error fetching user content:', err);
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setLoading(false);
		}
	}, [username]);

	useEffect(() => {
		fetchUserContent();
	}, [fetchUserContent]);

	// Loading state
	if (loading) {
		return (
			<div className='py-8 flex flex-col items-center'>
				<div className='w-16 h-16 border-t-4 border-circles-dark-blue border-solid rounded-full animate-spin'></div>
				<p className='mt-4 text-circles-dark text-lg'>Loading {activeTab}...</p>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className='py-8 flex flex-col items-center'>
				<p className='text-red-500 text-lg'>{error}</p>{' '}
				<button
					onClick={() => router.refresh()}
					className='mt-4 px-4 py-2 bg-circles-dark-blue text-circles-light rounded-lg hover:bg-opacity-90 transition-colors'
				>
					Try Again
				</button>
			</div>
		);
	} 
	// Private profile state
	// Only show the private profile message if:
	// 1. Content is marked as private
	// 2. It's not the user's own profile
	// 3. The albums and circles arrays are empty (meaning they're not a follower)
	if (content.isPrivate && content.isOwnProfile === false && content.albums.length === 0 && content.circles.length === 0) {
		return (
			<div className='py-8 flex flex-col items-center'>
				<div className='w-16 h-16 flex items-center justify-center bg-gray-200 text-[var(--circles-dark)] rounded-full'>
					{' '}
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-8 w-8 text-circles-light opacity-70'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
						/>
					</svg>
				</div>
				<p className='mt-4 text-circles-dark text-lg'>This profile is private</p>
			</div>
		);
	}
	return (
		<div>
			{' '}
			<div className='flex justify-center space-x-8 mb-4  relative w-full'>
				<button
					className={`text-lg font-semibold w-full relative cursor-pointer transition-all duration-200 hover:text-circles-dark-blue ${activeTab === 'albums' ? '' : 'opacity-50 hover:opacity-80'}`}
					onClick={() => setActiveTab('albums')}
				>
					albums
					{activeTab === 'albums' ? <span className='absolute bottom-[-4px] left-0 right-0 h-[3px] bg-current rounded-full'></span> : <span className='absolute bottom-[-4px] left-0 right-0 h-[3px] bg-current rounded-full scale-x-0 group-hover:scale-x-100 opacity-0 hover:opacity-50 transition-transform duration-300'></span>}
				</button>
				<button
					className={`text-lg font-semibold w-full relative cursor-pointer transition-all duration-200 hover:text-circles-dark-blue ${activeTab === 'circles' ? '' : 'opacity-50 hover:opacity-80'}`}
					onClick={() => setActiveTab('circles')}
				>
					circles
					{activeTab === 'circles' ? <span className='absolute bottom-[-4px] left-0 right-0 h-[3px] bg-current rounded-full'></span> : <span className='absolute bottom-[-4px] left-0 right-0 h-[3px] bg-current rounded-full scale-x-0 hover:scale-x-100 opacity-0 hover:opacity-50 transition-transform duration-300'></span>}
				</button>
			</div>
			<div className='py-4'>
				{activeTab === 'albums' && content.albums.length === 0 && (
					<div className='py-8 flex flex-col items-center'>
						<div className='w-16 h-16 flex items-center justify-center bg-circles-light bg-opacity-10 rounded-full'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-8 w-8 text-circles-light opacity-60'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
								/>
							</svg>{' '}
						</div>
						<p className='mt-4 text-circles-light opacity-70 text-lg'>No albums found</p>{' '}
						{username === null && (
							<Link
								href='/create/album'
								className='mt-4 px-4 py-2 bg-circles-dark-blue text-circles-light rounded-lg hover:bg-opacity-90 transition-colors'
							>
								Create an Album
							</Link>
						)}
					</div>
				)}{' '}
				{activeTab === 'circles' && content.circles.length === 0 && (
					<div className='py-8 flex flex-col items-center'>
						<div className='w-16 h-16 flex items-center justify-center bg-circles-light bg-opacity-10 rounded-full'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-8 w-8 text-circles-light opacity-60'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
								/>
							</svg>{' '}
						</div>
						<p className='mt-4 text-circles-light opacity-70 text-lg'>No circles found</p>{' '}
						{username === null && (
							<Link
								href='/create/circle'
								className='mt-4 px-4 py-2 bg-circles-dark-blue text-circles-light rounded-lg hover:bg-opacity-90 transition-colors'
							>
								Create a Circle
							</Link>
						)}
					</div>
				)}{' '}
				{activeTab === 'albums' && content.albums.length > 0 && (
					<AlbumGrid albumIds={content.albums.map(album => album.id)}>
						{' '}
						{content.albums.map(album => (
							<div
								key={album.id}
								className='transform transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg'
							>
								<AlbumCard
									albumImage={album.image}
									albumName={album.name}
									userProfileImage={album.userProfileImage || '/images/default-avatar.png'}
									albumId={album.id}
									photoCount={album.photoCount}
								/>
							</div>
						))}
					</AlbumGrid>
				)}{' '}
				{activeTab === 'circles' && content.circles.length > 0 && (
					<div className='grid grid-cols-3 gap-2 mb-16'>
						{' '}
						{content.circles.map(circle => (
							<div
								key={circle.id}
								className='transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-lg'
							>
								<CircleHolder
									imageSrc={circle.image}
									name={circle.name}
									circleSize={120}
									className='mb-2 hover:opacity-90'
									altText={`${circle.name} circle`}
									link={`/circle/${circle.id}`}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
