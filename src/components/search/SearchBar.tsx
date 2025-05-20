"use client";

import { useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        // TODO: Add real search functionality here
        console.log("Searching for:", e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search for users..."
            value={query}
            onChange={handleSearch}
            className="w-full mb-4 p-3 rounded-lg bg-circles-light text-circles-dark placeholder-gray-500"
        />
    );
}
