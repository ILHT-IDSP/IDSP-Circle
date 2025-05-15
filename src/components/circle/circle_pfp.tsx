import Image from "next/image";

interface CircleProfilePicture {
    avatar?: string;
}

export default function CircleProfilePicture({avatar}: CircleProfilePicture) {
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
                    className="mt-20 rounded-full object-cover border-4 border-circles-dark-blue"
                />
            </div>
            <h2 className="mt-5 flex justify-self-center">SMASH BURGER</h2>
        </>
    );
}
