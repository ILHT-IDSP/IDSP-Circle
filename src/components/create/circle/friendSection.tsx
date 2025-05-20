import {AwesomeIcon} from "../../../../public/icons";
import {faX} from "@fortawesome/free-solid-svg-icons";

export default function FriendSection({formData, setFormData, friends, setFriends}: {formData; setFormData; friends; setFriends}) {
    const removeFriend = (id) => {
        setFormData((prev) => ({
            ...prev,
            members: prev.members.filter((memberId) => memberId !== id),
        }));
        console.log(formData.members);
    };

    return (
        <section
            id="friend-section"
            className="max-w-full"
        >
            <h2 className="text-xl font-semibold mb-2 text-white">added friends</h2>
            <div
                id="horizontal-slider"
                className="flex flex-row gap-2 overflow-x-auto scrollbar-hide py-1"
                style={{WebkitOverflowScrolling: "touch"}}
            >
                {friends.map((f) => (
                    <div
                        key={f.id}
                        className="flex items-center bg-transparent border border-neutral-300 rounded-full px-3 py-1 text-white whitespace-nowrap"
                    >
                        <span className="mr-2 text-sm">{f.username}</span>
                        <button
                            onClick={() => removeFriend(f.id)}
                            className="focus:outline-none"
                            aria-label={`Remove ${f.username}`}
                        >
                            <AwesomeIcon
                                icon={faX}
                                fontSize={10}
                                className="text-neutral-400"
                            />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
