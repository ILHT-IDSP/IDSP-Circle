import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { redirect } from 'next/navigation';
import Cropper from 'react-easy-crop';
import { createCroppedImage } from '../user_registration/add_profilepicture/cropUtils';
import { toast } from 'react-hot-toast';

// Helper function to upload the cropped image to Cloudinary
const uploadCroppedImage = async (blob: Blob): Promise<string> => {
	try {
		const formData = new FormData();
		formData.append('file', blob);

		// Use the existing upload API endpoint
		const response = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			throw new Error('Failed to upload cropped image');
		}

		const data = await response.json();
		return data.url;
	} catch (error) {
		console.error('Error uploading cropped image:', error);
		throw error;
	}
};

interface Photo {
	id: number;
	url: string;
	description: string | null;
	createdAt: string;
}

interface EditAlbumModalProps {
	album: {
		id: number;
		title: string;
		description: string | null;
		coverImage: string | null;
		isPrivate: boolean;
	};
	isOpen: boolean;
	onClose: () => void;
	onUpdate: (updatedAlbum: any) => void;
	photos?: Photo[];
}

const EditAlbumModal: React.FC<EditAlbumModalProps> = ({ album, isOpen, onClose, onUpdate, photos = [] }) => {
	const [title, setTitle] = useState(album.title);
	const [description, setDescription] = useState(album.description || '');
	const [isPrivate, setIsPrivate] = useState(album.isPrivate);
	const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(album.coverImage);
	const [selectedCoverImageDisplay, setSelectedCoverImageDisplay] = useState<string | null>(album.coverImage);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [albumPhotos, setAlbumPhotos] = useState<Photo[]>([]);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [showCropper, setShowCropper] = useState(false);
	const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

	// Prevent body scrolling when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && photos.length === 0) {
			fetch(`/api/albums/${album.id}/photos`)
				.then(response => response.json())
				.then(data => {
					setAlbumPhotos(data.photos);
				})
				.catch(error => {
					console.error('Error fetching album photos:', error);
					setError('Failed to load album photos');
				});
		} else {
			setAlbumPhotos(photos);
		}
	}, [isOpen, album.id, photos]);
	// Effect to update the display URL when selectedCoverImage changes
	useEffect(() => {
		if (selectedCoverImage) {
			// Check if the selectedCoverImage is a JSON string containing crop parameters
			if (typeof selectedCoverImage === 'string' && selectedCoverImage.startsWith('{')) {
				try {
					// Parse the JSON string
					const coverImageData = JSON.parse(selectedCoverImage);

					// Use the original URL for display
					setSelectedCoverImageDisplay(coverImageData.originalUrl);
				} catch (parseError) {
					console.error('Error parsing cover image data:', parseError);
					// If there's an error parsing, use the selectedCoverImage as is
					setSelectedCoverImageDisplay(selectedCoverImage);
				}
			} else {
				// If it's just a regular URL, use it directly
				setSelectedCoverImageDisplay(selectedCoverImage);
			}
		} else {
			setSelectedCoverImageDisplay(null);
		}
	}, [selectedCoverImage]);

	if (!isOpen) return null;
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			// No special handling needed now since we're already uploading the cropped image
			// and storing its URL directly in selectedCoverImage

			// Update the album with the cover image URL
			const response = await fetch(`/api/albums/${album.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					description: description || null,
					coverImage: selectedCoverImage,
					isPrivate,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to update album');
			}

			const updatedAlbum = await response.json();
			onUpdate(updatedAlbum);
			onClose();
		} catch (err) {
			console.error('Error updating album:', err);
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteButton = () => {
		setShowDeleteConfirm(true);
	};

	const handleCancelDelete = () => {
		setShowDeleteConfirm(false);
	};

	const handleConfirmDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault();

			const response = await fetch(`/api/albums/delete/${album.id}`, {
				headers: { 'content-type': 'application/json' },
				method: 'POST',
				body: JSON.stringify({ albumId: album.id }),
			});
			if (!response.ok) throw new Error('Failed to delete album.');

			redirect('/');
			setShowDeleteConfirm(false);
		} catch (err) {
			redirect('/');
		}
	};

	const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};
	const handleOpenCropper = (imageUrl: string) => {
		setCropImageUrl(imageUrl);
		setShowCropper(true);
		// Reset crop and zoom when opening cropper
		setCrop({ x: 0, y: 0 });
		setZoom(1);
		setCroppedAreaPixels(null);
	};

	const handleCancelCrop = () => {
		setShowCropper(false);
		setCropImageUrl(null);
		setCrop({ x: 0, y: 0 });
		setZoom(1);
	};
	const handleApplyCrop = async () => {
		if (!cropImageUrl || !croppedAreaPixels) return;

		try {
			setIsLoading(true);
			setError('');

			// Create a cropped image blob
			const croppedImageBlob = await createCroppedImage(cropImageUrl, croppedAreaPixels);

			// Upload the cropped image to Cloudinary
			const croppedImageUrl = await uploadCroppedImage(croppedImageBlob);
			// Set the cropped image URL directly as the selected cover image
			setSelectedCoverImage(croppedImageUrl);
			setSelectedCoverImageDisplay(croppedImageUrl);

			// Show success toast
			toast.success('Image cropped and uploaded successfully');

			// Close the cropper
			setShowCropper(false);
			setCropImageUrl(null);
		} catch (error) {
			console.error('Error processing cropped image:', error);
			setError('Failed to process cropped image. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div
			className='fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50 p-4 overflow-y-auto'
			onClick={e => {
				// Close when clicking outside the modal, but only if the cropper is not shown
				if (e.target === e.currentTarget && !isLoading && !showCropper) onClose();
			}}
		>
			<div
				className='bg-[var(--background)] rounded-xl w-full max-w-2xl my-8 shadow-xl'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex justify-between items-center p-4 border-b border-[var(--foreground)] border-opacity-20'>
					<h2 className='text-xl font-semibold'>Edit Album</h2>
					<button
						onClick={onClose}
						disabled={isLoading}
						className='text-[var(--foreground)] opacity-60 hover:opacity-100'
						aria-label='Close'
					>
						<FaTimes />
					</button>
				</div>{' '}
				<div className='p-6 max-h-[70vh] overflow-y-auto'>
					{error && <div className='mb-4 text-red-500 text-sm'>{error}</div>}

					<form onSubmit={handleSubmit}>
						<div className='mb-4'>
							<label className='block text-sm font-medium text-[var(--foreground)] mb-1'>Title</label>
							<input
								type='text'
								value={title}
								onChange={e => setTitle(e.target.value)}
								className='w-full px-3 py-2 border border-[var(--foreground)] border-opacity-20 rounded-md bg-[var(--background)]'
								required
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-sm font-medium text-[var(--foreground)] mb-1'>Description</label>
							<textarea
								value={description}
								onChange={e => setDescription(e.target.value)}
								className='w-full px-3 py-2 border border-[var(--foreground)] border-opacity-20 rounded-md bg-[var(--background)]'
								rows={4}
							/>
						</div>
						<div className='mb-4'>
							<label className='flex items-center'>
								<input
									type='checkbox'
									checked={isPrivate}
									onChange={e => setIsPrivate(e.target.checked)}
									className='mr-2 h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-[var(--foreground)] border-opacity-30 rounded'
								/>
								<span className='text-[var(--foreground)]'>Private Album</span>
							</label>
						</div>{' '}
						{/* Album Cover Selection */}
						<>
							<div className='mb-6'>
								<label className='block text-sm font-medium text-[var(--foreground)] mb-1'>Cover Image</label>
								{albumPhotos.length > 0 ? (
									<div className='grid grid-cols-2 gap-4'>
										{' '}
										{albumPhotos.map(photo => (
											<div
												key={photo.id}
												className={`relative cursor-pointer overflow-hidden rounded-lg transition-all mb-4 ${selectedCoverImageDisplay === photo.url ? 'ring-2 ring-[var(--primary)] scale-[0.98]' : 'hover:opacity-90 hover:scale-[0.99]'}`}
												onClick={() => {
													// If this is a new selection (not already selected), open the cropper automatically
													if (selectedCoverImageDisplay !== photo.url) {
														handleOpenCropper(photo.url);
													} else {
														// If already selected, just set it as the cover image
														setSelectedCoverImage(photo.url);
													}
												}}
											>
												<Image
													src={photo.url}
													alt={photo.description || `Photo ${photo.id}`}
													width={400}
													height={400}
													className='w-full h-auto rounded-lg'
													style={{ display: 'block' }}
													sizes='(max-width: 640px) 50vw, 33vw'
												/>{' '}
												{selectedCoverImageDisplay === photo.url && (
													<div className='absolute top-2 right-2 flex space-x-2'>
														<div className='bg-[var(--primary)] rounded-full p-1'>
															<svg
																xmlns='http://www.w3.org/2000/svg'
																className='h-5 w-5 text-[var(--background)]'
																fill='none'
																viewBox='0 0 24 24'
																stroke='currentColor'
															>
																<path
																	strokeLinecap='round'
																	strokeLinejoin='round'
																	strokeWidth={2}
																	d='M5 13l4 4L19 7'
																/>
															</svg>
														</div>
														{photo.url !== selectedCoverImage && (
															<button
																onClick={e => {
																	e.stopPropagation();
																	handleOpenCropper(photo.url);
																}}
																className='bg-[var(--background)] bg-opacity-80 rounded-full p-1 hover:bg-opacity-100 transition-all'
																title='Crop image'
															>
																<svg
																	xmlns='http://www.w3.org/2000/svg'
																	className='h-5 w-5 text-[var(--foreground)]'
																	fill='none'
																	viewBox='0 0 24 24'
																	stroke='currentColor'
																>
																	<path
																		strokeLinecap='round'
																		strokeLinejoin='round'
																		strokeWidth={2}
																		d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
																	/>
																</svg>
															</button>
														)}
													</div>
												)}
											</div>
										))}
									</div>
								) : (
									<p className='text-[var(--foreground)] opacity-60 text-center py-8 border rounded border-[var(--foreground)] border-opacity-20'>No photos available to use as cover. Add photos to the album first.</p>
								)}
							</div>{' '}
							<div className='mb-8 mt-8'>
								<h3 className='text-sm font-medium text-[var(--foreground)] mb-2'>Danger Zone</h3>
								<div className='border border-red-500 border-opacity-50 rounded-lg p-4'>
									{showDeleteConfirm ? (
										<div className='flex flex-col items-center'>
											<span className='mb-3 text-[var(--foreground)]'>Are you sure you want to delete this album?</span>
											<div className='flex gap-3'>
												<button
													type='button'
													className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white transition-colors'
													onClick={handleConfirmDelete}
												>
													Delete Album
												</button>
												<button
													type='button'
													className='bg-[var(--foreground)] bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-md transition-colors'
													onClick={handleCancelDelete}
												>
													Cancel
												</button>
											</div>
										</div>
									) : (
										<button
											type='button'
											className='text-red-500 hover:text-red-600 font-medium transition-colors'
											onClick={handleDeleteButton}
										>
											Delete Album
										</button>
									)}
								</div>
							</div>
						</>
						<div className='flex justify-end pt-4 border-t border-[var(--foreground)] border-opacity-20'>
							<button
								type='button'
								onClick={onClose}
								className='px-4 py-2 text-[var(--foreground)] hover:bg-[var(--foreground)] hover:bg-opacity-5 rounded-md mr-2'
								disabled={isLoading}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] rounded-md flex items-center gap-2'
								disabled={isLoading}
							>
								{isLoading ? 'Saving...' : 'Save Changes'}
							</button>
						</div>
					</form>
				</div>
			</div>{' '}
			{/* Image Cropper Modal */}
			{showCropper && cropImageUrl && (
				<div
					className='fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-[100]'
					onClick={e => {
						// Prevent clicks from bubbling up to the parent modal
						e.stopPropagation();
					}}
				>
					<div
						className='bg-[var(--background)] rounded-xl max-w-2xl w-full p-4 flex flex-col'
						onClick={e => e.stopPropagation()}
					>
						<div className='flex justify-between items-center mb-4'>
							<h2 className='text-xl font-semibold'>Crop Cover Image</h2>
							<button
								onClick={handleCancelCrop}
								className='text-[var(--foreground)] opacity-60 hover:opacity-100'
								disabled={isLoading}
							>
								<FaTimes />
							</button>
						</div>

						<div className='text-sm text-[var(--foreground)] opacity-70 mb-4 text-center'>Drag to position and use the slider to zoom. The cover image will be displayed in a 2:3 aspect ratio on album cards.</div>

						<div className='relative w-full h-72 mb-6 bg-[var(--foreground)] bg-opacity-5 rounded-lg overflow-hidden'>
							<Cropper
								image={cropImageUrl}
								crop={crop}
								zoom={zoom}
								aspect={2 / 3} // 2:3 aspect ratio for album covers
								showGrid={true}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={handleCropComplete}
								objectFit='contain'
								style={{
									containerStyle: {
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										overflow: 'hidden',
										userSelect: 'none',
										touchAction: 'none',
										cursor: 'move',
									},
									mediaStyle: {
										maxWidth: '100%',
										maxHeight: '100%',
										margin: 'auto',
										position: 'absolute',
										top: 0,
										bottom: 0,
										left: 0,
										right: 0,
										willChange: 'transform',
									},
									cropAreaStyle: {
										position: 'absolute',
										left: '50%',
										top: '50%',
										transform: 'translate(-50%, -50%)',
										border: '2px solid rgba(255, 255, 255, 0.5)',
										boxSizing: 'border-box',
										boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.7)',
										overflow: 'hidden',
									},
								}}
							/>
						</div>

						<p className='text-xs text-[var(--foreground)] opacity-50 mb-4 text-center'>Pinch to zoom on mobile • Drag to position</p>

						<div className='mb-6'>
							<div className='flex justify-between mb-1'>
								<label
									htmlFor='zoom'
									className='block text-sm font-medium text-[var(--foreground)]'
								>
									Zoom
								</label>
								<span className='text-sm text-[var(--foreground)] opacity-70'>{zoom.toFixed(1)}x</span>
							</div>
							<input
								type='range'
								id='zoom'
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={e => setZoom(Number(e.target.value))}
								className='w-full h-2 bg-[var(--foreground)] bg-opacity-20 rounded-lg appearance-none cursor-pointer'
							/>
						</div>

						<div className='flex justify-end gap-3'>
							<button
								onClick={handleCancelCrop}
								className='px-4 py-2 text-[var(--foreground)] hover:bg-[var(--foreground)] hover:bg-opacity-5 rounded-md'
								disabled={isLoading}
							>
								Cancel
							</button>
							<button
								onClick={handleApplyCrop}
								className='px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] rounded-md flex items-center gap-2'
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<span className='h-4 w-4 rounded-full border-2 border-t-transparent border-[var(--background)] animate-spin'></span>
										<span>Processing...</span>
									</>
								) : (
									'Apply Crop'
								)}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditAlbumModal;
