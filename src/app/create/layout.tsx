'use client';
import React from 'react';
import { AlbumCreationProvider } from '@/components/create/album/AlbumCreationContext';

export default function CreateLayout({ children }: { children: React.ReactNode }) {
	return <AlbumCreationProvider>{children}</AlbumCreationProvider>;
}
