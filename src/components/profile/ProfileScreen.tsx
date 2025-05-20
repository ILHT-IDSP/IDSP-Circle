"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";

interface User {
    id: number;
    name: string;
    username: string;
    profileImage: string;
    bio: string;
    circleCount: number;
    friendCount: number;
}

export default function ProfileScreen({ session }: { session: Session | null }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch(`/api/users/${session?.user.id}`);
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user.id) fetchUserData();
    }, [session?.user.id]);

    if (loading) return <p className="text-center text-circles-light">Loading...</p>;
    if (!user) return <p className="text-center text-circles-light">User not found</p>;

    return (
        <div className="min-h-screen bg-circles-dark px-4 pt-6 pb-20">
            <ProfileHeader session={session} />
            <ProfileTabs user={user} />
        </div>
    );
}
