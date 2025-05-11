"use client";

import Link from "next/link";

const activities = [
    { id: 1, user: "dingdongduong", message: "Liked your Circle: sleeps", time: "now" },
    { id: 2, user: "chelseawoo", message: "Liked your comment: HAHA remember when...", time: "10m ago" },
    { id: 3, user: "annabunny", message: "Liked your Album: sunset", time: "9hrs ago" },
    { id: 4, user: "irinaa", message: "Commented on your post", time: "12hrs ago" },
    { id: 5, user: "anguss.beef", message: "Replied to your comment: dude no way s...", time: "19hrs ago" },
    { id: 6, user: "noshowmax", message: "Liked your Album: hawaii", time: "Sunday" },
];

export default function ActivityFeed() {
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

            {/* New */}
            <h2 className="text-md font-semibold text-circles-light mb-4">New</h2>
            {activities.slice(0, 2).map((activity) => (
                <div key={activity.id} className="mb-4">
                    <span className="font-semibold text-circles-light">{activity.user}</span> {activity.message}
                    <span className="block text-xs text-gray-500">{activity.time}</span>
                </div>
            ))}

            {/* Today */}
            <h2 className="text-md font-semibold text-circles-light mb-4">Today</h2>
            {activities.slice(2, 5).map((activity) => (
                <div key={activity.id} className="mb-4">
                    <span className="font-semibold text-circles-light">{activity.user}</span> {activity.message}
                    <span className="block text-xs text-gray-500">{activity.time}</span>
                </div>
            ))}

            {/* This Week */}
            <h2 className="text-md font-semibold text-circles-light mb-4">This Week</h2>
            {activities.slice(5).map((activity) => (
                <div key={activity.id} className="mb-4">
                    <span className="font-semibold text-circles-light">{activity.user}</span> {activity.message}
                    <span className="block text-xs text-gray-500">{activity.time}</span>
                </div>
            ))}
        </div>
    );
}
