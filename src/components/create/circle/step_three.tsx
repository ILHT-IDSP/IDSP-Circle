import CircleAvatar from "./circle_avatar";
import {AwesomeIcon} from "../../../../public/icons";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import {Circle} from "lucide-react";
import {faLock, faGlobe} from "@fortawesome/free-solid-svg-icons";
import PrivacyToggle from "./privacy_toggle";
import FriendSection from "./friendSection";

export default function CreateCircleStepThree({friends, formData, setFormData, setFriends}: {friends; formData; setFormData; setFriends}) {
    const currentlyAddedFriends: [] = friends.filter((friend) => formData.members.some((id) => id === friend.id));

    const handleToggle = () => {
        setFormData((prev: any) => ({
            ...prev,
            isPrivate: !prev.isPrivate,
        }));

        console.log("added friends", currentlyAddedFriends);
    };

    return (
        <>
            <CircleAvatar
                avatar={formData.avatar}
                setFormData={setFormData}
            />
            <form className="m-0 p-0">
                <div className="mt-4 mb-8 flex flex-row w-full max-w-full justify-center gap-3">
                    <div>
                        <input
                            type="text"
                            value={formData.name}
                            placeholder={formData.name}
                            className="text-xl outline-none text-white w-full placeholder-white"
                            onChange={(e) =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="mt-1">
                        <AwesomeIcon
                            icon={faPencil}
                            fontSize={18}
                            color="white"
                        />
                    </div>
                </div>
                <div
                    id="other-circle-settings"
                    className="border-t-2 border-neutral-700 w-full max-w-full"
                >
                    <PrivacyToggle
                        formData={formData}
                        setFormData={setFormData}
                        toggleHandler={handleToggle}
                    />
                    <FriendSection
                        formData={formData}
                        setFormData={setFormData}
                        friends={currentlyAddedFriends}
                        setFriends={setFriends}
                    />
                </div>
            </form>
        </>
    );
}
