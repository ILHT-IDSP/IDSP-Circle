'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import CircleUserSearch from './CircleUserSearch';
import DemoNavBar from '../top_nav/DemoNavBar';

interface User {
	id: number;
	username: string;
	name: string | null;
	profileImage: string | null;
	isPrivate?: boolean;
	isInvited?: boolean;
}

interface CircleInvitationProps {
	circleId: number;
}

export default function CircleInvitation({ circleId }: CircleInvitationProps) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<'friends' | 'search'>('friends');
	const [searchTerm, setSearchTerm] = useState('');
	const [friends, setFriends] = useState<User[]>([]);
	const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [invitingUsers, setInvitingUsers] = useState<Record<number, boolean>>({});
	const [inviteResults, setInviteResults] = useState<Record<number, { success: boolean; message: string }>>({});

	useEffect(() => {
		// Filter friends based on search term
		if (friends.length > 0) {
			const filtered = friends.filter(friend => friend.username.toLowerCase().includes(searchTerm.toLowerCase()) || (friend.name && friend.name.toLowerCase().includes(searchTerm.toLowerCase())));
			setFilteredFriends(filtered);
		}
	}, [searchTerm, friends]);
	useEffect(() => {
		const fetchFriends = async () => {
			try {
				setLoading(true);
				const response = await fetch('/api/users/friends', {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({ circleId }), // Include circleId to filter out members
				});

				if (!response.ok) {
					throw new Error('Failed to fetch friends');
				}

				const data = await response.json();
				setFriends(data.data || []);
				setFilteredFriends(data.data || []);
			} catch (err) {
				console.error('Error fetching friends:', err);
				setError('Failed to load friends. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchFriends();
	}, [circleId]);

	const handleInviteUser = async (userId: number) => {
		try {
			// Mark this user as currently being invited
			setInvitingUsers(prev => ({ ...prev, [userId]: true }));

			const response = await fetch(`/api/circles/${circleId}/invite`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ targetUserId: userId }),
			});

			const data = await response.json();

			setInviteResults(prev => ({
				...prev,
				[userId]: {
					success: response.ok,
					message: response.ok ? 'Invitation sent!' : data.error || 'Failed to send invitation',
				},
			}));
		} catch (error) {
			console.error('Error inviting user:', error);
			setInviteResults(prev => ({
				...prev,
				[userId]: {
					success: false,
					message: 'Error sending invitation',
				},
			}));
		} finally {
			// No longer inviting this user
			setInvitingUsers(prev => ({ ...prev, [userId]: false }));

			// Refresh data after a short delay
			setTimeout(() => router.refresh(), 1000);
		}
	};

	const handleUserSelected = (user: User) => {
		handleInviteUser(user.id);
	};

	return (
		<div className='p-4 max-w-lg mx-auto'>
			<div className='flex mb-6 border-b border-[var(--border)]'>
				<button
					onClick={() => setActiveTab('friends')}
					className={`px-4 py-2.5 font-medium transition-colors ${activeTab === 'friends' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'}`}
				>
					Friends
				</button>
				<button
					onClick={() => setActiveTab('search')}
					className={`px-4 py-2.5 font-medium transition-colors ${activeTab === 'search' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'}`}
				>
					Search Users
				</button>
			</div>

			{activeTab === 'friends' ? (
				<>
					<div className='relative mb-6'>
						<FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-secondary)]' />
						<input
							type='text'
							placeholder='Search friends...'
							className='w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</div>

					{loading && (
						<div className='flex flex-col items-center justify-center my-8 space-y-4'>
							<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)]'></div>
							<p className='text-[var(--foreground-secondary)] text-sm'>Loading your friends...</p>
						</div>
					)}

					{error && (
						<div className='flex flex-col items-center justify-center my-8 space-y-4 p-6 bg-[var(--background-secondary)] rounded-lg border border-[var(--border)]'>
							<p className='text-[var(--groovy-red)] mb-2'>{error}</p>
							<button
								onClick={() => window.location.reload()}
								className='px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm hover:bg-[var(--background-secondary)] transition-colors'
							>
								Try Again
							</button>
						</div>
					)}

					{!loading && filteredFriends.length === 0 && <p className='text-center text-[var(--foreground-secondary)] my-4'>No friends found {searchTerm ? `matching "${searchTerm}"` : ''}</p>}

					<div className='space-y-4'>
						{filteredFriends
							.filter(user => !user.isInvited)
							.map(user => (
								<div
									key={user.id}
									className='flex items-center justify-between p-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] hover:shadow-sm transition-all'
								>
									<div className='flex items-center'>
										<div className='relative'>
											<Image
												src={user.profileImage || '/images/default-avatar.png'}
												alt={user.username}
												width={48}
												height={48}
												className='rounded-full object-cover border border-[var(--border)]'
											/>
										</div>
										<div className='ml-3'>
											<p className='font-medium'>{user.name || user.username}</p>
											<p className='text-sm text-[var(--foreground-secondary)]'>@{user.username}</p>
										</div>
									</div>
									<div>
										{inviteResults[user.id] ? (
											<span className={`text-sm ${inviteResults[user.id].success ? 'text-[var(--groovy-green)]' : 'text-[var(--groovy-red)]'}`}>{inviteResults[user.id].message}</span>
										) : user.isInvited ? (
											<button
												disabled
												className='px-4 py-1.5 rounded-lg text-sm font-medium flex items-center 
										bg-[var(--background)] border border-[var(--border)] text-[var(--foreground-secondary)] cursor-not-allowed'
											>
												Invited
											</button>
										) : (
											<button
												onClick={() => handleInviteUser(user.id)}
												disabled={invitingUsers[user.id]}
												className={`px-4 py-1.5 rounded-lg text-sm font-medium flex items-center 
                      ${invitingUsers[user.id] ? 'bg-[var(--background)] border border-[var(--border)] text-[var(--foreground-secondary)] cursor-not-allowed' : 'bg-[var(--primary)] hover:opacity-80 hover:cursor-pointer transition-all text-white'}`}
											>
												{invitingUsers[user.id] ? (
													'Inviting...'
												) : (
													<>
														<FaUserPlus
															className='mr-1.5'
															size={12}
														/>
														Invite
													</>
												)}
											</button>
										)}
									</div>
								</div>
							))}
					</div>

					{/* Section for Already Invited Friends */}
					{filteredFriends.some(user => user.isInvited) && (
						<div className='mt-8'>
							<h3 className='text-lg font-medium mb-2 text-[var(--foreground)]'>Already Invited</h3>
							<div className='space-y-2'>
								{filteredFriends
									.filter(user => user.isInvited)
									.map(user => (
										<div
											key={user.id}
											className='flex items-center justify-between p-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] opacity-75'
										>
											<div className='flex items-center'>
												<div className='relative'>
													<Image
														src={user.profileImage || '/images/default-avatar.png'}
														alt={user.username}
														width={48}
														height={48}
														className='rounded-full object-cover border border-[var(--border)]'
													/>
												</div>
												<div className='ml-3'>
													<p className='font-medium'>{user.name || user.username}</p>
													<p className='text-sm text-[var(--foreground-secondary)]'>@{user.username}</p>
												</div>
											</div>
											<span className='text-[var(--foreground-secondary)] text-sm px-3 py-1 bg-[var(--background)] rounded-lg border border-[var(--border)]'>Invitation pending</span>
										</div>
									))}
							</div>
						</div>
					)}
				</>
			) : (
				<div className='mt-2'>
					<h2 className='text-xl font-medium mb-4'>Find users by username</h2>
					<CircleUserSearch
						onUserSelected={handleUserSelected}
						circleId={circleId}
					/>

					<div className='mt-8'>
						<h3 className='text-lg font-medium mb-2 text-[var(--foreground)]'>Sent invitations</h3>
						{Object.keys(inviteResults).length > 0 ? (
							<div className='space-y-2'>
								{Object.entries(inviteResults).map(([userId, result]) => {
									const user = [...friends].find(u => u.id === parseInt(userId));
									if (!user) return null;

									return (
										<div
											key={userId}
											className='flex items-center justify-between p-3 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] hover:shadow-sm transition-all'
										>
											<div className='flex items-center'>
												<div className='relative'>
													<Image
														src={user.profileImage || '/images/default-avatar.png'}
														alt={user.username}
														width={32}
														height={32}
														className='rounded-full object-cover border border-[var(--border)]'
													/>
												</div>
												<span className='ml-3 font-medium'>{user.name || '@' + user.username}</span>
											</div>
											<span className={result.success ? 'text-[var(--groovy-green)]' : 'text-[var(--groovy-red)]'}>{result.message}</span>
										</div>
									);
								})}
							</div>
						) : (
							<p className='text-[var(--foreground-secondary)] text-sm bg-[var(--background-secondary)] p-4 rounded-lg border border-[var(--border)]'>No invitations sent yet</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
