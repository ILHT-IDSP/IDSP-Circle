'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Session } from 'next-auth';

interface UserProfile {
	name?: string | null;
	email?: string | null;
	bio?: string | null;
	profileImage?: string | null;
	username?: string;
}

export default function EditProfileForm({ session }: { session: Session | null }) {
	const [name, setName] = useState(session?.user?.name || '');
	const [email, setEmail] = useState(session?.user?.email || '');
	const [bio, setBio] = useState('');
	const [avatar, setAvatar] = useState(session?.user?.image || '');
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	// Fetch user profile data including bio
	useEffect(() => {
		const fetchUserProfile = async () => {
			if (!session?.user?.username) {
				setLoading(false);
				return;
			}

			try {
				const res = await fetch(`/api/users/${session.user.username}`);
				if (res.ok) {
					const data = await res.json();
					setUserProfile(data);
					if (data.bio) setBio(data.bio);
				}
			} catch (error) {
				console.error('Error fetching user profile:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserProfile();
	}, [session]);
	const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Create local preview
		setAvatar(URL.createObjectURL(file));

		// Upload to server
		const formData = new FormData();
		formData.append('avatar', file);

		try {
			const response = await fetch('/api/user/avatar', {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();
			if (data.success && data.imageUrl) {
				setAvatar(data.imageUrl);
			} else {
				setError('Failed to upload image');
			}
		} catch (error) {
			console.error('Avatar upload error:', error);
			setError('Failed to upload image');
		}
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name.trim()) {
			setError('Name is required.');
			return;
		}

		setError(null);
		setIsSubmitting(true);

		try {
			const res = await fetch('/api/user/profile', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, bio }),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.error || 'Failed to update profile');
				return;
			}

			// Redirect back to profile page
			if (session?.user?.username) {
				router.push(`/${session.user.username}`);
			} else {
				router.push('/profile');
			}
		} catch (error) {
			setError('An error occurred while updating your profile.');
			console.error('Profile update error:', error);
		} finally {
			setIsSubmitting(false);
		}

		if (res.ok) router.push('/profile');
		else {
			const data = await res.json();
			setError(data.error || 'Failed to update profile');
		}

		router.push('/profile');
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center p-4 bg-circles-light rounded-2xl shadow-lg'
		>
			{error && <div className='text-red-600 mb-2'>{error}</div>}
			<label className='relative cursor-pointer mb-4'>
				<input
					type='file'
					accept='image/*'
					className='hidden'
					onChange={handleAvatarChange}
				/>
				<Image
					src={avatar || '/images/default-avatar.png'}
					alt='Profile'
					width={96}
					height={96}
					className='w-24 h-24 rounded-full object-cover border-4 border-circles-dark-blue'
				/>
				<span className='absolute bottom-0 right-0 bg-circles-dark-blue text-circles-light text-xs rounded-full px-2 py-1'>Change</span>
			</label>

			{/* Username*/}
			<input
				type='text'
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder='Username'
				className='w-full mb-4 p-2 rounded-lg border-2 border-circles-dark-blue'
				required
			/>

			{/* Email*/}
			<input
				type='email'
				value={email}
				onChange={e => setEmail(e.target.value)}
				placeholder='Email'
				className='w-full mb-4 p-2 rounded-lg border-2 border-circles-dark-blue'
				required
			/>

			{/* Save*/}
			<button
				type='submit'
				className='bg-circles-dark-blue text-circles-light font-semibold py-2 px-4 rounded-lg w-full'
			>
				Save
			</button>

			{/* Cancel */}
			<button
				type='button'
				onClick={() => router.push('/profile')}
				className='mt-2 bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg w-full'
			>
				Cancel
			</button>
		</form>
	);
}
