"use client";

import { useEffect, useState } from "react";
import UserCard from "@/components/search/UserCard";

interface User {
    id: number;
    name: string;
    username: string;
    profileImage?: string;
}
export default function SearchResults() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    // FETCH ALL USERS OFF RIP 
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/users?q=${query}`);
                const data = await res.json();
                if (res.ok) setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [query]);

    // Filter users BASED ON QUERY
    useEffect(() => {
        if (query.trim() === "") {
            setFilteredUsers(users);
        } else {
            const lowercasedQuery = query.toLowerCase();
            const filtered = users.filter(
                (user) =>
                    user.name.toLowerCase().includes(lowercasedQuery) ||
                    user.username.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredUsers(filtered);}
    }, [query, users]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search for users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg bg-circles-light text-circles-dark placeholder-gray-500"
            />

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
