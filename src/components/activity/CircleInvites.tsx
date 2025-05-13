"use client";

const circleInvites = [
    {id: 1, name: "D3 afterhours", friends: 5},
    {id: 2, name: "summmmer '24", friends: 7},
    {id: 3, name: "SET GOAT", friends: 8},
    {id: 4, name: "besties", friends: 8},
];

export default function CircleInvites() {
    return (
        <div className="space-y-4">
            {circleInvites.map((invite) => (
                <div
                    key={invite.id}
                    className="flex justify-between items-center"
                >
                    <div>
                        <p className="text-circles-light font-semibold">{invite.name}</p>
                        <p className="text-circles-light text-sm">{invite.friends} friends</p>
                    </div>
                    <div className="flex space-x-2">
                        <button className="bg-circles-dark-blue text-circles-light font-semibold py-1 px-3 rounded-lg">accept</button>
                        <button className="bg-gray-600 text-circles-light font-semibold py-1 px-3 rounded-lg">decline</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
