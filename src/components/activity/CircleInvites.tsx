"use client";

import { useEffect, useState } from "react";

interface CircleInvite {
    id: number;
    content: string;
    user: {
        id: number;
        name: string;
    };
}

export default function CircleInvites() {
    const [circleInvites, setCircleInvites] = useState<CircleInvite[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCircleInvites = async () => {
            try {
                const res = await fetch("/api/activity/circleinvites");
                if (!res.ok) throw new Error("Failed to load circle invites");
                const data = await res.json();
                setCircleInvites(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load circle invites");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCircleInvites();
    }, []);

    const handleAccept = async (inviteId: number) => {
        try {
            const res = await fetch(`/api/activity/circleinvites/${inviteId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action: "accept" }),
            });

            if (!res.ok) throw new Error("Failed to accept invite");

            setCircleInvites(circleInvites.filter((invite) => invite.id !== inviteId));
            console.log(`Accepted invite ID: ${inviteId}`);
        } catch (err) {
            console.error(err);
            setError("Failed to accept invite");
        }
    };

    const handleDecline = async (inviteId: number) => {
        try {
            const res = await fetch(`/api/activity/circleinvites/${inviteId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action: "decline" }),
            });

            if (!res.ok) throw new Error("Failed to decline invite");

            setCircleInvites(circleInvites.filter((invite) => invite.id !== inviteId));
            console.log(`Declined invite ID: ${inviteId}`);
        } catch (err) {
            console.error(err);
            setError("Failed to decline invite");
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="px-4 space-y-4">
            {circleInvites.map((invite) => (
                <div key={invite.id} className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-circles-light font-semibold">{invite.user.name}</p>
                        <p className="text-circles-light text-sm">{invite.content}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleAccept(invite.id)}
                            className="bg-circles-dark-blue text-circles-light font-semibold py-1 px-4 rounded-full"
                        >
                            accept
                        </button>
                        <button
                            onClick={() => handleDecline(invite.id)}
                            className="bg-gray-600 text-circles-light font-semibold py-1 px-4 rounded-full"
                        >
                            decline
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
