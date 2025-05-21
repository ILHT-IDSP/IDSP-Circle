'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Session } from 'next-auth';
import { Pencil } from 'lucide-react';
import { createCroppedImage } from '../user_registration/add_profilepicture/cropUtils';
import ImageCropper from '../user_registration/add_profilepicture/ImageCropper';
import { useUpdateSession } from '@/hooks/useUpdateSession';

interface ExtendedUser {
	id?: string;
	name?: string | null;
	email?: string;
	image?: string;
	username?: string;
}

export default function EditProfileForm({ session }: { session: Session | null }) {
	const [name, setName] = useState(session?.user?.name || '');
	const [username, setUsername] = useState((session?.user as ExtendedUser)?.username || '');
	const [email, setEmail] = useState(session?.user?.email || '');
	const [bio, setBio] = useState('');
	const [avatar, setAvatar] = useState(session?.user?.image || '');
	const [isProfilePrivate, setIsProfilePrivate] = useState(false);
	const [preview, setPreview] = useState<string | null>(null);
	const [showCropper, setShowCropper] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
	const router = useRouter();	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { updateSessionData } = useUpdateSession();

	// Functions to handle the cropper
	const handleCropComplete = (croppedArea: any) => {
		setCroppedAreaPixels(croppedArea);
	};

	const handleCropCancel = () => {
		setShowCropper(false);
		if (preview) {
			URL.revokeObjectURL(preview);
			setPreview(null);
		}
		setSelectedFile(null);
	};
	useEffect(() => {
		const fetchUserProfile = async () => {
			if (!session?.user?.username) {
				setLoading(false);
				return;
			}

			try {
				const username = (session.user as ExtendedUser).username;
				const response = await fetch(`/api/users/${username}`);
				if (response.ok) {
					const data = await response.json();
					if (data.bio) setBio(data.bio);
					if (data.username) setUsername(data.username);
					// Update avatar with the latest image from the database
					if (data.profileImage) setAvatar(data.profileImage);
					// Set privacy setting
					setIsProfilePrivate(data.isProfilePrivate || false);
				}
			} catch (error: unknown) {
				console.error('Error fetching user profile:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserProfile();
	}, [session]);
	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.type.startsWith('image/')) {
			// Create a preview and open the cropper
			const previewUrl = URL.createObjectURL(file);
			setPreview(previewUrl);
			setSelectedFile(file);
			setShowCropper(true);
		} else {
			setError('Please select an image file');
		}
	};

	const uploadCroppedImage = async () => {
		if (!preview || !croppedAreaPixels) return;

		try {
			setIsSubmitting(true); // Show loading state

			// Create a cropped image blob
			const croppedImageBlob = await createCroppedImage(preview, croppedAreaPixels);

			// Create a file from the blob
			const croppedFile = new File([croppedImageBlob], selectedFile?.name || 'cropped-profile.jpg', { type: 'image/jpeg' });

			// Upload the cropped file
			const formData = new FormData();
			formData.append('file', croppedFile);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();
			if (data.url) {
				setAvatar(data.url);				// Update the user's avatar in the database
				const updateResponse = await fetch('/api/user/profile', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						profileImage: data.url,
						// Send existing values to prevent overwriting them
						name,
						bio,
						username,
						isProfilePrivate,
					}),
				});

				if (!updateResponse.ok) {
					throw new Error('Failed to update profile with new avatar');
				}
				
				// Update the session data to reflect the new avatar
				await updateSessionData();
			} else {
				setError('Failed to upload image');
			}
		} catch (error: unknown) {
			console.error('Avatar upload error:', error);
			setError('Failed to upload image');
		} finally {
			setIsSubmitting(false); // Hide loading state
			setShowCropper(false);

			// Clean up the blob URL to prevent memory leaks
			if (preview) {
				URL.revokeObjectURL(preview);
				setPreview(null);
			}
			setSelectedFile(null);
		}
	};	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name.trim()) {
			setError('Name is required.');
			return;
		}
		if (!username.trim()) {
			setError('Username is required.');
			return;
		}

		// Username validation: only allow letters, numbers, underscores, and hyphens
		if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
			setError('Username can only contain letters, numbers, underscores, and hyphens.');
			return;
		}

		setError(null);
		setIsSubmitting(true);
		try {
			const res = await fetch('/api/user/profile', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, bio, username, isProfilePrivate }),
			});

			const data = await res.json();
			if (!res.ok) {
				setError(data.error || 'Failed to update profile');
				return;
			}			// Check if username has changed
			const usernameChanged = username !== (session?.user as ExtendedUser)?.username;
			
			// Update the session data
			const sessionUpdated = await updateSessionData();
			
			if (sessionUpdated) {
				setSuccess('Profile updated successfully!');
				// Wait a moment to show the success message before redirecting
				setTimeout(() => {
					router.push(`/${username}`);
				}, 1000);
			} else {
				// Redirect anyway even if session update failed
				router.push(`/${username}`);
			}
		} catch (error: unknown) {
			setError('An error occurred while updating your profile.');
			console.error('Profile update error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};
	if (loading) {
		return <div className='flex justify-center p-4'>Loading profile data...</div>;
	}
	return (		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center p-4 bg-circles-light rounded-2xl shadow-lg'
		>
			{error && <div className='text-red-600 mb-2 w-full p-2 bg-red-50 rounded-lg'>{error}</div>}
			{success && <div className='text-green-600 mb-2 w-full p-2 bg-green-50 rounded-lg'>{success}</div>}
			{/* Image Cropper Modal */}
			{showCropper && preview && (
				<ImageCropper
					imageUrl={preview}
					onCropComplete={handleCropComplete}
					onCancel={handleCropCancel}
					onConfirm={uploadCroppedImage}
					isSubmitting={isSubmitting}
				/>
			)}
			<div className='mb-4 text-center'>
				<div className='relative inline-block cursor-pointer'>
					<Image
						src={avatar || '/images/default-avatar.png'}
						alt='Profile'
						width={96}
						height={96}
						className='w-24 h-24 rounded-full object-cover border-4 border-circles-dark-blue dark:border-blue-600'
						onClick={() => inputRef.current?.click()}
					/>
					{isSubmitting && (
						<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full'>
							<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white'></div>
						</div>
					)}
					<div className='absolute bottom-0 right-0 bg-black dark:bg-gray-800 rounded-full p-1.5 shadow-md hover:bg-gray-800 dark:hover:bg-black transition-colors'>
						<Pencil
							size={16}
							className='text-white'
						/>
					</div>
					<input
						ref={inputRef}
						type='file'
						accept='image/*'
						className='hidden'
						onChange={handleAvatarChange}
					/>
				</div>
				<p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>Click to change profile picture</p>
			</div>
			{/* Name */}
			<div className='w-full mb-4'>
				{' '}
				<label
					htmlFor='name-input'
					className='block font-medium mb-1'
				>
					Name
				</label>
				<input
					id='name-input'
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='Enter your display name'
					className='w-full p-2 rounded-lg border-2 border-circles-dark-blue'
					required
				/>
			</div>
			{/* Username */}
			<div className='w-full mb-4'>
				{' '}
				<label
					htmlFor='username-input'
					className='block font-medium mb-1'
				>
					Username
				</label>
				<input
					id='username-input'
					type='text'
					value={username}
					onChange={e => setUsername(e.target.value)}
					placeholder='Enter your username'
					className='w-full p-2 rounded-lg border-2 border-circles-dark-blue mb-1'
					required
				/>
				<p className='text-circles-light opacity-70 text-xs'>Username can only contain letters, numbers, underscores, and hyphens</p>
			</div>
			{/* Email */}
			<div className='w-full mb-4'>
				{' '}
				<label
					htmlFor='email-input'
					className='block font-medium mb-1'
				>
					Email
				</label>
				<input
					id='email-input'
					type='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='Enter your email'
					className='w-full p-2 rounded-lg border-2 border-circles-dark-blue'
					required
				/>
			</div>
			{/* Bio */}
			<div className='w-full mb-4'>
				{' '}
				<label
					htmlFor='bio-input'
					className='block font-medium mb-1'
				>
					Bio
				</label>
				<textarea
					id='bio-input'
					value={bio}
					onChange={e => setBio(e.target.value)}
					placeholder='Tell us about yourself'
					className='w-full p-2 rounded-lg border-2 border-circles-dark-blue'
					rows={4}
				/>
			</div>{' '}
			{/* Privacy Toggle */}
			<div className='w-full mb-4 flex items-center justify-between'>
				<div>
					<label
						htmlFor='privacy-toggle'
						className='font-medium'
					>
						Private Profile
					</label>
					<p className='text-xs text-gray-600 dark:text-gray-400'>When enabled, only your followers can see your content</p>
				</div>
				<div className='flex items-center'>
					<input
						type='checkbox'
						id='privacy-toggle'
						checked={isProfilePrivate}
						onChange={e => setIsProfilePrivate(e.target.checked)}
						className='toggle toggle-sm toggle-primary'
					/>
				</div>
			</div>
			{/* Save*/}
			<button
				type='submit'
				disabled={isSubmitting}
				className='bg-[#0055FF] text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-[#004BE0] transition-colors'
			>
				{isSubmitting ? 'Saving...' : 'Save'}
			</button>
			{/* Cancel */}
			<button
				type='button'
				onClick={() => router.push('/profile')}
				className='mt-2 bg-[#333333] text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-[#222222] transition-colors'
			>
				Cancel
			</button>
		</form>
	);
}
