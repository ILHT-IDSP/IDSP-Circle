"use client";
import {AwesomeIcon} from "../../../../public/icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function CreateCircleStepTwo({friends, setFormData, formData}: {friends: any[]; setFormData; formData}) {
    const [search, setSearch] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSelectedFriend = (friendId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const idNumber = Number(friendId);
        setFormData((prev) => {
            const members = prev.members || [];
            if (e.target.checked) {
                if (!members.includes(idNumber)) return {...prev, members: [...members, idNumber]};
                return prev;
            } else {
                return {...prev, members: members.filter((id: number) => id !== idNumber)};
            }
        });
        console.log(formData.members);
    };

    const filteredFriends = friends
        .filter((friend) => friend.username.toLowerCase().includes(search.toLowerCase()) || friend.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            const searchLower = search.toLowerCase();
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const aUsername = a.username.toLowerCase();
            const bUsername = b.username.toLowerCase();

            if (aName === searchLower || aUsername === searchLower) return -1;
            if (bName === searchLower || bUsername === searchLower) return 1;

            if (aName.startsWith(searchLower) || aUsername.startsWith(searchLower)) return -1;
            if (bName.startsWith(searchLower) || bUsername.startsWith(searchLower)) return 1;

            return 0;
        });

    return (
        <>
            <form className="w-full">
                <div className="bg-white/10 rounded-full flex flex-row gap-3 w-full p-3 items-center mb-6">
                    <AwesomeIcon
                        icon={faSearch}
                        color="white"
                        fontSize={20}
                    />
                    <input
                        type="text"
                        placeholder="search friends"
                        className="bg-transparent w-full text-white outline-none placeholder:text-gray-400"
                        onChange={handleChange}
                        value={search}
                    />
                </div>

                <div
                    id="add-friends-container"
                    className="flex flex-col gap-4"
                >
                    <h2 className="text-lg font-semibold text-white mb-2">Suggested Friends</h2>
                    {filteredFriends.map((friend) => (
                        <div
                            key={friend.id}
                            className="flex flex-row items-center gap-4 py-2 px-2 rounded-lg hover:bg-white/5 transition"
                        >
                            <img
                                src={friend.profileImage}
                                alt="profile_image"
                                className="rounded-full w-12 h-12 object-cover border border-white/20"
                            />
                            <div className="flex flex-col flex-1">
                                <span className="font-semibold text-white leading-tight">{friend.username}</span>
                                <span className="text-gray-400 text-sm leading-tight">{friend.name}</span>
                            </div>
                            <input
                                type="checkbox"
                                className="w-5 h-5 accent-white"
                                onChange={(e) => onSelectedFriend(friend.id, e)}
                                checked={formData.members?.includes(Number(friend.id))}
                            />
                        </div>
                    ))}
                </div>
            </form>
        </>
    );
}
