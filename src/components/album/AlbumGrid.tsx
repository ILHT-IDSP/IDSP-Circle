'use client';

import { AlbumLikesProvider } from './AlbumLikesContext';
import { ReactNode } from 'react';

interface AlbumGridProps {
	children: ReactNode;
	albumIds: number[];
}

export default function AlbumGrid({ children, albumIds }: AlbumGridProps) {
	return (
		<AlbumLikesProvider albumIds={albumIds}>
			<div className='grid grid-cols-2 gap-4'>{children}</div>
		</AlbumLikesProvider>
	);
}
