import Image from 'next/image';
import { useRef, useState } from 'react';
import ImageUploadCropper from '../../common/ImageUploadCropper';

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
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const cropperRef = useRef<HTMLDivElement>(null);

	const handleAvatarClick = () => {
		// Find the hidden input inside the ImageUploadCropper and click it
		const input = cropperRef.current?.querySelector('input');
		if (input) {
			input.click();
		}
	};

	const handleUploadStart = () => {
		setIsLoading(true);
		setError(null);
	};

	const handleUploadComplete = (imageUrl: string) => {
		setFormData((prev: IAlbumFormData) => ({
			...prev,
			coverImage: imageUrl,
		}));
		setIsLoading(false);
	};

	const handleUploadError = (errorMessage: string) => {
		setError(errorMessage);
		setIsLoading(false);
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
				<div
					className='relative'
					ref={cropperRef}
				>
					<Image
						src={coverImage || '/images/albums/default.svg'}
						alt='Album Cover'
						width={200}
						height={200}
						className={`my-4 rounded-lg object-cover border-4 ${coverImage ? 'border-[var(--primary)]' : 'border-[var(--foreground)] border-opacity-30'}`}
						style={{ aspectRatio: '1 / 1' }}
					/>{' '}
					{!coverImage && (
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='text-[var(--foreground)] opacity-60 bg-[rgba(0,0,0,0.3)] px-3 py-1 rounded text-sm'>Click to upload</div>
						</div>
					)}
					{isLoading && (
						<div className='absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] rounded-lg'>
							<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white'></div>
						</div>
					)}
					{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
					<ImageUploadCropper
						onUploadStart={handleUploadStart}
						onUploadComplete={handleUploadComplete}
						onUploadError={handleUploadError}
						uploadEndpoint='/api/upload'
						aspectRatio={1}
					/>
				</div>
			</div>
		</div>
	);
}
