import Image from 'next/image';
import { IFormDataProps } from '../register_types';

import SkipButton from './skip_button';
import { useRef, useState } from 'react';

export default function AddProfilePicture({ formData, setFormData, onNext }: IFormDataProps & { onNext: () => void }) {
	const [preview, setPreview] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [uploadLoading, setUploadLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = async (file: File) => {
		if (file) {
			setUploadLoading(true);
			setPreview(URL.createObjectURL(file));
			
			const uploadData = new FormData();
			uploadData.append('file', file);
			
			try {
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
			} catch (error) {
				console.error('Error uploading image:', error);
			} finally {
				setUploadLoading(false);
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			handleFileUpload(file);
		}
	};

	const handleSkip = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setFormData(prev => ({ ...prev, profileImage: '/images/default-avatar.png' }));
		onNext();
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		
		const file = e.dataTransfer?.files?.[0];
		if (file && file.type.startsWith('image/')) {
			handleFileUpload(file);
		}
	};

	return (
		<>
			<div>
				<div 
					className={`flex flex-col items-center ${isDragging ? 'bg-blue-100' : ''} transition-colors duration-200 p-4 rounded-lg border-2 ${isDragging ? 'border-blue-500 border-dashed' : 'border-transparent'}`} 
					id='profile-picture-container'
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<div className="mb-4 relative">
						<Image
							src={preview || formData.profileImage || '/images/default-avatar.png'}
							width={150}
							height={150}
							alt='profile picture preview'
							className="rounded-full object-cover border-2 border-gray-200"
						/>
						{uploadLoading && (
							<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
								<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
							</div>
						)}
					</div>
					
					<p className="text-gray-500 mb-4 text-center">
						{isDragging ? 'Drop your image here' : 'Drag and drop your image here, or click to select'}
					</p>
					
					<input
						type='file'
						accept='image/*'
						onChange={handleChange}
						ref={inputRef}
						style={{ display: 'none' }}
					/>
					<button
						type='button'
						className='bg-blue-600 text-2xl text-white text-center rounded-full p-2 m-au w-full max-w-full transition-colors hover:bg-blue-700'
						onClick={() => inputRef.current?.click()}
						disabled={uploadLoading}
					>
						{uploadLoading ? 'Uploading...' : 'Add Picture'}
					</button>
					
					{/* Show Next button only if a Cloudinary profile image is set (not a blob: URL) */}
					{formData.profileImage && formData.profileImage.startsWith('http') && (
						<div className='mt-4 w-full'>
							<button
								type='button'
								className='bg-blue-800 text-2xl text-white text-center rounded-full p-3 m-au w-full max-w-full transition-colors hover:bg-blue-900'
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
