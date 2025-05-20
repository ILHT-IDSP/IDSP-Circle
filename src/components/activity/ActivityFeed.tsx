"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Activity {
    id: number;
    type: string;
    user: {
        name: string;
    };
    content: string;
    createdAt: string;
}

export default function ActivityFeed() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await fetch("/api/activity");
                if (!res.ok) throw new Error("Failed to load activities");
                const data = await res.json();
                setActivities(data);
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
            {/* Circle Invites */}
            <Link href="/activity/invite" className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-circles-light">Circle Invites</span>
                <span className="text-circles-light text-sm">›</span>
            </Link>

            {/* Friend Requests */}
            <Link href="/activity/friendrequest" className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-circles-light">Friend Requests</span>
                <span className="text-circles-light text-sm">›</span>
            </Link>

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    {/* New */}
                    {newActivities.length > 0 && (
                        <>
                            <h2 className="text-md font-semibold text-circles-light mb-4">New</h2>
                            {newActivities.map(activity => (
                                <div key={activity.id} className="mb-4">
                                    <span className="font-semibold text-circles-light">{activity.user.name}</span> {activity.content}
                                    <span className="block text-xs text-gray-500">{formatTime(activity.createdAt)}</span>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Today */}
                    {todayActivities.length > 0 && (
                        <>
                            <h2 className="text-md font-semibold text-circles-light mb-4">Today</h2>
                            {todayActivities.map(activity => (
                                <div key={activity.id} className="mb-4">
                                    <span className="font-semibold text-circles-light">{activity.user.name}</span> {activity.content}
                                    <span className="block text-xs text-gray-500">{formatTime(activity.createdAt)}</span>
                                </div>
                            ))}
                        </>
                    )}

                    {/* This Week */}
                    {thisWeekActivities.length > 0 && (
                        <>
                            <h2 className="text-md font-semibold text-circles-light mb-4">This Week</h2>
                            {thisWeekActivities.map(activity => (
                                <div key={activity.id} className="mb-4">
                                    <span className="font-semibold text-circles-light">{activity.user.name}</span> {activity.content}
                                    <span className="block text-xs text-gray-500">{formatTime(activity.createdAt)}</span>
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
