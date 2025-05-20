'use client';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

interface CreateCircleModalProps {
	isOpen: boolean;
	onClose: () => void;
	onCircleCreated: (circleId: number) => void;
	userId: string | undefined;
}

export default function CreateCircleModal({ isOpen, onClose, onCircleCreated, userId }: CreateCircleModalProps) {
	const [name, setName] = useState('');
	const [isPrivate, setIsPrivate] = useState(false);
	const [avatar, setAvatar] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

	if (!isOpen) return null;

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Check file size (max 5MB)
		if (file.size > 5 * 1024 * 1024) {
			setError('Image is too large. Maximum size is 5MB.');
			return;
		}

		// Create a preview
		const reader = new FileReader();
		reader.onloadend = () => {
			setAvatarPreview(reader.result as string);
		};
		reader.readAsDataURL(file);

		// Store the file for upload
		setAvatar(URL.createObjectURL(file));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!name.trim()) {
			setError('Please enter a circle name');
			return;
		}

		try {
			setIsSubmitting(true);
			setError(null);

			// Prepare the form data
			const formData = {
				avatar: avatarPreview || '',
				name: name.trim(),
				isPrivate,
				members: [],
				creatorId: parseInt(userId || '0', 10),
			};

			const response = await fetch('/api/create/circle', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ formData }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to create circle');
			}

			// Call the callback with the new circle ID
			if (data.circle && data.circle.id) {
				onCircleCreated(data.circle.id);
			}
		} catch (error) {
			console.error('Error creating circle:', error);
			setError(error instanceof Error ? error.message : 'Failed to create circle');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<div className='bg-[var(--background)] rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto'>
				<div className='flex justify-between items-center p-4 border-b border-[var(--foreground)] border-opacity-10'>
					<h3 className='text-xl font-semibold'>Create New Circle</h3>
					<button
						onClick={onClose}
						className='text-[var(--foreground)] opacity-70 hover:opacity-100 transition-opacity'
						aria-label='Close'
					>
						<FaTimes />
					</button>
				</div>

				<form
					onSubmit={handleSubmit}
					className='p-4'
				>
					{error && <div className='bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4'>{error}</div>}

					{/* Circle Avatar */}
					<div className='mb-4 flex flex-col items-center'>
						<div className='mb-2'>
							<div className='relative w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--foreground)] border-opacity-20'>
								<Image
									src={avatarPreview || '/images/circles/default.svg'}
									alt='Circle avatar'
									fill
									className='object-cover'
								/>
								<label className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer'>
									<span>Upload</span>
									<input
										type='file'
										accept='image/*'
										className='sr-only'
										onChange={handleFileChange}
									/>
								</label>
							</div>
						</div>
						<p className='text-xs text-[var(--foreground)] opacity-60'>Click to upload an image</p>
					</div>

					{/* Circle Name */}
					<div className='mb-4'>
						<label
							htmlFor='circle-name'
							className='block text-sm font-medium mb-1'
						>
							Circle Name *
						</label>
						<input
							type='text'
							id='circle-name'
							value={name}
							onChange={e => setName(e.target.value)}
							className='w-full px-3 py-2 border border-[var(--foreground)] border-opacity-20 rounded-md bg-transparent focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]'
							placeholder='Give your circle a name'
							required
						/>
					</div>

					{/* Privacy Setting */}
					<div className='mb-4'>
						<label className='flex items-center'>
							<input
								type='checkbox'
								checked={isPrivate}
								onChange={e => setIsPrivate(e.target.checked)}
								className='mr-2'
							/>
							<span>Private Circle (Only invited members can join)</span>
						</label>
					</div>

					{/* Submit Button */}
					<div className='flex justify-end pt-4 border-t border-[var(--foreground)] border-opacity-10'>
						<button
							type='button'
							onClick={onClose}
							className='bg-[var(--foreground)] bg-opacity-20 px-4 py-2 rounded-lg mr-2 hover:bg-opacity-30 transition-colors'
							disabled={isSubmitting}
						>
							Cancel
						</button>
						<button
							type='submit'
							className='bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-hover)] transition-colors'
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Creating...' : 'Create Circle'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
