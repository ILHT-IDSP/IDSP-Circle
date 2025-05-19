'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaComment, FaImages } from 'react-icons/fa';
import CircleHolder from '../circle_holders';
import { useState } from 'react';
import CommentModal from './CommentModal';
import { useAlbumLikes } from './AlbumLikesContext';

interface AlbumCardProps {
	albumId: number;
	albumImage: string;
	albumName: string;
	userProfileImage: string;
	photoCount?: number;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ albumId, albumImage, albumName, userProfileImage, photoCount }) => {
	const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
	const { likeStatuses, toggleLike } = useAlbumLikes();
	const [loadingAlbums, setLoadingAlbums] = useState<{ [key: number]: boolean }>({});
	const handleLikeClick = async () => {
		if (loadingAlbums[albumId]) return;
		setLoadingAlbums(prev => ({ ...prev, [albumId]: true }));
		await toggleLike(albumId);
		setLoadingAlbums(prev => ({ ...prev, [albumId]: false }));
	};

	const isLiked = likeStatuses[albumId]?.liked || false;

	return (
		<div
			className='relative w-full rounded-lg overflow-hidden'
			style={{ aspectRatio: '2/3' }}
		>
			<Link
				href={`/album/${albumId}`}
				className='relative w-full h-full block'
			>
				<div className='relative w-full h-full'>
					<Image
						src={albumImage}
						alt={`${albumName} album cover`}
						fill
						className='object-cover'
					/>{' '}
					<div className='absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] via-transparent to-[rgba(0,0,0,0.3)]' />
					<div className='absolute top-3 right-3 z-10'>
						<CircleHolder
							imageSrc={userProfileImage}
							circleSize={40}
							showName={false}
						/>
					</div>{' '}
					{photoCount !== undefined && (
						<div className='absolute top-3 left-3 z-10 flex items-center gap-1 bg-[rgba(0,0,0,0.4)] px-2 py-1 rounded text-white text-sm'>
							<FaImages className='text-white' />
							<span>{photoCount}</span>
						</div>
					)}
					<div className='absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 sm:p-4 z-10'>
						<h3
							className='black-outline text-sm font-medium'
							style={{ maxWidth: 'calc(100% - 80px)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
						>
							{albumName}
						</h3>

						<div className='flex items-center gap-3'>
							{' '}
							<button
								className='flex items-center gap-1 hover:cursor-pointer'
								aria-label={isLiked ? 'Unlike album' : 'Like album'}
								onClick={e => {
									e.preventDefault();
									e.stopPropagation();
									handleLikeClick();
								}}
								disabled={loadingAlbums[albumId]}
							>
								{' '}
								{isLiked ? (
									<>
										<FaHeart className='text-xl text-[#e8083e]' />
									</>
								) : (
									<>
										<FaRegHeart className='text-xl text-white text-shadow-black' />
									</>
								)}
							</button>
							<button
								className='black-outline hover:cursor-pointer'
								aria-label='Comment on album'
								onClick={e => {
									e.preventDefault();
									e.stopPropagation();
									setIsCommentModalOpen(true);
								}}
							>
								<FaComment className='text-xl' />
							</button>
						</div>
					</div>
				</div>
			</Link>

			{isCommentModalOpen && (
				<CommentModal
					albumId={albumId}
					isOpen={isCommentModalOpen}
					onClose={() => setIsCommentModalOpen(false)}
				/>
			)}
		</div>
	);
};

export default AlbumCard;
