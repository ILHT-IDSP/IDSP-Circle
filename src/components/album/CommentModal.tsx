'use client';

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

interface Comment {
	id: number;
	content: string;
	createdAt: string;
	User: {
		id: number;
		username: string;
		name: string | null;
		profileImage: string | null;
	};
}

interface CommentModalProps {
	albumId: number;
	isOpen: boolean;
	onClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ albumId, isOpen, onClose }) => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [newComment, setNewComment] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

	// Create a reference to the portal container
	useEffect(() => {
		// Make sure we're in the browser environment
		if (typeof window !== 'undefined') {
			// Check if portal container exists, create if not
			let portalContainer = document.getElementById('portal-root');

			if (!portalContainer) {
				portalContainer = document.createElement('div');
				portalContainer.id = 'portal-root';
				document.body.appendChild(portalContainer);
			}

			setPortalElement(portalContainer);
		}
	}, []);

	// Prevent body scrolling when modal is open
	useEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow;
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.body.style.overflow = originalStyle;
		};
	}, [isOpen]);

	const fetchComments = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/albums/${albumId}/comments`);
			if (!response.ok) {
				throw new Error('Failed to fetch comments');
			}
			const data = await response.json();
			setComments(data);
		} catch (error) {
			console.error('Error fetching comments:', error);
		} finally {
			setIsLoading(false);
		}
	}, [albumId]);

	useEffect(() => {
		if (isOpen && albumId) {
			fetchComments();
		}
	}, [isOpen, albumId, fetchComments]);

	const handleSubmitComment = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newComment.trim() === '') return;

		setIsSubmitting(true);
		try {
			const response = await fetch(`/api/albums/${albumId}/comments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ content: newComment }),
			});

			if (!response.ok) {
				throw new Error('Failed to submit comment');
			}

			const addedComment = await response.json();
			setComments([addedComment, ...comments]);
			setNewComment('');
		} catch (error) {
			console.error('Error submitting comment:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Format date to a readable string
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		});
	};

	if (!isOpen || !portalElement) return null;

	// Create portal to render the modal at the document body level
	return createPortal(
		<>
		<div
			className='fixed inset-0 bg-[rgba(0,0,0,0.6)] flex  items-end justify-center z-[100]'
			onClick={e => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div
				className='bg-[var(--background)] w-full max-w-xl transition-all opacity-100 max-h-[80vh] sm:max-h-[70vh] rounded-t-xl flex flex-col shadow-lg'
				onClick={e => e.stopPropagation()}
			>
				<div className='relative border-b border-[var(--border)] px-6 py-4 flex justify-between items-center'>
					<div className='absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[var(--border)] rounded-full'></div>

					<h2 className='text-xl font-semibold text-[var(--foreground)] mt-1'>Comments</h2>
					<button
						className='text-[var(--foreground)] text-xl hover:opacity-70 transition-opacity'
						onClick={onClose}
						aria-label='Close comments'
					>
						<FaTimes />
					</button>
				</div>

				{/* Comments List */}
				<div className='flex-1 overflow-y-auto p-4 max-h-[50vh] sm:max-h-[40vh] overscroll-contain'>
					{isLoading ? (
						<div className='flex items-center justify-center py-8'>
							<div className='w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin'></div>
						</div>
					) : comments.length > 0 ? (
						<ul className='space-y-4'>
							{comments.map(comment => (
								<li
									key={comment.id}
									className='flex gap-3'
								>
									<div className='flex-shrink-0'>
										<Image
											src={comment.User.profileImage || '/images/default-avatar.png'}
											alt={comment.User.username}
											width={36}
											height={36}
											className='rounded-full object-cover aspect-square'
										/>
									</div>
									<div className='flex-1 bg-[var(--background-secondary)] rounded-xl p-3'>
										<div className='flex justify-between mb-1'>
											<span className='font-medium text-sm'>{comment.User.name || comment.User.username}</span>
											<span className='text-xs text-[var(--foreground-secondary)]'>{formatDate(comment.createdAt)}</span>
										</div>
										<p className='text-sm break-words leading-relaxed'>{comment.content}</p>
									</div>
								</li>
							))}
						</ul>
					) : (
						<div className='text-center py-8 text-[var(--foreground-secondary)]'>
							<p className='font-medium mb-2'>No comments yet</p>
							<p className='text-sm opacity-70'>Be the first to share your thoughts!</p>
						</div>
					)}
				</div>

				{/* Comment Form */}
				<form
					onSubmit={handleSubmitComment}
					className='p-4 pt-3 pb-6 sm:pb-8 border-t border-[var(--border)] bg-[var(--background)]'
				>
					<div className='flex gap-2'>
						<input
							type='text'
							value={newComment}
							onChange={e => setNewComment(e.target.value)}
							placeholder='Write a comment...'
							className='flex-1 border border-[var(--border)] rounded-lg py-2 px-4 bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)]'
							disabled={isSubmitting}
						/>
						<button
							type='submit'
							className='bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium rounded-lg px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
							disabled={isSubmitting || newComment.trim() === ''}
						>
							{isSubmitting ? 'Posting...' : 'Post'}
						</button>
					</div>
				</form>
			</div>
			</div>
		</>, portalElement
	);
};

export default CommentModal;
