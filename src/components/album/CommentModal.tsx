import { useEffect, useState, useCallback } from 'react';
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

	// Prevent body scrolling when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
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

	if (!isOpen) return null;

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

	return (
		<div
			className='comment-modal-overlay'
			onClick={e => {
				// Close when clicking outside the modal
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div
				className='comment-modal-container'
				onClick={e => e.stopPropagation()}
			>
				{/* Header */}
				<div className='comment-modal-header'>
					<h2 className='comment-modal-title'>Comments</h2>
					<button
						className='comment-modal-close'
						onClick={onClose}
						aria-label='Close comments'
					>
						<FaTimes />
					</button>
				</div>{' '}
				{/* Comments List */}
				<div className='comment-modal-body'>
					{isLoading ? (
						<div
							className='flex-center'
							style={{ padding: '32px 0' }}
						>
							<div className='loading-spinner'></div>
						</div>
					) : comments.length > 0 ? (
						<ul className='comment-list'>
							{comments.map(comment => (
								<li
									key={comment.id}
									className='comment-item'
								>
									<div>
										<Image
											src={comment.User.profileImage || '/images/default-avatar.png'}
											alt={comment.User.username}
											width={36}
											height={36}
											className='rounded-full object-cover'
										/>
									</div>
									<div className='comment-content'>
										<div className='comment-header'>
											<span className='comment-username'>{comment.User.name || comment.User.username}</span>
											<span className='comment-time'>{formatDate(comment.createdAt)}</span>
										</div>
										<p className='comment-text'>{comment.content}</p>
									</div>
								</li>
							))}
						</ul>
					) : (
						<div className='empty-comments'>
							<div style={{ textAlign: 'center', padding: '32px 0', color: 'gray' }}>
								<p style={{ fontWeight: 500, marginBottom: '8px' }}>No comments yet</p>
								<p style={{ fontSize: '14px', opacity: 0.7 }}>Be the first to share your thoughts!</p>
							</div>
						</div>
					)}
				</div>
				{/* Comment Form */}
				<form
					onSubmit={handleSubmitComment}
					className='comment-modal-form'
				>
					<div className='comment-modal-input-container'>
						<input
							type='text'
							value={newComment}
							onChange={e => setNewComment(e.target.value)}
							placeholder='Write a comment...'
							className='comment-modal-input'
							disabled={isSubmitting}
						/>
						<button
							type='submit'
							className='comment-modal-submit'
							disabled={isSubmitting || newComment.trim() === ''}
						>
							{isSubmitting ? 'Posting...' : 'Post'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CommentModal;
