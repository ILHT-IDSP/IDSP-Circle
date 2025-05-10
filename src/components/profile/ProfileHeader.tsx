"use client";
"use client";

import {Settings} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface User {
    name: string;
    username: string;
    image: string;
    circlesCount: number;
    friendsCount: number;
}
export default function ProfileHeader({user}: {user: User}) {
    const handleClick = () => {
        document.getElementById("upload-profile-pic")?.click();
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("avatar", file);
        await fetch("/api/user/avatar", {method: "POST", body: formData});
        window.location.reload();
    };

    return (
        <div className="relative flex flex-col items-center mb-6 bg-circles-light rounded-2xl py-4 px-6 shadow-lg">
            <input
                type="file"
                id="upload-profile-pic"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
            />

            {/* Profile picture*/}
            <Image
                src={user.image || "/default-avatar.png"}
                alt="Profile"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover cursor-pointer border-4 border-circles-dark-blue"
                onClick={handleClick}
            />

            {/* Username*/}
            <p className="text-xl font-bold text-circles-dark mt-2">@{user.username}</p>

            {/* circles / friends*/}
            <div className="flex space-x-8 mt-3">
                <div className="text-center">
                    <p className="text-circles-dark-blue font-semibold">{user.circlesCount}</p>
                    <p className="text-circles-dark text-sm">circles</p>
                </div>
                <div className="text-center">
                    <p className="text-circles-dark-blue font-semibold">{user.friendsCount}</p>
                    <p className="text-circles-dark text-sm">friends</p>
                </div>
            </div>

            {/* Settings button*/}
            <Link
                href="/settings"
                className="absolute right-4 top-4"
            >
                <Settings className="w-6 h-6 text-circles-dark-blue" />
            </Link>

            {/* Edit Profile Button*/}
            <Link
                href="profile/edit-profile"
                className="mt-4 bg-circles-dark-blue text-circles-light text-sm font-semibold py-2 px-4 rounded-lg"
            >
                Edit Profile
            </Link>
        </div>
    );
}
