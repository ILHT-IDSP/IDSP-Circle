"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
    
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await fetch("/api/activity");
                if (!res.ok) throw new Error("Failed to load activities");
                const data = await res.json();
                setActivities(data.activities || []);
                
                // Set flags for special activity types
                setHasFollowRequests(data.hasFollowRequests || false);
                setHasCircleInvites(data.hasCircleInvites || false);
            } catch (err) {
                console.error(err);
                setError("Failed to load activities");
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

        if (diffHours < 1) return "now";
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
        <div className="mobile-container">
            {hasFollowRequests && (
                <Link href="/activity/friendrequest" className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <span className="text-lg font-semibold text-[var(--foreground)]">Follow Requests</span>
                        <span className="ml-2 px-2 py-0.5 bg-circles-dark-blue text-xs text-white rounded-full">New</span>
                    </div>
                    <span className="text-[var(--foreground)] text-sm">›</span>
                </Link>
            )}

            <Link href="/activity/invite" className={`flex justify-between items-center mb-6 ${hasCircleInvites ? '' : 'opacity-70'}`}>
                <div className="flex items-center">
                    <span className="text-lg font-semibold text-[var(--foreground)]">Circle Invites</span>
                    {hasCircleInvites && <span className="ml-2 px-2 py-0.5 bg-circles-dark-blue text-xs text-white rounded-full">New</span>}
                </div>
                <span className="text-[var(--foreground)] text-sm">›</span>
            </Link>

            {/* Activity Feed */}
            <h2 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Recent Activity</h2>

            {isLoading ? (
                <p className="text-center py-4">Loading...</p>
            ) : error ? (
                <p className="text-red-500 text-center py-4">{error}</p>
            ) : activities.length === 0 ? (
                <p className="text-center py-8 text-[var(--foreground)] opacity-60">No recent activity</p>
            ) : (
                <>
                    {/* New */}
                    {newActivities.length > 0 && (
                        <>
                            <h3 className="text-md font-semibold text-[var(--foreground)] opacity-80 mb-4">New</h3>
                            {newActivities.map(activity => (
                                <div key={activity.id} className="mb-4 p-3 bg-[var(--background-secondary)] rounded-lg">
                                    <span className="font-semibold text-[var(--foreground)]">{activity.user.name}</span> {activity.content}
                                    <span className="block text-xs text-[var(--foreground)] opacity-60 mt-1">{formatTime(activity.createdAt)}</span>
                                    {activity.type === 'circle_join' && activity.circle && (
                                        <Link href={`/circle/${activity.circle.id}`} className="block text-xs text-circles-dark-blue mt-1">
                                            View circle
                                        </Link>
                                    )}
                                    {['album_like', 'album_comment'].includes(activity.type) && activity.circleId && (
                                        <Link href={`/album/${activity.circleId}`} className="block text-xs text-circles-dark-blue mt-1">
                                            View album
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </>
                    )}

                    {/* Today */}
                    {todayActivities.length > 0 && (
                        <>
                            <h3 className="text-md font-semibold text-[var(--foreground)] opacity-80 mb-4 mt-6">Today</h3>
                            {todayActivities.map(activity => (
                                <div key={activity.id} className="mb-4 p-3 bg-[var(--background-secondary)] rounded-lg">
                                    <span className="font-semibold text-[var(--foreground)]">{activity.user.name}</span> {activity.content}
                                    <span className="block text-xs text-[var(--foreground)] opacity-60 mt-1">{formatTime(activity.createdAt)}</span>
                                    {activity.type === 'circle_join' && activity.circle && (
                                        <Link href={`/circle/${activity.circle.id}`} className="block text-xs text-circles-dark-blue mt-1">
                                            View circle
                                        </Link>
                                    )}
                                    {['album_like', 'album_comment'].includes(activity.type) && activity.circleId && (
                                        <Link href={`/album/${activity.circleId}`} className="block text-xs text-circles-dark-blue mt-1">
                                            View album
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </>
                    )}

                    {/* This Week */}
                    {thisWeekActivities.length > 0 && (
                        <>
                            <h3 className="text-md font-semibold text-[var(--foreground)] opacity-80 mb-4 mt-6">This Week</h3>
                            {thisWeekActivities.map(activity => (
                                <div key={activity.id} className="mb-4 p-3 bg-[var(--background-secondary)] rounded-lg">
                                    <span className="font-semibold text-[var(--foreground)]">{activity.user.name}</span> {activity.content}
                                    <span className="block text-xs text-[var(--foreground)] opacity-60 mt-1">{formatTime(activity.createdAt)}</span>
                                    {activity.type === 'circle_join' && activity.circle && (
                                        <Link href={`/circle/${activity.circle.id}`} className="block text-xs text-circles-dark-blue mt-1">
                                            View circle
                                        </Link>
                                    )}
                                    {['album_like', 'album_comment'].includes(activity.type) && activity.circleId && (
                                        <Link href={`/album/${activity.circleId}`} className="block text-xs text-circles-dark-blue mt-1">
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
