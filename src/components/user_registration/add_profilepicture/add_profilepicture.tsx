import Image from 'next/image';
import { IFormDataProps } from '../register_types';
import SkipButton from './skip_button';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function AddProfilePicture({ formData, setFormData }: IFormDataProps) {
	const router = useRouter();
	const [preview, setPreview] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Handle file selection and upload to Cloudinary
	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Show preview
			setPreview(URL.createObjectURL(file));

			// Upload to /api/upload
			const uploadData = new FormData();
			uploadData.append('file', file);

			const res = await fetch('/api/upload', {
				method: 'POST',
				body: uploadData,
			});

			const data = await res.json();
			if (data.url) {
				setFormData(prev => ({ ...prev, profileImage: data.url }));
			} else {
				// fallback or error handling
				setFormData(prev => ({ ...prev, profileImage: '' }));
			}
		}
	};

	// Handle skip: use default avatar
	const handleSkip = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const response = await fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				formData: {
					...formData,
					profileImage: '/images/default-avatar.png',
				},
			}),
		});

		if (response.ok) {
			router.push('/auth/login');
		} else {
			console.error('Failure to create user');
		}
	};

	return (
		<>
			<div>
				<div
					className='flex flex-col'
					id='profile-picture-container'
				>
					<Image
						src={preview || formData.profileImage || '/images/default-avatar.png'}
						width={100}
						height={100}
						alt='profile picture preview'
					/>
					<input
						type='file'
						accept='image/*'
						onChange={handleChange}
						ref={inputRef}
						style={{ display: 'none' }}
					/>

					<button
						type='button'
						className='bg-blue-600 text-2xl text-white text-center rounded-full p-2 m-au w-full max-w-full transition-colors'
						onClick={() => inputRef.current?.click()}
					>
						Add Picture
					</button>
					<SkipButton onClick={handleSkip} />
				</div>
			</div>
		</>
	);
}
