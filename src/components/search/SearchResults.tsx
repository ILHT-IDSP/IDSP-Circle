"use client";

import { useState } from "react";
import UserCard from "@/components/search/UserCard";

const fakeUsers = [
    { id: 1, name: "Adnan", username: "adnan" },
    { id: 2, name: "Chelsea Woo", username: "chelsea.w" },
    { id: 3, name: "Ding Dong Duong", username: "tina" },
    { id: 4, name: "Noshow Max", username: "max" },
    { id: 5, name: "Irinaa", username: "irinaa" },
    { id: 6, name: "Anguss Beef", username: "anguss.beef" },
];

export default function SearchResults() {
    const [query, setQuery] = useState("");

    const filteredUsers = fakeUsers.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search for users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg bg-circles-light text-circles-dark placeholder-gray-500"
            />

            {/* Search Results */}
            {filteredUsers.length > 0 ? (
                <div className="space-y-4">
                    {filteredUsers.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            ) : (
                <p className="text-circles-light text-center">No results found.</p>
            )}
        </div>
    );
}
