import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [albumPhotos, setAlbumPhotos] = useState<Photo[]>([]);
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

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
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

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100 p-4'>
			<div className='bg-white dark:bg-gray-800 rounded-lg w-full max-w-xl overflow-hidden'>
				<div className='p-6'>
					<h3 className='text-xl font-semibold mb-4 dark:text-white'>Edit Album</h3>

					{error && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>{error}</div>}

					<form onSubmit={handleSubmit}>
						<div className='mb-4'>
							<label className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'>Title</label>
							<input
								type='text'
								value={title}
								onChange={e => setTitle(e.target.value)}
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								required
							/>
						</div>

						<div className='mb-4'>
							<label className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'>Description</label>
							<textarea
								value={description}
								onChange={e => setDescription(e.target.value)}
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								rows={4}
							/>
						</div>
						<div className='mb-4'>
							<label className='flex items-center'>
								<input
									type='checkbox'
									checked={isPrivate}
									onChange={e => setIsPrivate(e.target.checked)}
									className='mr-2'
								/>
								<span className='text-gray-700 dark:text-gray-300'>Private Album</span>
							</label>
						</div>

						{/* Album Cover Selection */}
						<div className='mb-4'>
							<label className='block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2'>Cover Image</label>
							{albumPhotos.length > 0 ? (
								<div className='columns-2 gap-2 overflow-y-auto p-2 border rounded'>
									{albumPhotos.map(photo => (
										<div
											key={photo.id}
											className={`relative cursor-pointer mb-2 overflow-hidden ${selectedCoverImage === photo.url ? 'ring-2 ring-blue-500' : ''}`}
											onClick={() => setSelectedCoverImage(photo.url)}
										>
											<Image
												src={photo.url}
												alt={photo.description || `Photo ${photo.id}`}
												width={200}
												height={200}
												className='w-full h-auto border-[white]'
												style={{ display: 'block' }}
												sizes='(max-width: 640px) 50vw, 33vw'
											/>
										</div>
									))}
								</div>
							) : (
								<p className='text-gray-500'>No photos available to use as cover. Add photos to the album first.</p>
							)}
						</div>

						<div className='flex justify-end'>
							<button
								type='button'
								onClick={onClose}
								className='bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400'
								disabled={isLoading}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
								disabled={isLoading}
							>
								{isLoading ? 'Saving...' : 'Save Changes'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditAlbumModal;
