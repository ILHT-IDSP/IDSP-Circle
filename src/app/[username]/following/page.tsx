"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserCard from "@/components/search/UserCard";
import NavBar from "@/components/bottom_bar/NavBar";

interface User {
    id: number;
    name: string;
    username: string;
    profileImage?: string;
}

export default function FollowingPage() {
    const [following, setFollowing] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const { username } = params;

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const res = await fetch(`/api/users/${username}/following`);
                const data = await res.json();
                setFollowing(data);
            } catch (error) {
                console.error("Failed to fetch following:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowing();
    }, [username]);

    if (loading) return <p className="text-center text-circles-light">Loading...</p>;

    return (
        <>
            <div className="min-h-screen bg-circles-dark px-4 pt-6 pb-20">
                <h1 className="text-2xl font-bold text-circles-light mb-4">Following</h1>
                {following.length > 0 ? (
                    <div className="space-y-4">
                        {following.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                ) : (
                    <p className="text-circles-light text-center">No following found.</p>
                )}
            </div>
            <NavBar />
        </>
    );
}
