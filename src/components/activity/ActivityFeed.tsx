'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
	id: number;
	type: string;
	user: {
		id: number;
		name: string;
		username: string;
		profileImage?: string;
	};
	content: string;
	createdAt: string;
	circleId?: number;
	circle?: {
		id: number;
		name: string;
	};
	requesterId?: number;
	requester?: {
		id: number;
		username: string;
		name: string | null;
		profileImage: string | null;
	} | null;
}

export default function ActivityFeed() {
	const router = useRouter();
	const [activities, setActivities] = useState<Activity[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [hasFollowRequests, setHasFollowRequests] = useState(false);
	const [hasCircleInvites, setHasCircleInvites] = useState(false);
	const [followRequestsCount, setFollowRequestsCount] = useState(0);
	const [circleInvitesCount, setCircleInvitesCount] = useState(0);
	const [processingIds, setProcessingIds] = useState<number[]>([]);

	// Helper function to extract follower username from content
	const extractFollowerUsername = (content: string) => {
		// Extract the username from parentheses (username)
		const match = content.match(/\(([^)]+)\)/);
		if (match && match[1]) {
			return match[1]; // Return the username from inside the parentheses
		}
		// Fallback to the old method if the parentheses format is not found
		return content.split(' started following')[0].split(' accepted')[0];
	};

	// Extract circle ID from content for join requests
	const extractCircleId = (activity: Activity): number | null => {
		if (activity.circleId) {
			return activity.circleId;
		}

		// Try to parse the hidden ID from the join request format
		if (activity.type === 'circle_join_request') {
			const match = activity.content?.match(/\(requester:(\d+)\)/);
			if (match) {
				// We have the requester ID, but we need the circle ID
				// Since this is attached to the activity, return the circle ID if available
				return activity.circleId || null;
			}
		}

		return null;
	};
	// Clean content by removing the hidden requester ID for display
	const cleanJoinRequestContent = (content: string): string => {
		return content.replace(/\s?\(requester:\d+\)/, '');
	};

	// Extract circle name from content for better display
	const extractCircleName = (content: string): string | null => {
		// For circle join requests - "wants to join your circle "circleName""
		const match = content.match(/your circle "([^"]+)"/);
		if (match && match[1]) {
			return match[1];
		}

		// For 'joined the circle' notifications - "joined the circle "circleName""
		const joinMatch = content.match(/joined the circle "([^"]+)"/);
		if (joinMatch && joinMatch[1]) {
			return joinMatch[1];
		}

		// For simple "joined the circle" without quotes
		const simpleJoinMatch = content.match(/joined the circle (.+)$/);
		if (simpleJoinMatch && simpleJoinMatch[1]) {
			return simpleJoinMatch[1];
		}

		return null;
	};

	useEffect(() => {
		const fetchActivities = async () => {
			try {
				const res = await fetch('/api/activity');
				if (!res.ok) throw new Error('Failed to load activities');
				const data = await res.json();
				setActivities(data.activities || []);

				setHasFollowRequests(data.hasFollowRequests || false);
				setHasCircleInvites(data.hasCircleInvites || false);
				setFollowRequestsCount(data.followRequestsCount || 0);
				setCircleInvitesCount(data.circleInvitesCount || 0);
			} catch (err) {
				console.error(err);
				setError('Failed to load activities');
			} finally {
				setIsLoading(false);
			}
		};

		fetchActivities();
	}, []);

	const handleAccept = async (activity: Activity) => {
		if (!activity.circleId) return;

		try {
			setProcessingIds(prev => [...prev, activity.id]);
			const response = await fetch(`/api/circles/${activity.circleId}/joinrequests`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					requestId: activity.id,
					action: 'accept',
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to accept join request');
			}

			// Remove the request from the list
			setActivities(prev => prev.filter(act => act.id !== activity.id));
			router.refresh();
		} catch (err) {
			console.error('Error accepting join request:', err);
			alert('Failed to accept request. Please try again.');
		} finally {
			setProcessingIds(prev => prev.filter(id => id !== activity.id));
		}
	};

	const handleDecline = async (activity: Activity) => {
		if (!activity.circleId) return;

		try {
			setProcessingIds(prev => [...prev, activity.id]);
			const response = await fetch(`/api/circles/${activity.circleId}/joinrequests`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					requestId: activity.id,
					action: 'decline',
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to decline join request');
			}

			// Remove the request from the list
			setActivities(prev => prev.filter(act => act.id !== activity.id));
			router.refresh();
		} catch (err) {
			console.error('Error declining join request:', err);
			alert('Failed to decline request. Please try again.');
		} finally {
			setProcessingIds(prev => prev.filter(id => id !== activity.id));
		}
	};

	const formatTime = (timestamp: string) => {
		const now = new Date();
		const activityDate = new Date(timestamp);
		const diffMs = now.getTime() - activityDate.getTime();
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

		if (diffHours < 1) return 'now';
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`;
		return activityDate.toLocaleDateString();
	};

	const groupActivities = (activities: Activity[]) => {
		const now = new Date();
		const newActivities: Activity[] = [];
		const todayActivities: Activity[] = [];
		const thisWeekActivities: Activity[] = [];

		activities.forEach(activity => {
			const activityDate = new Date(activity.createdAt);
			const diffHours = (now.getTime() - activityDate.getTime()) / (1000 * 60 * 60);

			if (diffHours < 1) {
				newActivities.push(activity);
			} else if (diffHours < 24) {
				todayActivities.push(activity);
			} else if (diffHours < 168) {
				thisWeekActivities.push(activity);
			}
		});

		return { newActivities, todayActivities, thisWeekActivities };
	};

	const renderActivityContent = (activity: Activity) => {
		if (activity.type === 'followed') {
			return <>{activity.content}</>;
		}

		if (activity.type === 'circle_join_request') {
			const circleName = activity.circle?.name || extractCircleName(activity.content) || 'your circle';

			// Enhanced join request display with user info and request details
			return (
				<div className='w-full'>
					<div className='flex items-start mb-3'>
						{activity.requester && (
							<Link href={`/${activity.requester.username}`}>
								<div className='relative mr-3 flex-shrink-0'>
									<Image
										src={activity.requester.profileImage || '/images/default-avatar.png'}
										alt={activity.requester.name || activity.requester.username}
										width={48}
										height={48}
										className='rounded-full object-cover border border-[var(--border)]'
									/>
								</div>
							</Link>
						)}
						<div className='flex-1'>
							{activity.requester && (
								<Link
									href={`/${activity.requester.username}`}
									className='hover:underline'
								>
									<p className='font-semibold'>
										{activity.requester.name || activity.requester.username}
										<span className='font-normal text-[var(--foreground-secondary)] ml-1'>@{activity.requester.username}</span>
									</p>
								</Link>
							)}
							<p className='text-sm text-[var(--foreground-secondary)] mt-1'>{formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}</p>
							<p className='mt-2'>wants to join your circle &quot;{circleName}&quot;</p>
						</div>
					</div>

					<div className='flex space-x-2 justify-end'>
						<button
							disabled={processingIds.includes(activity.id)}
							onClick={() => handleDecline(activity)}
							className='bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] font-medium py-1.5 px-4 rounded-lg text-sm hover:opacity-80 transition disabled:opacity-50'
						>
							{processingIds.includes(activity.id) ? 'Processing...' : 'Decline'}
						</button>
						<button
							disabled={processingIds.includes(activity.id)}
							onClick={() => handleAccept(activity)}
							className='bg-[var(--primary)] text-white font-medium py-1.5 px-4 rounded-lg text-sm hover:opacity-80 transition disabled:opacity-50'
						>
							{processingIds.includes(activity.id) ? 'Processing...' : 'Accept'}
						</button>
					</div>
				</div>
			);
		}

		if (activity.type === 'circle_join' && activity.circle) {
			return (
				<div className='w-full'>
					<div className='flex items-start'>
						<Link href={`/${activity.user.username}`}>
							<div className='relative mr-3 flex-shrink-0'>
								<Image
									src={activity.user.profileImage || '/images/default-avatar.png'}
									alt={activity.user.name || activity.user.username}
									width={40}
									height={40}
									className='rounded-full object-cover border border-[var(--border)]'
								/>
							</div>
						</Link>
						<div className='flex-1'>
							<Link
								href={`/${activity.user.username}`}
								className='hover:underline'
							>
								<span className='font-semibold'>{activity.user.name || activity.user.username}</span>
							</Link>{' '}
							joined your circle{' '}
							<Link
								href={`/circle/${activity.circle.id}`}
								className='hover:underline'
							>
								<span className='font-semibold'>{activity.circle.name}</span>
							</Link>
						</div>
					</div>
				</div>
			);
		}

		// For the circle_new_member type (similar to circle_join but with possible different content format)
		if (activity.type === 'circle_new_member' && activity.circle) {
			// Extract user name correctly from the content
			const contentMatch = activity.content.match(/(.+?) joined the circle/);
			const userName = contentMatch ? contentMatch[1] : 'Someone';
			const circleName = activity.circle.name || extractCircleName(activity.content);

			return (
				<div className='w-full'>
					<div className='flex items-start'>
						<div className='relative mr-3 flex-shrink-0'>
							<Image
								src={'/images/default-avatar.png'}
								alt={userName}
								width={40}
								height={40}
								className='rounded-full object-cover border border-[var(--border)]'
							/>
						</div>
						<div className='flex-1'>
							<span className='font-semibold'>{userName}</span> joined your circle{' '}
							<Link
								href={`/circle/${activity.circle.id}`}
								className='hover:underline'
							>
								<span className='font-semibold'>{circleName}</span>
							</Link>
						</div>
					</div>
				</div>
			);
		}

		return (
			<>
				<span className='font-semibold text-[var(--foreground)]'>{activity.user.name}</span> {activity.content}
			</>
		);
	};

	const { newActivities, todayActivities, thisWeekActivities } = groupActivities(activities);

	return (
		<div className='mobile-container'>
			{hasFollowRequests && (
				<Link
					href='/activity/friendrequest'
					className='flex justify-between items-center mb-6'
				>
					<div className='flex items-center'>
						<span className='text-lg font-semibold text-[var(--foreground)]'>Follow Requests</span>
						<div className='ml-2 w-5 h-5 flex items-center justify-center bg-[var(--groovy-red)] text-white text-xs font-medium rounded-full'>{followRequestsCount}</div>
					</div>
					<span className='text-[var(--foreground)] text-sm'>›</span>
				</Link>
			)}

			<Link
				href='/activity/invite'
				className={`flex justify-between items-center mb-6 ${hasCircleInvites ? '' : 'opacity-70'}`}
			>
				<div className='flex items-center'>
					<span className='text-lg font-semibold text-[var(--foreground)]'>Circle Invites</span>
					{hasCircleInvites && <div className='ml-2 w-5 h-5 flex items-center justify-center bg-[var(--groovy-red)] text-white text-xs font-medium rounded-full'>{circleInvitesCount}</div>}
				</div>
				<span className='text-[var(--foreground)] text-sm'>›</span>
			</Link>

			<h2 className='text-lg font-semibold mb-4 text-[var(--foreground)]'>Recent Activity</h2>

			{isLoading ? (
				<p className='text-center py-4'>Loading...</p>
			) : error ? (
				<p className='text-red-500 text-center py-4'>{error}</p>
			) : activities.length === 0 ? (
				<p className='text-center py-8 text-[var(--foreground)] opacity-60'>No recent activity</p>
			) : (
				<>
					{newActivities.length > 0 && (
						<>
							<h3 className='text-md font-semibold text-[var(--foreground)] opacity-80 mb-4'>New</h3>
							{newActivities.map(activity => (
								<div
									key={activity.id}
									className='mb-4 p-3 bg-[var(--background-secondary)] rounded-lg'
								>
									{renderActivityContent(activity)}

									{activity.type !== 'circle_join_request' && <span className='block text-xs text-[var(--foreground)] opacity-60 mt-1'>{formatTime(activity.createdAt)}</span>}

									{activity.type === 'followed' && (
										<Link
											href={`/${extractFollowerUsername(activity.content)}`}
											className='block text-xs text-circles-dark-blue mt-1'
										>
											View profile
										</Link>
									)}

									{(activity.type === 'circle_join' || activity.type === 'circle_new_member') && activity.circle && (
										<Link
											href={`/circle/${activity.circle.id}`}
											className='block text-xs text-circles-dark-blue mt-1'
										>
											View circle
										</Link>
									)}
									{['album_like', 'album_comment'].includes(activity.type) && activity.circleId && (
										<Link
											href={`/album/${activity.circleId}`}
											className='block text-xs text-circles-dark-blue mt-1'
										>
											View album
										</Link>
									)}
								</div>
							))}
						</>
					)}

					{todayActivities.length > 0 && (
						<>
							<h3 className='text-md font-semibold text-[var(--foreground)] opacity-80 mb-4 mt-6'>Today</h3>
							{todayActivities.map(activity => (
								<div
									key={activity.id}
									className='mb-4 p-3 bg-[var(--background-secondary)] rounded-lg'
								>
									{renderActivityContent(activity)}

									{activity.type !== 'circle_join_request' && <span className='block text-xs text-[var(--foreground)] opacity-60 mt-1'>{formatTime(activity.createdAt)}</span>}

									{activity.type === 'followed' && (
										<Link
											href={`/${extractFollowerUsername(activity.content)}`}
											className='block text-xs text-circles-dark-blue mt-1'
										>
											View profile
										</Link>
									)}

									{(activity.type === 'circle_join' || activity.type === 'circle_new_member') && activity.circle && (
										<Link
											href={`/circle/${activity.circle.id}`}
											className='block text-xs text-circles-dark-blue mt-1'
										>
											View circle
										</Link>
									)}
									{['album_like', 'album_comment'].includes(activity.type) && activity.circleId && (
										<Link
											href={`/album/${activity.circleId}`}
											className='block text-xs text-circles-dark-blue mt-1'
										>
											View album
										</Link>
									)}
								</div>
							))}
						</>
					)}

					{thisWeekActivities.length > 0 && (
						<>
							<h3 className='text-md font-semibold text-[var(--foreground)] opacity-80 mb-4 mt-6'>This Week</h3>
							{thisWeekActivities.map(activity => (
								<div
									key={activity.id}
									className='mb-4 p-3 bg-[var(--background-secondary)] rounded-lg'
								>
									{renderActivityContent(activity)}

									{activity.type !== 'circle_join_request' && <span className='block text-xs text-[var(--foreground)] opacity-60 mt-1'>{formatTime(activity.createdAt)}</span>}

									{activity.type === 'followed' && (
										<Link
											href={`/${extractFollowerUsername(activity.content)}`}
											className='block text-xs text-circles-dark-blue mt-1'
										>
											View profile
										</Link>
									)}

									{(activity.type === 'circle_join' || activity.type === 'circle_new_member') && activity.circle && (
										<Link
											href={`/circle/${activity.circle.id}`}
											className='block text-xs text-circles-dark-blue mt-1'
										>
											View circle
										</Link>
									)}
									{['album_like', 'album_comment'].includes(activity.type) && activity.circleId && (
										<Link
											href={`/album/${activity.circleId}`}
											className='block text-xs text-circles-dark-blue mt-1'
										>
											View album
										</Link>
									)}
								</div>
							))}
						</>
					)}
				</>
			)}
		</div>
	);
}
