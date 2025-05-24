'use client';

import Image from 'next/image';
import { useState, useCallback, memo } from 'react';

interface OptimizedImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
	fallbackSrc?: string;
	priority?: boolean;
	quality?: number;
	sizes?: string;
	objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
	placeholder?: 'blur' | 'empty';
	blurDataURL?: string;
}

const OptimizedImage = memo(function OptimizedImage({ src, alt, width = 300, height = 300, className = '', fallbackSrc = '/images/default-avatar.png', priority = false, quality = 75, sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw', objectFit = 'cover', placeholder = 'empty', blurDataURL }: OptimizedImageProps) {
	const [imgSrc, setImgSrc] = useState(src);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const handleError = useCallback(() => {
		if (imgSrc !== fallbackSrc) {
			setImgSrc(fallbackSrc);
			setHasError(true);
		}
	}, [imgSrc, fallbackSrc]);

	const handleLoad = useCallback(() => {
		setIsLoading(false);
	}, []);
	return (
		<div
			className={`relative overflow-hidden ${className}`}
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
			{isLoading && !hasError && <div className='absolute inset-0 bg-gray-200 animate-pulse rounded' />}
			<Image
				src={imgSrc}
				alt={alt}
				width={width}
				height={height}
				className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
				style={{ objectFit }}
				onError={handleError}
				onLoad={handleLoad}
				priority={priority}
				quality={quality}
				sizes={sizes}
				placeholder={placeholder}
				blurDataURL={blurDataURL}
			/>
		</div>
	);
});

export default OptimizedImage;
