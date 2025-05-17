import Image from 'next/image';
import { useRef, useState } from 'react';

interface IAlbumFormData {
	title: string;
	coverImage: string;
	description: string;
	isPrivate: boolean;
	creatorId: string | undefined;
	circleId: string | null;
	photos: Array<{
		file: File;
		previewUrl: string;
		description: string;
		uploading: boolean;
		uploaded: boolean;
		error?: string;
	}>;
}

interface AlbumAvatarProps {
	coverImage: string;
	setFormData: React.Dispatch<React.SetStateAction<IAlbumFormData>>;
}

export default function AlbumAvatar({ coverImage, setFormData }: AlbumAvatarProps) {
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
				setFormData((prev: IAlbumFormData) => ({
					...prev,
					coverImage: data.url,
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
			{' '}
			<div className='text-center mb-1'>
				<span className='text-sm text-[var(--foreground)] opacity-60'>
					Album Cover <span className='text-[#e8083e]'>*</span>
				</span>
			</div>
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
					required
				/>
				<div className='relative'>
					<Image
						src={preview || coverImage || '/images/albums/default.svg'}
						alt='Album Cover'
						width={200}
						height={200}
						className={`my-4 rounded-lg object-cover border-4 ${preview || coverImage ? 'border-[var(--primary)]' : 'border-[var(--foreground)] border-opacity-30'}`}
						style={{ aspectRatio: '1 / 1' }}
					/>{' '}					{!preview && !coverImage && (
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='text-[var(--foreground)] opacity-60 bg-[rgba(0,0,0,0.3)] px-3 py-1 rounded text-sm'>Click to upload</div>
						</div>
					)}
					{isLoading && (
						<div className='absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] rounded-lg'>
							<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white'></div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
