import Image from 'next/image';
import { useRef, useState } from 'react';
import { ICircleFormData } from './circle_types';

interface CircleAvatarProps {
	avatar: string;
	setFormData: React.Dispatch<React.SetStateAction<ICircleFormData>>;
}

export default function CircleAvatar({ avatar, setFormData }: CircleAvatarProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleAvatarClick = () => {
		fileInputRef.current?.click();
	};

	const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Show preview 
		setPreview(URL.createObjectURL(file));
		setIsLoading(true);

		// Upload to Cloudinary
		try {
			const formData = new FormData();
			formData.append('file', file);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();

			if (data.url) {
				setFormData(prev => ({
					...prev,
					avatar: data.url,
				}));
				console.log('Image uploaded to Cloudinary: ', data.url);
			} else {
				console.error('Failed to upload image');
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-col items-center'>
			<div
				className='relative cursor-pointer'
				onClick={handleAvatarClick}
			>
				<input
					type='file'
					accept='image/*'
					ref={fileInputRef}
					onChange={handleAvatarChange}
					className='hidden'
				/>
				<div className='relative'>
					<Image
						src={preview || avatar || '/images/default-avatar.png'}
						alt='Circle Avatar'
						width={200}
						height={200}
						className='my-8 rounded-full object-cover border-4 border-circles-dark-blue'
						style={{ aspectRatio: '1 / 1' }}
					/>
					{isLoading && (
						<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full'>
							<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white'></div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
