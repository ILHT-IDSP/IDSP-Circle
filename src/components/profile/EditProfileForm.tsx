'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Session } from 'next-auth';

// interface User {
//     name: string;
//     email: string;
//     image: string;
// }
export default function EditProfileForm({ session }: { session: Session | null }) {
	const [name, setName] = useState(session?.user.name ?? '');
	const [email, setEmail] = useState(session?.user.email ?? '');
	const [avatar, setAvatar] = useState(session?.user.image ?? '');
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setAvatar(URL.createObjectURL(file));

		const uploadData = new FormData();
		uploadData.append('file', file);

		const res = await fetch('/api/upload', {
			method: 'POST',
			body: uploadData,
		});

		const data = await res.json();
		if (data.url) setAvatar(data.url);
		else setError('failed to upload image')
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name.trim() || !email.trim() || !avatar.trim()) {
			setError('All fields are required.');
			return;
		}
		setError(null);

		const res = await fetch('/api/editProfile', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, avatar }),
		});

		if (res.ok) router.push('/profile');
		else {
			const data = await res.json();
			setError(data.error || 'Failed to update profile');
		}

		// back to profile
		router.push('/profile');
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center p-4 bg-circles-light rounded-2xl shadow-lg'
		>
			{error && <div className='text-red-600 mb-2'>{error}</div>}
			{/* Profile Pic*/}
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
