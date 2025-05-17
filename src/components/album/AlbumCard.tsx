'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaComment, FaImages } from 'react-icons/fa';
import CircleHolder from '../circle_holders';
import { useState, useEffect } from 'react';
import CommentModal from './CommentModal';

interface AlbumCardProps {
	albumId: number;
	albumImage: string;
	albumName: string;
	userProfileImage: string;
	photoCount?: number;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ albumId, albumImage, albumName, userProfileImage, photoCount }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// Fetch like status from the API
		const fetchLikeStatus = async () => {
			try {
				const response = await fetch(`/api/albums/${albumId}/like`);
				if (response.ok) {
					const data = await response.json();
					setIsLiked(data.liked);
				}
			} catch (error) {
				console.error('Error fetching like status:', error);
			}
		};

		if (albumId) {
			fetchLikeStatus();
		}
	}, [albumId]);

	const handleLikeClick = async () => {
		if (isLoading) return;

		setIsLoading(true);
		try {
			const response = await fetch(`/api/albums/${albumId}/like`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				const data = await response.json();
				setIsLiked(data.liked);
			}
		} catch (error) {
			console.error('Error toggling like:', error);
		} finally {
			setIsLoading(false);
		}
	};
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
					/>					<div className='absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] via-transparent to-[rgba(0,0,0,0.3)]' />

					<div className='absolute top-3 right-3 z-10'>
						<CircleHolder
							imageSrc={userProfileImage}
							circleSize={40}
							showName={false}
						/>
					</div>					{photoCount !== undefined && (
						<div className='absolute top-3 left-3 z-10 flex items-center gap-1 bg-[rgba(0,0,0,0.4)] px-2 py-1 rounded text-[var(--background)] text-sm'>
							<FaImages className='text-[var(--background)]' />
							<span>{photoCount}</span>
						</div>
					)}

					<div className='absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 sm:p-4 z-10'>
						<h3 className='black-outline text-sm font-medium'>{albumName}</h3>

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
								disabled={isLoading}
							>								{isLiked ? (
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
