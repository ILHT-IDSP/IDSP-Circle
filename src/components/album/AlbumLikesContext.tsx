'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AlbumLikeStatus {
	liked: boolean;
	likeCount: number;
}

interface AlbumLikesContextType {
	likeStatuses: Record<number, AlbumLikeStatus>;
	toggleLike: (albumId: number) => Promise<void>;
	isLoading: boolean;
}

const AlbumLikesContext = createContext<AlbumLikesContextType | undefined>(undefined);

export function useAlbumLikes() {
	const context = useContext(AlbumLikesContext);
	if (!context) {
		throw new Error('useAlbumLikes must be used within an AlbumLikesProvider');
	}
	return context;
}

interface AlbumLikesProviderProps {
	children: ReactNode;
	albumIds: number[];
}

export function AlbumLikesProvider({ children, albumIds }: AlbumLikesProviderProps) {
	const [likeStatuses, setLikeStatuses] = useState<Record<number, AlbumLikeStatus>>({});
	const [isLoading, setIsLoading] = useState(false);

	// Fetch all like statuses at once when the component mounts
	useEffect(() => {
		const fetchLikeStatuses = async () => {
			if (!albumIds.length) return;

			setIsLoading(true);
			try {
				const response = await fetch('/api/albums/batch-like-status', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ albumIds }),
				});

				if (response.ok) {
					const data = await response.json();
					setLikeStatuses(data);
				} else {
					console.error('Failed to fetch like statuses');
				}
			} catch (error) {
				console.error('Error fetching like statuses:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchLikeStatuses();
	}, [albumIds]);

	// Toggle like status for a single album
	const toggleLike = async (albumId: number) => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/albums/${albumId}/like`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				const data = await response.json();

				// Update the state with the new like status
				setLikeStatuses(prev => ({
					...prev,
					[albumId]: {
						liked: data.liked,
						likeCount: data.liked ? (prev[albumId]?.likeCount || 0) + 1 : Math.max(0, (prev[albumId]?.likeCount || 0) - 1),
					},
				}));
			}
		} catch (error) {
			console.error('Error toggling like:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const value = {
		likeStatuses,
		toggleLike,
		isLoading,
	};

	return <AlbumLikesContext.Provider value={value}>{children}</AlbumLikesContext.Provider>;
}
