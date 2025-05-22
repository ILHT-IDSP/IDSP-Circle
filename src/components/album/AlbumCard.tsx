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
	sourceName?: string;
	sourceType?: 'user' | 'circle';
	creatorName?: string;
	circleName?: string;
	circleImage?: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ albumId, albumImage, albumName, userProfileImage, photoCount, sourceName, sourceType, creatorName, circleName, circleImage }) => {
	const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
	const { likeStatuses, toggleLike, pendingAlbums } = useAlbumLikes();

	const handleLikeClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		// Don't allow another click if this album is already being processed
		if (pendingAlbums.has(albumId)) return;

		await toggleLike(albumId);
	};

	const isLiked = likeStatuses[albumId]?.liked || false;
	const isPending = pendingAlbums.has(albumId);

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
					{/* User profile image in top right */}
					<div className='absolute top-3 right-3 z-10'>
						<CircleHolder
							imageSrc={userProfileImage}
							circleSize={40}
							showName={false}
						/>
					</div>
					{/* Circle image if available */}
					{circleName && circleImage && (
						<div className='absolute top-3 right-16 z-10'>
							<CircleHolder
								imageSrc={circleImage}
								circleSize={40}
								showName={false}
							/>
						</div>
					)}
					{photoCount !== undefined && (
						<div className='absolute top-3 left-3 z-10 flex items-center gap-1 bg-[rgba(0,0,0,0.4)] px-2 py-1 rounded text-white text-sm'>
							<FaImages className='text-white' />
							<span>{photoCount}</span>
						</div>
					)}
					<div className='absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 sm:p-4 z-10'>
						<div
							className='flex flex-col'
							style={{ maxWidth: 'calc(100% - 80px)' }}
						>
							<h3
								className='black-outline text-sm font-medium'
								style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
							>
								{albumName}
							</h3>

							{/* Show creator name */}
							{creatorName && <span className='text-xs opacity-90 black-outline flex items-center gap-1'>• By {creatorName}</span>}

							{/* Show circle if available */}
							{circleName && <span className='text-xs opacity-90 black-outline flex items-center gap-1'>◉ {circleName}</span>}

							{/* Fallback to old source display if needed */}
							{!creatorName && !circleName && sourceName && (
								<span className='text-xs opacity-90 black-outline flex items-center gap-1'>
									{sourceType === 'circle' ? '◉' : '•'} {sourceName}
								</span>
							)}
						</div>

						<div className='flex items-center gap-3'>
							{' '}
							<button
								className={`flex items-center gap-1 hover:cursor-pointer ${isPending ? 'opacity-60' : ''}`}
								aria-label={isLiked ? 'Unlike album' : 'Like album'}
								onClick={handleLikeClick}
								disabled={isPending}
							>
								{' '}
								{isLiked ? (
									<>
										<FaHeart className={`text-xl text-[#e8083e] ${isPending ? 'animate-pulse' : ''}`} />
									</>
								) : (
									<>
										<FaRegHeart className={`text-xl text-white text-shadow-black ${isPending ? 'animate-pulse' : ''}`} />
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
