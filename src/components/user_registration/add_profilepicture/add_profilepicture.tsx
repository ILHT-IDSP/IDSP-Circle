import Image from 'next/image';
import { IFormDataProps } from '../register_types';

import SkipButton from './skip_button';
import { useRef, useState } from 'react';

export default function AddProfilePicture({ formData, setFormData, onNext }: IFormDataProps & { onNext: () => void }) {
	const [preview, setPreview] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Handle file selection and upload to Cloudinary
	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
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
				setFormData(prev => ({ ...prev, profileImage: '' }));
			}
		}
	};

	// Handle skip: set default avatar and go to next step
	const handleSkip = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setFormData(prev => ({ ...prev, profileImage: '/images/default-avatar.png' }));
		onNext();
	};

	return (
		<>
			<div>
				<div className='flex flex-col' id='profile-picture-container'>
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
					{/* Show Next button only if a Cloudinary profile image is set (not a blob: URL) */}
					{formData.profileImage && formData.profileImage.startsWith('http') && (
						<div className='mt-4'>
							<button
								type='button'
								className='bg-blue-800 text-2xl text-white text-center rounded-full p-3 m-au w-full max-w-full transition-colors'
								onClick={onNext}
							>
								Next
							</button>
						</div>
					)}
					<SkipButton onClick={handleSkip} />
				</div>
			</div>
		</>
	);
}
