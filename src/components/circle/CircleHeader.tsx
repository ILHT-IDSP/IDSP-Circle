'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaCog, FaUserPlus } from 'react-icons/fa';
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
	
	// Fetch user permissions for this circle
	useEffect(() => {
		if (circle && circle.isMember) {
			const checkPermissions = async () => {
				try {
					const response = await fetch(`/api/circles/${circle.id}/permissions`);
					if (response.ok) {
						const permissions = await response.json();
						setCanInvite(permissions.canInviteMembers);
					}
				} catch (error) {
					console.error('Error fetching permissions:', error);
				}
			};
			
			checkPermissions();
		}
	}, [circle]);

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
			</div>

			{circle.isCreator && (
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

				{circle.description && <p className='text-sm text-gray-400 text-center mb-3 max-w-md'>{circle.description}</p>}				<div className='flex items-center mb-4'>
					<div className='text-sm text-gray-400'>
						{circle.isPrivate ? 'Private Circle' : 'Public Circle'} • {circle.membersCount} members
					</div>
				</div>
				
				<div className="flex space-x-3">
					{/* Show leave/join button for non-creators */}
					{!circle.isCreator && (
						<button
							onClick={handleJoinLeaveCircle}
							disabled={isJoining}
							className={`px-6 py-2 rounded-lg hover:cursor-pointer text-sm font-medium ${circle.isMember ? 'bg-gray-700 text-white hover:bg-red-700' : 'bg-circles-dark-blue text-white hover:bg-blue-700'} transition-colors`}
						>
							{isJoining ? 'Processing...' : circle.isMember ? 'Leave Circle' : 'Join Circle'}
						</button>
					)}
					
					{circle.isMember && canInvite && (
						<button
							onClick={() => router.push(`/circle/${circle.id}/invite`)}
							className="flex items-center px-6 py-2 rounded-lg bg-[var(--circles-dark-blue)] text-white hover:bg-blue-700 transition-all hover:cursor-pointer"
						>
							<FaUserPlus className="mr-2" size={14} />
							<span className="text-sm font-medium">Invite</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
