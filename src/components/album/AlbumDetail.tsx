'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaComment, FaPlus } from 'react-icons/fa';
import { Session } from '@auth/core/types';
import CommentModal from './CommentModal';
import AddPhotoModal from './AddPhotoModal';
import PhotoBatchUpload from './PhotoBatchUpload';

interface Photo {
	id: number;
	url: string;
	description: string | null;
	createdAt: string;
}

interface AlbumDetailProps {
	album: {
		id: number;
		title: string;
		description: string | null;
		coverImage: string | null;
		createdAt: string;
		isPrivate: boolean;
		creatorId: number | null;
		circleId: number | null;
		Photo: Photo[];
		creator: {
			id: number;
			username: string;
			name: string | null;
			profileImage: string | null;
		} | null;
		Circle: {
			id: number;
			name: string;
			avatar: string | null;
		} | null;
		_count: {
			AlbumLike: number;
			AlbumComment: number;
			Photo: number;
		};
	};
	isLiked: boolean;
	session: Session | null;
}

const AlbumDetail: React.FC<AlbumDetailProps> = ({ album, isLiked: initialIsLiked, session }) => {
	const [isLiked, setIsLiked] = useState(initialIsLiked);
	const [likeCount, setLikeCount] = useState(album._count.AlbumLike);
	const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
	const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false);
	const [isBatchUploadOpen, setIsBatchUploadOpen] = useState(false);
	const [photos, setPhotos] = useState<Photo[]>(album.Photo);
	const [isLoading, setIsLoading] = useState(false);

	const handleLikeClick = async () => {
		if (isLoading) return;
		if (!session?.user) {
			// Redirect to login or show login modal
			alert('Please log in to like albums');
			return;
		}

		setIsLoading(true);
		try {
			const response = await fetch(`/api/albums/${album.id}/like`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				const data = await response.json();
				setIsLiked(data.liked);
				setLikeCount(prev => (data.liked ? prev + 1 : prev - 1));
			}
		} catch (error) {
			console.error('Error toggling like:', error);
		} finally {
			setIsLoading(false);
		}
	};
	const handleAddPhoto = (newPhoto: Photo) => {
		setPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
	};

	const handlePhotoBatchComplete = () => {
		setIsBatchUploadOpen(false);

		// Reload photos
		fetch(`/api/albums/${album.id}/photos`)
			.then(response => response.json())
			.then(data => {
				setPhotos(data.photos);
			})
			.catch(error => {
				console.error('Error fetching updated photos:', error);
			});
	};
	const canAddPhotos =
		session?.user &&
		((album.creatorId && session.user.id && parseInt(session.user.id) === album.creatorId) ||
			album.circleId) /* && is member of circle */;

	return (
		<div className='container mx-auto px-4 py-6'>
			{/* Album Header */}
			<div className='flex flex-col gap-4 mb-6'>
				<div className='flex items-center justify-between'>
					<div>						<h1 className='text-2xl font-bold'>{album.title}</h1>
						<p className='text-sm text-[var(--foreground)] opacity-60 mt-1'>{photos.length} photos</p>
					</div>{canAddPhotos && (
						<div className='flex items-center gap-2'>
							<button
								onClick={() => setIsAddPhotoModalOpen(true)}
								className='bg-[var(--foreground)] bg-opacity-10 hover:bg-opacity-20 rounded-lg p-2 flex items-center gap-2 text-[var(--primary)]'
								title='Add a single photo'
							>
								<FaPlus /> Add Photo
							</button>							<button
								onClick={() => setIsBatchUploadOpen(true)}
								className='bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg p-2 flex items-center gap-2 text-[var(--background)]'
								title='Add multiple photos at once'
							>
								<FaPlus /> Add Multiple Photos
							</button>
						</div>
					)}
				</div>

				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						{album.creator && (
							<Link
								href={`/${album.creator.username}`}
								className='flex items-center gap-2'
							>
								<Image
									src={album.creator.profileImage || '/images/default-avatar.png'}
									alt={album.creator.username}
									width={40}
									height={40}
									className='rounded-full aspect-square object-cover'
								/>
								<span className='font-medium'>{album.creator.name || album.creator.username}</span>
							</Link>
						)}

						{album.Circle && (
							<Link
								href={`/circle/${album.Circle.id}`}
								className='flex items-center gap-2 ml-2'
							>
								<Image
									src={album.Circle.avatar || '/images/circles/default.svg'}
									alt={album.Circle.name}
									width={40}
									height={40}
									className='rounded-full object-cover'
								/>
								<span className='font-medium'>{album.Circle.name}</span>
							</Link>
						)}
					</div>

					<div className='flex items-center gap-4'>
						<button
							className='flex items-center gap-1 hover:cursor-pointer'
							aria-label={isLiked ? 'Unlike album' : 'Like album'}
							onClick={handleLikeClick}
							disabled={isLoading}
						>
							{isLiked ? (
								<>
									<FaHeart className='text-xl text-red-500' />
									<span>{likeCount}</span>
								</>
							) : (
								<>
									<FaRegHeart className='text-xl' />
									<span>{likeCount}</span>
								</>
							)}
						</button>

						<button
							className='flex items-center gap-1 hover:cursor-pointer'
							aria-label='Comment on album'
							onClick={() => setIsCommentModalOpen(true)}
						>
							<FaComment className='text-xl' />
							<span>{album._count.AlbumComment}</span>
						</button>
					</div>
				</div>				{album.description && <p className='text-sm text-[var(--foreground)] opacity-60'>{album.description}</p>}
			</div>

			{photos.length > 0 ? (
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
					{photos.map(photo => (
						<div
							key={photo.id}
							className='relative aspect-square rounded-lg overflow-hidden'
						>
							<Image
								src={photo.url}
								alt={photo.description || `Photo ${photo.id}`}
								fill
								className='object-cover'
							/>
						</div>
					))}
				</div>			) : (
				<div className='flex flex-col items-center justify-center py-10'>
					<p className='text-lg text-[var(--foreground)] opacity-60'>No photos in this album yet</p>
					{canAddPhotos && (
						<div className='flex gap-2 mt-4'>
							<button
								onClick={() => setIsAddPhotoModalOpen(true)}
								className='bg-[var(--foreground)] bg-opacity-10 hover:bg-opacity-20 rounded-full px-4 py-2 flex items-center gap-2 text-[var(--primary)]'
							>
								<FaPlus /> Add Photo
							</button>							<button
								onClick={() => setIsBatchUploadOpen(true)}
								className='bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-full px-4 py-2 flex items-center gap-2 text-[var(--background)]'
							>
								<FaPlus /> Add Multiple Photos
							</button>
						</div>
					)}
				</div>
			)}

			{/* Modals */}
			{isCommentModalOpen && (
				<CommentModal
					albumId={album.id}
					isOpen={isCommentModalOpen}
					onClose={() => setIsCommentModalOpen(false)}
				/>
			)}

			{isAddPhotoModalOpen && (
				<div className='fixed inset-0 bg-[var(--background)] flex items-center justify-center z-100 p-4'>
				<AddPhotoModal
					albumId={album.id}
					isOpen={isAddPhotoModalOpen}
					onClose={() => setIsAddPhotoModalOpen(false)}
					onPhotoAdded={handleAddPhoto}
				/>
				</div>
			)}			{isBatchUploadOpen && (
				<div className='fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-100 p-4'>
					<div className='bg-[var(--background)] rounded-xl max-w-4xl w-full overflow-hidden shadow-xl'>
						<PhotoBatchUpload
							albumId={album.id}
							onComplete={handlePhotoBatchComplete}
							onCancel={() => setIsBatchUploadOpen(false)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default AlbumDetail;
