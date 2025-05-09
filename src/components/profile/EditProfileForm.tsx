"use client";

import {Session} from "next-auth";
import {useState} from "react";

export default function EditProfileForm({session}: {session: Session | null}) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(session?.user?.username ?? "");
    const [email, setEmail] = useState(session?.user?.email ?? "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/user/update", {
            method: "POST",
            body: JSON.stringify({name, email}),
            headers: {"Content-Type": "application/json"},
        });
        setEditing(false);
        window.location.reload();
    };

    return (
        <div className="mt-6 text-sm text-center">
            <button
                onClick={() => setEditing((prev) => !prev)}
                className="underline text-blue-500"
            >
                {editing ? "Cancel" : "Edit Profile Info"}
            </button>

            {editing && (
                <form
                    onSubmit={handleSubmit}
                    className="mt-4 space-y-4 max-w-md mx-auto text-sm"
                >
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            className="w-full border px-3 py-2 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            className="w-full border px-3 py-2 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded w-full"
                    >
                        Save
                    </button>
                </form>
            )}
        </div>
    );
}
