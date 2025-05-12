"use client";

interface User {
    id: number;
    name: string;
    username: string;
}

export default function UserCard({ user }: { user: User }) {
    return (
        <div className="flex items-center bg-circles-light px-4 py-3 rounded-lg">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div>
                <p className="text-circles-dark font-semibold">{user.name}</p>
                <p className="text-circles-dark text-sm">@{user.username}</p>
            </div>
        </div>
    );
}
