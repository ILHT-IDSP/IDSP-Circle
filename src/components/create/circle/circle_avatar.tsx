import Image from "next/image";
import {useRef} from "react";
import {ICircleFormData} from "./circle_types";

interface CircleAvatarProps {
    avatar: string;
    setFormData: React.Dispatch<React.SetStateAction<ICircleFormData>>;
    formData: ICircleFormData;
}

export default function CircleAvatar({avatar, setFormData, formData}: CircleAvatarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setFormData((prev) => ({
                ...prev,
                avatar: event.target?.result as string,
            }));
        };
        reader.readAsDataURL(file);

        setFormData({...formData, avatar});
        console.log("IMAGE SAVED TO FORMDATA: ", formData.avatar);
    };

    return (
        <div className="flex flex-col items-center">
            <div
                className="relative cursor-pointer"
                onClick={handleAvatarClick}
            >
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    className="hidden"
                />
                <Image
                    src={avatar || "/images/default-avatar.png"}
                    alt="Profile"
                    width={200}
                    height={200}
                    className="my-8 rounded-full object-cover border-4 border-circles-dark-blue"
                    style={{aspectRatio: "1 / 1"}}
                />
            </div>
        </div>
    );
}
