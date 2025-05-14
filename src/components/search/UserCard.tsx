"use client";

import Link from "next/link";
import Image from "next/image";

interface User {
    id: number;
    name: string;
    username: string;
    profileImage?: string;}

export default function UserCard({ user }: { user: User }) {
    return (
    <Link href={`/${user.username}`}>
        <div className="flex items-center bg-circles-light px-4 py-3 rounded-lg cursor-pointer">
            {user.profileImage ? (
                <Image
                    src={user.profileImage}
                    alt={user.username}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                />
            ) : (
                <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            )}
            <div>
                <p className="text-circles-dark font-semibold">{user.name}</p>
                    <p className="text-circles-dark text-sm">@{user.username}</p>
            </div>
            </div>
        </Link>
    );}
