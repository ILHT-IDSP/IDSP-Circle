'use client';

import { useEffect, useState } from 'react';
import UserCard from '@/components/search/UserCard';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface User {
	id: number;
	name: string;
	username: string;
	profileImage?: string;
	isFollowing?: boolean;
}

export default function SearchResults() {	const [query, setQuery] = useState('');
	const [users, setUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showAllUsers, setShowAllUsers] = useState(true); // Default to showing all users
	// Load initial users or fetch users based on query
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setIsLoading(true);
				// If showing all users or there's a search query
				const endpoint = showAllUsers || query.trim() !== '' 
					? `/api/users/search?term=${encodeURIComponent(query)}`
					: '/api/users?limit=20'; // Fetch initial users with limit
					
				const res = await fetch(endpoint);
				if (!res.ok) {
					throw new Error('Failed to fetch users');
				}
				
				const data = await res.json();
				// Handle different response formats
				if (Array.isArray(data)) {
					setUsers(data);
				} else {
					setUsers(data.users || []);
				}
			} catch (error) {
				console.error('Error fetching users:', error);
				toast.error('Failed to load users');
			} finally {
				setIsLoading(false);
			}
		};

		// Debounce the search query
		const debounceTimeout = setTimeout(() => {
			fetchUsers();
		}, 300);

		const handleRefresh = () => {
			fetchUsers();
		};
		window.addEventListener('refreshUsers', handleRefresh);

		return () => {
			clearTimeout(debounceTimeout);
			window.removeEventListener('refreshUsers', handleRefresh);
		};
	}, [query, showAllUsers]);

	useEffect(() => {
		if (query.trim() === '') {
			setFilteredUsers(users);
		} else {
			const lowercasedQuery = query.toLowerCase();
			const filtered = users.filter(user => (user.name && user.name.toLowerCase().includes(lowercasedQuery)) || user.username.toLowerCase().includes(lowercasedQuery));
			setFilteredUsers(filtered);
		}
	}, [query, users]);
	return (
		<div>
			<div className='relative mb-6'>
				<input
					type='text'
					placeholder='Search for users...'
					value={query}
					onChange={e => setQuery(e.target.value)}
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
				<button
					onClick={() => setShowAllUsers(!showAllUsers)}
					className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
						showAllUsers 
							? 'bg-circles-dark-blue text-white' 
							: 'bg-circles-light bg-opacity-20 text-circles-light'
					}`}
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
				<div className='bg-circles-light bg-opacity-10 rounded-lg p-6 text-center'>
					{isLoading ? (
						<p className='text-circles-light'>Loading users...</p>
					) : query.trim() !== '' ? (
						<p className='text-circles-light'>No users found matching &quot;{query}&quot;</p>
					) : (
						<p className='text-circles-light'>
							{showAllUsers 
								? 'No users found. Be the first to join!' 
								: 'Click "Show All Users" to see everyone or start typing to search'}
						</p>
					)}
				</div>
			)}
		</div>
	);
}
