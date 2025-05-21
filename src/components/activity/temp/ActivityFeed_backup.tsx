'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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
}

export default function ActivityFeed() {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [hasFollowRequests, setHasFollowRequests] = useState(false);
	const [hasCircleInvites, setHasCircleInvites] = useState(false);
	const [followRequestsCount, setFollowRequestsCount] = useState(0);
	const [circleInvitesCount, setCircleInvitesCount] = useState(0);

	// Helper function to extract follower username from content
	const extractFollowerUsername = (content: string) => {
		// Extract the name/username that appears before " started following" or " accepted"
		return content.split(' started following')[0].split(' accepted')[0];
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
									{activity.type === 'followed' ? (
										<>{activity.content}</>
									) : (
										<>
											<span className='font-semibold text-[var(--foreground)]'>{activity.user.name}</span> {activity.content}
										</>
									)}
									<span className='block text-xs text-[var(--foreground)] opacity-60 mt-1'>{formatTime(activity.createdAt)}</span>

									{/* Extract follower username from content (handling both "started following" and "accepted your follow request" cases)
									const extractFollowerUsername = (content: string) => {
										// Extract the name/username that appears before " started following" or " accepted"
										return content.split(' started following')[0].split(' accepted')[0];
									}; */}

									{activity.type === 'followed' && (
										<Link
											href={`/${activity.user.username}`}
											className='block text-xs text-circles-dark-blue mt-1'
										>
											View profile
										</Link>
									)}

									{activity.type === 'circle_join' && activity.circle && (
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
									{activity.type === 'followed' ? (
										<>{activity.content}</>
									) : (
										<>
											<span className='font-semibold text-[var(--foreground)]'>{activity.user.name}</span> {activity.content}
										</>
									)}
									<span className='block text-xs text-[var(--foreground)] opacity-60 mt-1'>{formatTime(activity.createdAt)}</span>

									{/* Extract follower username from content (handling both "started following" and "accepted your follow request" cases)
									const extractFollowerUsername = (content: string) => {
										// Extract the name/username that appears before " started following" or " accepted"
										return content.split(' started following')[0].split(' accepted')[0];
									}; */}

									{activity.type === 'followed' && (
										<Link
											href={`/${activity.user.username}`}
											className='block text-xs text-circles-dark-blue mt-1'
										>
											View profile
										</Link>
									)}

									{activity.type === 'circle_join' && activity.circle && (
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
									{activity.type === 'followed' ? (
										<>{activity.content}</>
									) : (
										<>
											<span className='font-semibold text-[var(--foreground)]'>{activity.user.name}</span> {activity.content}
										</>
									)}
									<span className='block text-xs text-[var(--foreground)] opacity-60 mt-1'>{formatTime(activity.createdAt)}</span>

									{/* Extract follower username from content (handling both "started following" and "accepted your follow request" cases)
									const extractFollowerUsername = (content: string) => {
										// Extract the name/username that appears before " started following" or " accepted"
										return content.split(' started following')[0].split(' accepted')[0];
									}; */}

									{activity.type === 'followed' && (
										<Link
											href={`/${activity.user.username}`}
											className='block text-xs text-circles-dark-blue mt-1'
										>
											View profile
										</Link>
									)}

									{activity.type === 'circle_join' && activity.circle && (
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
