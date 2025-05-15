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

export default function FollowersPage() {
    const [followers, setFollowers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const { username } = params;

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const res = await fetch(`/api/users/${username}/followers`);
                const data = await res.json();
                setFollowers(data);
            } catch (error) {
                console.error("Failed to fetch followers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowers();
    }, [username]);

    if (loading) return <p className="text-center text-circles-light">Loading...</p>;
    return (
        <>
        <div className="min-h-screen bg-circles-dark px-4 pt-6 pb-20">
            <h1 className="text-2xl font-bold text-circles-light mb-4">Followers</h1>
                {followers.length > 0 ? (
                    <div className="space-y-4">
                        {followers.map((user) => (
                            <UserCard key={user.id} user={user} />))}
                    </div>) : (
                    <p className="text-circles-light text-center">No followers found.</p>)}
            </div>
            <NavBar />
        </>
    );
}
