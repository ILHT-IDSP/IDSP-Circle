'use client';

import { useState, useRef, useEffect } from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';
import Image from 'next/image';
import ImageUploadCropper from '../common/ImageUploadCropper';

interface CircleDetails {
	id: number;
	name: string;
	avatar: string | null;
	description: string | null;
	isPrivate: boolean;
}

export default function CircleSettingsForm({ circleId }: { circleId: number; session: Session | null }) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [circle, setCircle] = useState<CircleDetails | null>(null);
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		isPrivate: false,
	});

	useEffect(() => {
		const fetchCircleDetails = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/circles/${circleId}`);

				if (!response.ok) {
					throw new Error('Failed to fetch circle details');
				}

				const data = await response.json();
				setCircle(data);
				setFormData({
					name: data.name,
					description: data.description || '',
					isPrivate: data.isPrivate,
				});
			} catch (err) {
				console.error('Error fetching circle details:', err);
				setError('Could not load circle information. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		if (circleId) {
			fetchCircleDetails();
		}
	}, [circleId]);

	const handleBack = () => {
		router.push(`/circle/${circleId}`);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
		}));
	};

	const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			isPrivate: e.target.checked,
		}));
	};
	const cropperRef = useRef<HTMLDivElement>(null);

	const handleAvatarClick = () => {
		// Access the input inside the ImageUploadCropper
		const input = cropperRef.current?.querySelector('input');
		if (input) {
			input.click();
		}
	};

	const handleUploadStart = () => {
		setIsUploadingAvatar(true);
		setError(null);
	};

	const handleUploadComplete = async (imageUrl: string) => {
		try {
			// Update circle avatar with the new URL
			const updateResponse = await fetch(`/api/circles/${circleId}/update-avatar`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ avatarUrl: imageUrl }),
			});

			if (!updateResponse.ok) {
				const errorData = await updateResponse.json();
				throw new Error(errorData.error || 'Failed to update circle avatar');
			}

			// Update the local state
			setCircle(prev => (prev ? { ...prev, avatar: imageUrl } : null));
		} catch (err) {
			console.error('Error updating circle avatar:', err);
			setError('Failed to update avatar. Please try again.');
		} finally {
			setIsUploadingAvatar(false);
		}
	};

	const handleUploadError = (errorMessage: string) => {
		setError(errorMessage);
		setIsUploadingAvatar(false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.name.trim() === '') {
			setError('Circle name cannot be empty');
			return;
		}

		try {
			setSaving(true);

			const response = await fetch(`/api/circles/${circleId}/update`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: formData.name,
					description: formData.description || null,
					isPrivate: formData.isPrivate,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to update circle settings');
			}

			router.refresh();
			router.push(`/circle/${circleId}`);
		} catch (err) {
			console.error('Error updating circle settings:', err);
			setError('Failed to update circle settings. Please try again.');
		} finally {
			setSaving(false);
		}
	};

	const handleDeleteCircle = async () => {
		if (!confirm('Are you sure you want to delete this circle? This action cannot be undone.')) {
			return;
		}

		try {
			setSaving(true);

			const response = await fetch(`/api/circles/${circleId}/delete`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to delete circle');
			}

			// Redirect to profile page after successful deletion
			router.push('/profile');
		} catch (err) {
			console.error('Error deleting circle:', err);
			setError('Failed to delete circle. Please try again.');
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#689bff]'></div>
			</div>
		);
	}

	if (error || !circle) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen p-4'>
				<h2 className='text-xl font-semibold text-red-500 mb-4'>Error</h2>
				<p className='text-center'>{error || 'Circle not found'}</p>
				<button
					onClick={() => router.push('/profile')}
					className='mt-6 px-6 py-2 rounded-full'
				>
					Back to Profile
				</button>
			</div>
		);
	}

	return (
		<div className='flex flex-col min-h-screen pb-20 px-4'>
			<div className='sticky top-0 z-10 bg-[var(--background)] py-4 mb-4'>
				<div className='flex items-center justify-between '>
					<div className='flex items-center'>
						<button
							onClick={handleBack}
							className='mr-4 p-2 rounded-full hover:opacity-70 hover:cursor-pointer transition-all'
						>
							<FaArrowLeft size={18} />
						</button>
						<span className='text-2xl font-bold'>Circle Settings</span>
					</div>

					<button
						onClick={handleSubmit}
						disabled={saving}
						className='px-6 py-1 bg-[var(--circles-dark-blue)] text-white hover:cursor-pointer hover:opacity-70 transition-all rounded-lg  disabled:opacity-50'
					>
						{saving ? 'Saving...' : 'Save'}
					</button>
				</div>
			</div>{' '}
			<div className='flex flex-col items-center mb-8'>
				<div
					className='w-24 h-24 rounded-full overflow-hidden mb-2 border-4 border-circles-dark-blue relative cursor-pointer group'
					onClick={handleAvatarClick}
					ref={cropperRef}
				>
					<Image
						src={circle.avatar || '/images/circles/default.svg'}
						alt={circle.name}
						width={96}
						height={96}
						className='object-cover w-full h-full'
					/>

					<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
						<FaCamera
							className='text-white'
							size={18}
						/>
					</div>

					{isUploadingAvatar && (
						<div className='absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center'>
							<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white'></div>
						</div>
					)}

					<ImageUploadCropper
						onUploadStart={handleUploadStart}
						onUploadComplete={handleUploadComplete}
						onUploadError={handleUploadError}
						uploadEndpoint='/api/upload'
						aspectRatio={1}
					/>
				</div>
				<p className='text-sm text-gray-400 mb-4'>Click to change avatar</p>
			</div>
			{/* Settings Form */}
			<form onSubmit={handleSubmit}>
				{error && <div className='mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-500 text-sm'>{error}</div>}

				<div className='mb-6'>
					<label
						className='block text-sm font-medium mb-2'
						htmlFor='name'
					>
						Circle Name <span className='text-red-500'>*</span>
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={formData.name}
						onChange={handleInputChange}
						className='w-full p-3 bg-[var(--input-background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-circles-dark-blue'
						placeholder='Circle name'
						required
					/>
				</div>

				<div className='mb-6'>
					<label
						className='block text-sm font-medium mb-2'
						htmlFor='description'
					>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={formData.description}
						onChange={handleInputChange}
						className='w-full p-3 bg-[var(--input-background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-circles-dark-blue h-24'
						placeholder='Add a description for your circle'
					></textarea>
				</div>

				<div className='mb-8'>
					<label className='flex items-center space-x-3 cursor-pointer'>
						<input
							type='checkbox'
							checked={formData.isPrivate}
							onChange={handlePrivacyChange}
							className='form-checkbox h-5 w-5'
						/>
						<span>Private Circle</span>
					</label>
					<p className='text-sm text-gray-400 mt-1 ml-8'>Private circles are only visible to members and require approval to join</p>
				</div>

				{/* Danger Zone */}
				<div className='mt-12 border border-red-500 rounded-lg p-4'>
					<h3 className='text-red-500 font-medium mb-2'>Danger Zone</h3>
					<p className='text-sm text-gray-400 mb-4'>Once you delete a circle, there is no going back. Please be certain.</p>
					<button
						type='button'
						onClick={handleDeleteCircle}
						className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
					>
						Delete Circle
					</button>
				</div>
			</form>
		</div>
	);
}
