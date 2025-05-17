"use client";

const friendRequests = [
    { id: 1, name: "Swebster", username: "sweb" },
    { id: 2, name: "chelsea.w", username: "chelsea.w" },
    { id: 3, name: "dingdongduong", username: "tina" },
];

export default function FriendRequests() {
    return (
        <div className="px-4 space-y-4">
            {friendRequests.map((request) => (
                <div key={request.id} className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-circles-light font-semibold">{request.name}</p>
                        <p className="text-circles-light text-sm">{request.username}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button className="bg-circles-dark-blue text-circles-light font-semibold py-1 px-4 rounded-lg">
                            accept
                        </button>
                        <button className="bg-gray-600 text-circles-light font-semibold py-1 px-4 rounded-lg">
                            decline
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
