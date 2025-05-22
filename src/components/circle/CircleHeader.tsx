'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaCog, FaUserPlus, FaUsers } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface CircleDetails {
	id: number;
	name: string;
	avatar: string | null;
	description: string | null;
	isPrivate: boolean;
	createdAt: string;
	membersCount: number;
	isCreator: boolean;
	isMember: boolean;
}

export default function CircleHeader({ circle, session }: { circle: CircleDetails; session: Session | null }) {
	const router = useRouter();
	const [isJoining, setIsJoining] = useState(false);
	const [canInvite, setCanInvite] = useState(false);
	const [canManageRequests, setCanManageRequests] = useState(false);
	const [joinRequestStatus, setJoinRequestStatus] = useState<'none' | 'pending'>('none');

	// Fetch user permissions for this circle
	useEffect(() => {
		if (circle && circle.isMember) {
			const checkPermissions = async () => {
				try {
					const response = await fetch(`/api/circles/${circle.id}/permissions`);
					if (response.ok) {
						const permissions = await response.json();
						setCanInvite(permissions.canInviteMembers);
						// Admin or moderator can manage join requests
						setCanManageRequests(permissions.role === 'ADMIN' || permissions.role === 'MODERATOR');
					}
				} catch (error) {
					console.error('Error fetching permissions:', error);
				}
			};

			checkPermissions();
		}
	}, [circle]);

	// Check for existing join request if the circle is private and user is not a member
	useEffect(() => {
		if (circle && circle.isPrivate && !circle.isMember && session?.user?.id) {
			const checkJoinRequestStatus = async () => {
				try {
					const response = await fetch(`/api/circles/${circle.id}/joinrequests?checkRequestStatus=true`);
					if (response.ok) {
						const data = await response.json();
						setJoinRequestStatus(data.requestSent ? 'pending' : 'none');
					}
				} catch (error) {
					console.error('Error checking join request status:', error);
				}
			};

			checkJoinRequestStatus();
		}
	}, [circle, session]);

	const handleBack = () => {
		router.back();
	};
	const handleJoinLeaveCircle = async () => {
		if (!session) {
			router.push('/auth/login');
			return;
		}

		try {
			setIsJoining(true);
			const action = circle.isMember ? 'leave' : 'join';

			const response = await fetch(`/api/circles/${circle.id}/membership`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ action }),
			});

			if (!response.ok) {
				throw new Error(`Failed to ${action} circle`);
			}

			const data = await response.json();

			// If this was a join request for a private circle, update the UI state
			if (data.action === 'request_sent' || data.action === 'request_already_sent') {
				setJoinRequestStatus('pending');
			}

			router.refresh();
		} catch (error) {
			console.error(`Error ${circle.isMember ? 'leaving' : 'joining'} circle:`, error);
			alert(`Failed to ${circle.isMember ? 'leave' : 'join'} circle. Please try again.`);
		} finally {
			setIsJoining(false);
		}
	};

	return (
		<div className='relative'>
			<div className='absolute top-4 left-4 z-10'>
				<button
					onClick={handleBack}
					className='bg-[var(--foreground)] text-[var(--background)] p-2 rounded-full  hover:opacity-70 hover:cursor-pointer'
				>
					<FaArrowLeft size={18} />
				</button>
			</div>{' '}
			{/* Settings button for creator and admin */}
			{(circle.isCreator || canManageRequests) && (
				<div className='absolute top-4 right-4 z-10'>
					<button
						onClick={() => router.push(`/circle/${circle.id}/settings`)}
						className='bg-[var(--foreground)] p-2 rounded-full text-[var(--background)] hover:opacity-70 hover:cursor-pointer'
					>
						<FaCog size={18} />
					</button>
				</div>
			)}
			<div className='flex flex-col items-center pt-8 pb-4 px-4'>
				<div className='w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-circles-dark-blue'>
					<Image
						src={circle.avatar || '/images/circles/default.svg'}
						alt={circle.name}
						width={112}
						height={112}
						className='object-cover w-full h-full'
					/>
				</div>

				<h1 className='text-2xl font-bold mb-1'>{circle.name}</h1>

				{circle.description && <p className='text-sm text-gray-400 text-center mb-3 max-w-md'>{circle.description}</p>}

				<div className='flex items-center mb-4'>
					<div className='text-sm text-gray-400'>
						{circle.isPrivate ? 'Private Circle' : 'Public Circle'} • {circle.membersCount} members
					</div>
				</div>

				<div className='flex space-x-3'>
					{/* Show appropriate button based on status */}
					{!circle.isCreator && (
						<>
							{circle.isPrivate && joinRequestStatus === 'pending' ? (
								<button
									disabled={true}
									className='px-6 py-2 rounded-lg text-sm font-medium bg-gray-500 text-white cursor-not-allowed'
								>
									Request Pending
								</button>
							) : (
								<button
									onClick={handleJoinLeaveCircle}
									disabled={isJoining}
									className={`px-6 py-2 rounded-lg hover:cursor-pointer text-sm font-medium ${circle.isMember ? 'bg-gray-700 text-white hover:bg-red-700' : 'bg-circles-dark-blue text-white hover:bg-blue-700'} transition-colors`}
								>
									{isJoining ? 'Processing...' : circle.isMember ? 'Leave Circle' : circle.isPrivate ? 'Request to Join' : 'Join Circle'}
								</button>
							)}
						</>
					)}

					{/* Invite button for members with permission */}
					{circle.isMember && canInvite && (
						<button
							onClick={() => router.push(`/circle/${circle.id}/invite`)}
							className='flex items-center px-6 py-2 rounded-lg bg-[var(--circles-dark-blue)] text-white hover:bg-blue-700 transition-all hover:cursor-pointer'
						>
							<FaUserPlus
								className='mr-2'
								size={14}
							/>
							<span className='text-sm font-medium'>Invite</span>
						</button>
					)}

					{/* Join requests button for admins/moderators */}
					{circle.isMember && canManageRequests && circle.isPrivate && (
						<button
							onClick={() => router.push(`/circle/${circle.id}/joinrequests`)}
							className='flex items-center px-6 py-2 rounded-lg bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--background)] transition-all hover:cursor-pointer'
						>
							<FaUsers
								className='mr-2'
								size={14}
							/>
							<span className='text-sm font-medium'>Join Requests</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
