'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaEllipsisV, FaCrown, FaShieldAlt, FaUser, FaArrowUp, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface Member {
	id: number;
	username: string;
	name: string | null;
	profileImage: string | null;
	role: string;
}

export default function CircleMembers({ circleId }: { circleId: number }) {
	const { data: session } = useSession();
	const [members, setMembers] = useState<Member[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [userRole, setUserRole] = useState<string | null>(null);
	const [isActionInProgress, setIsActionInProgress] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/circles/${circleId}/members`);

				if (!response.ok) {
					throw new Error('Failed to fetch circle members');
				}

				const data = await response.json();
				// Handle the new response format with 'members' property
				setMembers(data.members || []);

				// Find current user's role in the circle
				if (session?.user?.id) {
					const currentUserId = parseInt(session.user.id);
					const currentUserMember = data.members.find(m => m.id === currentUserId);
					if (currentUserMember) {
						setUserRole(currentUserMember.role);
					}
				}
			} catch (err) {
				console.error('Error fetching circle members:', err);
				setError('Could not load members. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchMembers();
	}, [circleId, session]);

	const handlePromoteMember = async (memberId: number) => {
		if (isActionInProgress) return;

		try {
			setIsActionInProgress(true);
			const response = await fetch(`/api/circles/${circleId}/member/${memberId}/promote`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to promote member');
			}

			const data = await response.json();

			// Update the member's role in the local state
			setMembers(prevMembers => prevMembers.map(member => (member.id === memberId ? { ...member, role: 'MODERATOR' } : member)));

			toast.success('Member promoted to moderator');
		} catch (error) {
			console.error('Error promoting member:', error);
			toast.error(error instanceof Error ? error.message : 'Failed to promote member');
		} finally {
			setIsActionInProgress(false);
		}
	};

	const handleRemoveMember = async (memberId: number) => {
		if (isActionInProgress) return;

		try {
			setIsActionInProgress(true);
			const response = await fetch(`/api/circles/${circleId}/member/${memberId}/remove`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to remove member');
			}

			// Remove the member from the local state
			setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
			toast.success('Member removed from circle');
		} catch (error) {
			console.error('Error removing member:', error);
			toast.error(error instanceof Error ? error.message : 'Failed to remove member');
		} finally {
			setIsActionInProgress(false);
		}
	};

	// Helper function to check if the current user can manage the given member
	const canManageMember = (memberRole: string): boolean => {
		if (!session?.user?.id) return false;

		const currentUserId = parseInt(session.user.id);
		const isAdmin = userRole === 'ADMIN';
		const isModerator = userRole === 'MODERATOR';

		// Admin can manage everyone except themselves
		if (isAdmin) return true;

		// Moderator can only manage regular members
		if (isModerator && memberRole === 'MEMBER') return true;

		return false;
	};
	// Helper function to get the role icon
	const getRoleIcon = (role: string) => {
		switch (role) {
			case 'ADMIN':
				return <FaCrown className='text-amber-500' />;
			case 'MODERATOR':
				return <FaShieldAlt className='text-blue-500' />;
			default:
				return <FaUser className='text-[var(--foreground-secondary)]' />;
		}
	};

	// Helper function to get role color
	const getRoleColor = (role: string) => {
		switch (role) {
			case 'ADMIN':
				return 'text-amber-500';
			case 'MODERATOR':
				return 'text-blue-500';
			default:
				return 'text-[var(--foreground-secondary)]';
		}
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setActiveDropdown(null);
			}
		}

		// Add the event listener with capture phase to ensure it runs before other handlers
		document.addEventListener('mousedown', handleClickOutside, true);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside, true);
		};
	}, []);

	if (loading) {
		return (
			<div className='px-6 py-4'>
				<h2 className='text-lg font-semibold mb-4'>Members</h2>
				<div className='flex flex-col space-y-4'>
					{[...Array(5)].map((_, i) => (
						<div
							key={i}
							className='flex items-center space-x-3 animate-pulse'
						>
							<div className='w-12 h-12 bg-[var(--background-secondary)] rounded-full'></div>
							<div className='flex-1'>
								<div className='h-4 bg-[var(--background-secondary)] rounded w-1/3'></div>
								<div className='h-3 bg-[var(--background-secondary)] rounded w-1/4 mt-2'></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='px-6 py-4'>
				{' '}
				<h2 className='text-lg font-semibold mb-2'>Members</h2>
				<p className='text-red-500 text-sm'>{error}</p>
			</div>
		);
	}

	return (
		<div className='px-6 py-4 pb-24'>
			<h2 className='text-lg font-semibold mb-4'>Members • {members.length}</h2>

			<div className='flex flex-col space-y-4'>
				{members.map(member => {
					const currentUserId = session?.user?.id ? parseInt(session.user.id) : 0;
					const isCurrentUser = member.id === currentUserId;
					const canManage = !isCurrentUser && canManageMember(member.role);

					return (
						<div
							key={member.id}
							className='flex items-center px-4 py-4 border-b border-[var(--border)] hover:bg-[var(--background-secondary)] transition-colors relative'
						>
							<div className='flex items-center'>
								<div className='w-9 h-9 relative rounded-full overflow-hidden mr-3 border border-[var(--border)]'>
									<Image
										src={member.profileImage || '/images/default-avatar.png'}
										alt={member.username}
										fill
										className='object-cover'
									/>
								</div>
								<div className='flex flex-col'>
									<span className='font-medium text-[var(--foreground)]'>{member.username}</span>
									<span className={`text-sm ${getRoleColor(member.role)}`}>{member.role}</span>
								</div>
							</div>

							{canManage && (
								<div
									className='relative ml-auto'
									ref={dropdownRef}
								>
									<button
										onClick={e => {
											e.stopPropagation();
											setActiveDropdown(activeDropdown === member.id ? null : member.id);
										}}
										className={`p-2.5 rounded-full transition-colors duration-150 ${activeDropdown === member.id ? 'bg-[var(--background-secondary)]' : 'hover:bg-[var(--background-secondary)]'}`}
										aria-label='Member options'
									>
										<FaEllipsisV className='text-[var(--foreground-secondary)] text-[20px]' />
									</button>

									{activeDropdown === member.id && (
										<div className='absolute right-0 top-full mt-1 bg-[var(--background)] shadow-lg rounded-md py-2 min-w-[200px] z-50 border border-[var(--border)]'>
											{member.role === 'MEMBER' && userRole === 'ADMIN' && (
												<button
													onClick={e => {
														e.stopPropagation();
														handlePromoteMember(member.id);
														setActiveDropdown(null);
													}}
													disabled={isActionInProgress}
													className='flex w-full items-center px-4 py-3 text-[15px] hover:bg-[var(--background-secondary)] cursor-pointer text-left font-medium'
												>
													<FaArrowUp className='mr-3 text-blue-500 text-[16px]' />
													<span>Promote to Moderator</span>
												</button>
											)}
											<button
												onClick={e => {
													e.stopPropagation();
													handleRemoveMember(member.id);
													setActiveDropdown(null);
												}}
												disabled={isActionInProgress}
												className='flex w-full items-center px-4 py-3 text-[15px] hover:bg-[var(--background-secondary)] cursor-pointer text-red-500 text-left font-medium'
											>
												<FaTimesCircle className='mr-3 text-[16px]' />
												<span>Remove from Circle</span>
											</button>
										</div>
									)}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
