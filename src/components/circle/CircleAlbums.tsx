'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AlbumCard from '../album/AlbumCard';
import AlbumGrid from '../album/AlbumGrid';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

interface Album {
	id: number;
	title: string;
	coverImage: string | null;
	creatorImage: string | null;
	photoCount: number;
}

export default function CircleAlbums({ circleId }: { circleId: number }) {
	const [albums, setAlbums] = useState<Album[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [canCreate, setCanCreate] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchAlbums = async () => {
			try {
				setLoading(true);
				const [albumsResponse, permissionsResponse] = await Promise.all([fetch(`/api/circles/${circleId}/albums`), fetch(`/api/circles/${circleId}/permissions`)]);

				if (!albumsResponse.ok) {
					throw new Error('Failed to fetch circle albums');
				}

				const albumsData = await albumsResponse.json();
				setAlbums(albumsData);

				if (permissionsResponse.ok) {
					const permissionsData = await permissionsResponse.json();
					setCanCreate(permissionsData.canCreateAlbum);
				}
			} catch (err) {
				console.error('Error fetching circle albums:', err);
				setError('Could not load albums. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchAlbums();
	}, [circleId]);

	const handleCreateAlbum = () => {
		router.push(`/create/album?circleId=${circleId}`);
	};

	if (loading) {
		return (
			<div className='px-6 py-4'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-lg font-semibold'>Albums</h2>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className='aspect-[2/3] bg-gray-300 rounded-lg animate-pulse'
						></div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='px-6 py-4'>
				<h2 className='text-lg font-semibold mb-2'>Albums</h2>
				<p className='text-red-500 text-sm'>{error}</p>
			</div>
		);
	}

	return (
		<div className='px-6 py-4 pb-24'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-lg font-semibold'>Albums • {albums.length}</h2>
				{canCreate && (
					<button
						onClick={handleCreateAlbum}
						className='flex items-center gap-2 bg-circles-dark-blue text-white px-4 py-2 rounded-full text-sm font-medium'
					>
						<FaPlus size={12} />
						<span>New Album</span>
					</button>
				)}
			</div>

			{albums.length === 0 ? (
				<div className='text-center py-10'>
					<p className='text-gray-400 mb-4'>No albums yet</p>
					{canCreate && (
						<button
							onClick={handleCreateAlbum}
							className='bg-circles-dark-blue text-white px-6 py-2 rounded-full text-sm font-medium'
						>
							Create First Album
						</button>
					)}
				</div>
			) : (
				<AlbumGrid albumIds={albums.map(album => album.id)}>
					{albums.map(album => (
						<AlbumCard
							albumId={album.id}
							albumImage={album.coverImage || '/images/albums/default.svg'}
							albumName={album.title}
							userProfileImage={album.creatorImage || '/images/default-avatar.png'}
							photoCount={album.photoCount}
							key={album.id}
						/>
					))}
				</AlbumGrid>
			)}
		</div>
	);
}
