'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Session } from 'next-auth';
import { Pencil } from 'lucide-react';

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
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
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
				}
			} catch (error: unknown) {
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

		setAvatar(URL.createObjectURL(file));

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
		} catch (error: unknown) {
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
				body: JSON.stringify({ name, bio, username }),
			});

			const data = await res.json();
			if (!res.ok) {
				setError(data.error || 'Failed to update profile');
				return;
			}

			if (session?.user) {
				const username = (session.user as ExtendedUser).username;
				if (username) {
					router.push(`/${username}`);
				} else {
					router.push('/profile');
				}
			} else {
				router.push('/profile');
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
				<div className='absolute bottom-0 right-0 bg-black rounded-full p-1 shadow-md'>
					<Pencil
						size={16}
						className='text-white'
					/>
				</div>
			</label>
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
