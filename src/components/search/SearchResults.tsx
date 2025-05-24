'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import UserCard from '@/components/search/UserCard';
import { toast } from 'react-hot-toast';
import { PerformanceMonitor, globalCache } from '@/lib/performance';

interface User {
	id: number;
	name: string;
	username: string;
	profileImage?: string;
	isFollowing?: boolean;
}

export default function SearchResults() {
	const [query, setQuery] = useState('');
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showAllUsers, setShowAllUsers] = useState(true);
	const debounceRef = useRef<NodeJS.Timeout | null>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	const fetchUsers = useCallback(async (searchQuery: string, showAll: boolean) => {
		// Generate cache key
		const cacheKey = `users-${searchQuery}-${showAll}`;

		// Check cache first
		const cachedData = globalCache.get(cacheKey);
		if (cachedData) {
			setUsers(cachedData as User[]);
			return;
		}

		// Cancel previous request
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		abortControllerRef.current = new AbortController();

		try {
			setIsLoading(true);
			const endpoint = showAll || searchQuery.trim() !== '' ? `/api/users/search?term=${encodeURIComponent(searchQuery)}` : '/api/users?limit=20';

			const userData = await PerformanceMonitor.measureAsync(`fetch-users-${searchQuery}`, async () => {
				const res = await fetch(endpoint, {
					signal: abortControllerRef.current!.signal,
				});

				if (!res.ok) {
					throw new Error('Failed to fetch users');
				}

				const data = await res.json();
				return Array.isArray(data) ? data : data.users || [];
			});

			setUsers(userData);
			// Cache the results for 2 minutes
			globalCache.set(cacheKey, userData, 2 * 60 * 1000);
		} catch (error: any) {
			if (error.name !== 'AbortError') {
				console.error('Error fetching users:', error);
				toast.error('Failed to load users');
			}
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Debounced search effect
	useEffect(() => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(() => {
			fetchUsers(query, showAllUsers);
		}, 300);

		return () => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
			}
		};
	}, [query, showAllUsers, fetchUsers]);

	// Cleanup on unmount
	useEffect(() => {
		const handleRefresh = () => {
			fetchUsers(query, showAllUsers);
		};
		window.addEventListener('refreshUsers', handleRefresh);

		return () => {
			window.removeEventListener('refreshUsers', handleRefresh);
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, [fetchUsers, query, showAllUsers]);
	// Filtered users using useMemo for performance
	const filteredUsers = useMemo(() => {
		if (query.trim() === '') {
			return users;
		}
		const lowercasedQuery = query.toLowerCase();
		return users.filter(user => (user.name && user.name.toLowerCase().includes(lowercasedQuery)) || user.username.toLowerCase().includes(lowercasedQuery));
	}, [query, users]);

	const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	}, []);

	const toggleShowAllUsers = useCallback(() => {
		setShowAllUsers(prev => !prev);
	}, []);
	return (
		<div>
			<div className='relative mb-6'>
				{' '}
				<input
					type='text'
					placeholder='Search for users...'
					value={query}
					onChange={handleQueryChange}
					className='w-full p-3 pl-4 pr-10 rounded-lg bg-circles-light text-circles-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-circles-dark-blue'
				/>
				{isLoading && (
					<div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
						<div className='h-5 w-5 border-t-2 border-circles-dark-blue border-solid rounded-full animate-spin'></div>
					</div>
				)}
			</div>

			{/* Toggle button for showing all users */}
			<div className='mb-4 flex items-center justify-between'>
				{' '}
				<button
					onClick={toggleShowAllUsers}
					className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${showAllUsers ? 'bg-circles-dark-blue text-white' : 'bg-circles-light bg-opacity-20 text-circles-light'}`}
				>
					{showAllUsers ? 'Showing All Users' : 'Show All Users'}
				</button>
			</div>

			{filteredUsers.length > 0 ? (
				<div className='space-y-4'>
					{filteredUsers.map(user => (
						<UserCard
							key={user.id}
							user={user}
						/>
					))}
				</div>
			) : (
				<div className='bg-circles-light bg-opacity-10 rounded-lg p-6 text-center'>{isLoading ? <p className='text-circles-light'>Loading users...</p> : query.trim() !== '' ? <p className='text-circles-light'>No users found matching &quot;{query}&quot;</p> : <p className='text-circles-light'>{showAllUsers ? 'No users found. Be the first to join!' : 'Click "Show All Users" to see everyone or start typing to search'}</p>}</div>
			)}
		</div>
	);
}
