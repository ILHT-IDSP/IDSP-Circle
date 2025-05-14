import Image from "next/image";

interface CircleAvatarProps {
    avatar?: string;
}

export default function CircleAvatar({avatar}: CircleAvatarProps) {
    return (
        <>
            <div
                id="circle-avatar"
                className="flex justify-self-center"
            >
                <Image
                    src={avatar || "/images/default-avatar.png"}
                    alt="Profile"
                    width={200}
                    height={200}
                    className="my-20 rounded-full object-cover border-4 border-circles-dark-blue"
                />
            </div>
        </>
    );
}
