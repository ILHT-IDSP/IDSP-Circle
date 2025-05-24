'use client';

import { useState, useRef, useCallback } from 'react';
import { FaUpload, FaTimes, FaCheck } from 'react-icons/fa';
import OptimizedImage from '../common/OptimizedImage';

interface PhotoBatchUploadProps {
	albumId: number;
	onComplete: () => void;
	onCancel: () => void;
}

interface PhotoToUpload {
	file: File;
	previewUrl: string;
	description: string;
	uploading: boolean;
	uploaded: boolean;
	error?: string;
}

const PhotoBatchUpload: React.FC<PhotoBatchUploadProps> = ({ albumId, onComplete, onCancel }) => {
	const [photos, setPhotos] = useState<PhotoToUpload[]>([]);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'));

		// Create preview URLs and add to photos state
		const newPhotos = fileArray.map(file => ({
			file,
			previewUrl: URL.createObjectURL(file),
			description: '',
			uploading: false,
			uploaded: false,
		}));

		setPhotos(prev => [...prev, ...newPhotos]);

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}, []);

	const handleRemovePhoto = useCallback((index: number) => {
		setPhotos(prev => {
			const updated = [...prev];
			URL.revokeObjectURL(updated[index].previewUrl);
			updated.splice(index, 1);
			return updated;
		});
	}, []);

	const handleDescriptionChange = useCallback((index: number, value: string) => {
		setPhotos(prev => {
			const updated = [...prev];
			updated[index].description = value;
			return updated;
		});
	}, []);
	const handleUpload = async () => {
		if (photos.length === 0 || isUploading) return;

		setIsUploading(true);
		setUploadProgress(0);

		try {
			const totalPhotos = photos.length;
			const uploadedPhotos: Array<{ url: string; description: string | null; albumId: number }> = [];

			for (let i = 0; i < totalPhotos; i++) {
				setPhotos(prev => {
					const updated = [...prev];
					updated[i].uploading = true;
					return updated;
				});

				try {
					const formData = new FormData();
					formData.append('file', photos[i].file);
					formData.append('albumId', albumId.toString());
					if (photos[i].description) {
						formData.append('description', photos[i].description);
					}

					const uploadResponse = await fetch('/api/upload/photo', {
						method: 'POST',
						body: formData,
					});

					if (!uploadResponse.ok) {
						throw new Error(`Failed to upload image ${i + 1}`);
					}

					const photoData = await uploadResponse.json();

					uploadedPhotos.push({
						url: photoData.url,
						description: photos[i].description || null,
						albumId,
					});

					setPhotos(prev => {
						const updated = [...prev];
						updated[i].uploading = false;
						updated[i].uploaded = true;
						return updated;
					});
				} catch (error) {
					setPhotos(prev => {
						const updated = [...prev];
						updated[i].uploading = false;
						updated[i].error = error instanceof Error ? error.message : 'Upload failed';
						return updated;
					});

					console.error(`Error uploading photo ${i + 1}:`, error);
				}

				setUploadProgress(Math.round(((i + 1) / totalPhotos) * 100));
			}

			// All uploads completed - update the album with the new photos data
			// This step is optional since we're already adding photos to the album in the upload endpoint
			if (uploadedPhotos.length > 0) {
				// No need to make an additional API call as we're already associating photos with albums in the upload endpoint
				console.log(`Successfully uploaded ${uploadedPhotos.length} photos to the album`);

				// Success! Let the parent component know we're done
				onComplete();
			}
		} catch (error) {
			console.error('Error during batch upload:', error);
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className='p-8'>
			<h2 className='text-xl font-semibold mb-4'>Add Photos to Album</h2>{' '}
			<div
				onClick={() => !isUploading && fileInputRef.current?.click()}
				className={`border-2 border-dashed border-[var(--foreground)] border-opacity-20 rounded-lg p-6 mb-4 flex flex-col items-center justify-center cursor-pointer hover:border-opacity-40 transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
			>
				<FaUpload className='text-3xl mb-2' />
				<p className='mb-1'>Click to select photos</p>
				<p className='text-sm opacity-70'>JPG, PNG, or GIF (max 5MB each)</p>
				<input
					ref={fileInputRef}
					type='file'
					accept='image/*'
					multiple
					onChange={handleFileSelect}
					className='hidden'
					disabled={isUploading}
				/>
			</div>
			{photos.length > 0 && (
				<div className='mb-6'>
					<div className='flex justify-between items-center mb-2'>
						<h3 className='font-medium'>Selected Photos ({photos.length})</h3>
						{!isUploading && (
							<button
								type='button'
								onClick={() => setPhotos([])}
								className='text-sm text-[#e8083e]' /* using the --groovy-red variable color */
							>
								Remove All
							</button>
						)}
					</div>

					<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
						{photos.map((photo, index) => (
							<div
								key={index}
								className='relative'
							>
								<div className='relative aspect-square rounded-lg overflow-hidden border border-[var(--foreground)] border-opacity-30'>
									{' '}
									<OptimizedImage
										src={photo.previewUrl}
										alt={`Preview ${index + 1}`}
										width={300}
										height={300}
										className='object-cover w-full h-full'
									/>
									{/* Upload status overlay */}{' '}
									{photo.uploading && (
										<div className='absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center'>
											<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white'></div>
										</div>
									)}
									{photo.uploaded && (
										<div className='absolute inset-0 bg-green-500 bg-opacity-30 flex items-center justify-center'>
											<div className='bg-green-500 rounded-full p-2'>
												<FaCheck className='text-white' />
											</div>
										</div>
									)}
									{photo.error && (
										<div className='absolute inset-0 bg-red-500 bg-opacity-30 flex items-center justify-center'>
											<p className='text-[var(--background)] text-sm bg-[rgba(0,0,0,0.5)] p-1 rounded'>Failed</p>
										</div>
									)}
								</div>{' '}
								{!isUploading && (
									<button
										type='button'
										onClick={() => handleRemovePhoto(index)}
										className='absolute top-1 right-1 bg-[rgba(0,0,0,0.6)] rounded-full p-1 text-[var(--background)] hover:bg-[rgba(0,0,0,0.8)]'
										aria-label='Remove photo'
									>
										<FaTimes size={14} />
									</button>
								)}
								<input
									type='text'
									placeholder='Add description'
									value={photo.description}
									onChange={e => handleDescriptionChange(index, e.target.value)}
									className='w-full mt-1 px-2 py-1 text-sm bg-transparent border border-[var(--foreground)] border-opacity-30 rounded'
									disabled={isUploading}
								/>
							</div>
						))}
					</div>
				</div>
			)}
			{/* Upload progress */}
			{isUploading && (
				<div className='mb-6'>
					<div className='flex justify-between text-sm mb-1'>
						<span>Uploading...</span>
						<span>{uploadProgress}%</span>
					</div>{' '}
					<div className='w-full h-2 bg-[var(--foreground)] bg-opacity-20 rounded-full overflow-hidden'>
						<div
							className='h-full bg-[var(--primary)]'
							style={{ width: `${uploadProgress}%` }}
						></div>
					</div>
				</div>
			)}
			{/* Action buttons */}
			<div className='flex justify-end gap-3 mt-4'>
				<button
					type='button'
					onClick={onCancel}
					disabled={isUploading}
					className={`px-4 py-2 border border-[var(--foreground)] border-opacity-30 rounded-md hover:bg-[var(--foreground)] hover:bg-opacity-10 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
				>
					Cancel
				</button>
				<button
					type='button'
					onClick={handleUpload}
					disabled={photos.length === 0 || isUploading}
					className={`px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] rounded-md transition-colors flex items-center gap-2 ${photos.length === 0 || isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
				>
					{isUploading ? 'Uploading...' : 'Upload Photos'}
				</button>
			</div>
		</div>
	);
};

export default PhotoBatchUpload;
