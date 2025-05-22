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
	// Add overlay ref for blocking interactions when dropdown is open
	const overlayRef = useRef<HTMLDivElement>(null);
	// Add refs for each dropdown menu
	const dropdownMenuRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

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

		// Optimistically update the UI immediately
		setMembers(prevMembers => prevMembers.map(member => 
			(member.id === memberId ? { ...member, role: 'MODERATOR' } : member)
		));
		
		// Close the dropdown right away
		setActiveDropdown(null);
		
		// Show immediate feedback
		const toastId = toast.loading('Promoting member...');
		
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

			// Server confirmed the change
			toast.success('Member promoted to moderator', { id: toastId });
		} catch (error) {
			console.error('Error promoting member:', error);
			
			// Revert the optimistic update
			setMembers(prevMembers => prevMembers.map(member => 
				(member.id === memberId ? { ...member, role: 'MEMBER' } : member)
			));
			
			toast.error(error instanceof Error ? error.message : 'Failed to promote member', { id: toastId });
		} finally {
			setIsActionInProgress(false);
		}
	};
	const handleRemoveMember = async (memberId: number) => {
		if (isActionInProgress) return;

		// Get the member before removing for potential rollback
		const memberToRemove = members.find(m => m.id === memberId);
		if (!memberToRemove) return;

		// Optimistically remove the member from UI
		setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
		
		// Close the dropdown right away
		setActiveDropdown(null);
		
		// Show immediate feedback
		const toastId = toast.loading('Removing member...');
		
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

			// Server confirmed the removal
			toast.success('Member removed from circle', { id: toastId });
		} catch (error) {
			console.error('Error removing member:', error);
			
			// Restore the member in case of error
			setMembers(prevMembers => [...prevMembers, memberToRemove]);
			
			toast.error(error instanceof Error ? error.message : 'Failed to remove member', { id: toastId });
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
	};	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			// Check if the click is outside both the dropdown button and menu
			if (activeDropdown !== null) {
				const isClickInsideDropdownButton = dropdownRef.current && dropdownRef.current.contains(event.target as Node);
				const isClickInsideDropdownMenu = dropdownMenuRefs.current[activeDropdown] && 
					dropdownMenuRefs.current[activeDropdown]?.contains(event.target as Node);
				
				if (!isClickInsideDropdownButton && !isClickInsideDropdownMenu) {
					setActiveDropdown(null);
				}
			}
		}

		// Add event listeners
		if (activeDropdown !== null) {
			// Use capture phase to ensure our handler runs first
			document.addEventListener('mousedown', handleClickOutside, true);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside, true);
		};
	}, [activeDropdown]);

	// Toggle dropdown and manage overlay
	const toggleDropdown = (memberId: number, e: React.MouseEvent) => {
		e.stopPropagation();
		setActiveDropdown(activeDropdown === memberId ? null : memberId);
	};

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
	}	return (
		<div className='px-6 py-4 pb-24 relative'>
			{activeDropdown !== null && (
				<div 
					className="fixed inset-0 bg-black opacity-5 z-40" 
					onClick={() => setActiveDropdown(null)}
					ref={overlayRef}
				/>
			)}
			
			<h2 className='text-lg font-semibold mb-4'>Members • {members.length}</h2>

			<div className='flex flex-col space-y-4'>
				{members.map(member => {
					const currentUserId = session?.user?.id ? parseInt(session.user.id) : 0;
					const isCurrentUser = member.id === currentUserId;
					const canManage = !isCurrentUser && canManageMember(member.role);

					return (						<div
							key={member.id}
							className='flex items-center px-4 py-4 border-b border-[var(--border)] hover:bg-[var(--background-secondary)] transition-colors relative'
						>
							<Link href={`/${member.username}`} className='flex items-center flex-grow'>
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
							</Link>							{canManage && (
								<div
									className='relative ml-auto '
									ref={dropdownRef}
								>
									<button
										onClick={(e) => toggleDropdown(member.id, e)}
										className={`p-2.5 rounded-full transition-colors duration-150 ${activeDropdown === member.id ? 'bg-[var(--background-secondary)]' : 'hover:bg-[var(--background-secondary)]'}`}
										aria-label='Member options'
									>
										<FaEllipsisV className='text-[var(--foreground-secondary)] text-[20px]' />
									</button>									{activeDropdown === member.id && (
										<div 
											className='absolute right-0 top-full mt-1 bg-[var(--background)] shadow-lg rounded-md py-2 min-w-[200px] z-[100] border border-[var(--border)]'
											ref={(el) => { dropdownMenuRefs.current[member.id] = el }}
											onClick={(e) => e.stopPropagation()}
										>
											{member.role === 'MEMBER' && userRole === 'ADMIN' && (
												<button													onClick={e => {
														e.stopPropagation();
														handlePromoteMember(member.id);
														// setActiveDropdown handled in function
													}}
													disabled={isActionInProgress}
													className='flex w-full items-center px-4 py-3 text-[15px] hover:bg-[var(--background-secondary)] cursor-pointer text-left font-medium'
												>
													<FaArrowUp className='mr-3 text-blue-500 text-[16px]' />
													<span>Promote to Moderator</span>
												</button>
											)}
											<button												onClick={e => {
													e.stopPropagation();
													handleRemoveMember(member.id);
													// setActiveDropdown handled in function
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
