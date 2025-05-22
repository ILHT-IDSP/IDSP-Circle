'use client';

import { useEffect, useState } from 'react';
import UserCard from '@/components/search/UserCard';
import { toast } from 'react-hot-toast';

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
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	// Fetch users based on query
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setIsLoading(true);
				const res = await fetch(`/api/users/search?term=${encodeURIComponent(query)}`);
				if (!res.ok) {
					throw new Error('Failed to fetch users');
				}
				const data = await res.json();
				setUsers(data.users || []);
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

		return () => clearTimeout(debounceTimeout);
	}, [query]);

	// Filter users based on query
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
				<div className='bg-circles-light bg-opacity-10 rounded-lg p-6 text-center'>{isLoading ? <p className='text-circles-light'>Loading users...</p> : query.trim() !== '' ? <p className='text-circles-light'>No users found matching &quot;{query}&quot;</p> : <p className='text-circles-light'>Start typing to search for users</p>}</div>
			)}
		</div>
	);
}
