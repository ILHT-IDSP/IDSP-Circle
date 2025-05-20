import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Image from 'next/image';

interface ImageCropperProps {
	imageUrl: string;
	onCropComplete: (croppedAreaPixels: any) => void;
	onCancel: () => void;
	onConfirm: () => void;
	isSubmitting?: boolean;
}

export default function ImageCropper({ imageUrl, onCropComplete, onCancel, onConfirm, isSubmitting = false }: ImageCropperProps) {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleCropComplete = useCallback(
		(croppedArea: any, croppedAreaPixels: any) => {
			setCroppedAreaPixels(croppedAreaPixels);
			onCropComplete(croppedAreaPixels);
		},
		[onCropComplete]
	); // Custom styles for Cropper component that work with both light and dark mode
	const cropperContainerStyle: React.CSSProperties = {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		overflow: 'hidden',
		userSelect: 'none',
		touchAction: 'none',
		cursor: 'move',
	};

	const cropperMediaStyle: React.CSSProperties = {
		maxWidth: '100%',
		maxHeight: '100%',
		margin: 'auto',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		willChange: 'transform',
	};

	// We'll use inline styles for the crop area but make it work with theme
	const cropAreaStyle: React.CSSProperties = {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: '50%',
		border: '2px solid rgba(255, 255, 255, 0.5)',
		boxSizing: 'border-box',
		boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.7)',
		overflow: 'hidden',
	};

	return (
		<div className='fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
			<div className='bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-md shadow-xl'>
				<h3 className='text-lg font-medium mb-2 text-center text-gray-800 dark:text-white'>Crop Your Profile Picture</h3>
				<p className='text-sm text-gray-600 dark:text-gray-300 text-center mb-4'>Drag to position and use the slider to zoom. Your profile picture will be displayed as a circle.</p>{' '}
				<div className='relative w-full h-64 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden'>
					<Cropper
						image={imageUrl}
						crop={crop}
						zoom={zoom}
						aspect={1}
						cropShape='round'
						showGrid={true}
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onCropComplete={handleCropComplete}
						objectFit='contain'
						style={{
							containerStyle: cropperContainerStyle,
							mediaStyle: cropperMediaStyle,
							cropAreaStyle: cropAreaStyle,
						}}
					/>
				</div>
				<p className='text-xs text-gray-500 dark:text-gray-400 mb-4 text-center'>Pinch to zoom on mobile • Drag to position</p>
				<div className='mb-4'>
					<div className='flex justify-between mb-1'>
						<label
							htmlFor='zoom'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300'
						>
							Zoom
						</label>
						<span className='text-sm text-gray-500 dark:text-gray-400'>{zoom.toFixed(1)}x</span>
					</div>
					<input
						type='range'
						id='zoom'
						min={1}
						max={3}
						step={0.1}
						value={zoom}
						onChange={e => setZoom(Number(e.target.value))}
						className='w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400'
					/>
				</div>
				<div className='flex justify-between'>
					<button
						type='button'
						className='bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
						onClick={onCancel}
					>
						Cancel
					</button>
					<button
						type='button'
						className='bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center space-x-2 disabled:opacity-50'
						onClick={() => {
							setIsLoading(true);
							onConfirm();
						}}
						disabled={isLoading || isSubmitting}
					>
						{isLoading || isSubmitting ? (
							<>
								<span className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2'></span>
								<span>Processing...</span>
							</>
						) : (
							<span>Apply</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
