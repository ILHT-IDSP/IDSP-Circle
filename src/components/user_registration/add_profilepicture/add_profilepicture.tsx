"use client";
import {IFormDataProps, IFormData} from "../register_types";
import AddPictureButton from "./add_picture_button";
import SkipButton from "./skip_button";
import {useRouter} from "next/navigation";

export default function AddProfilePicture({formData, setFormData, onNext}: IFormDataProps) {
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({...prev, profileImage: file.name}));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNext();
    };

    const handleSkip = async () => {
        try {
            console.log("Form Data @ pressing skip", formData);
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({formData}),
            });

            if (!response.ok) throw new Error("Failed creating session");

            const data = await response.json();
            console.log(data.username);
            console.log("FORM DATA AFTER REGISTER", data);
            router.push("/profile");
        } catch (err) {
            console.error("Failed to skip profile picture step", err);
            router.push("/auth/login");
        }
    };

    return (
        <>
            <div className="">
                <div
                    className="flex flex-col"
                    id="profile-picture-container"
                >
                    {/* default pfp goes here */}
                    <img
                        src="/POOP"
                        alt="poopfilepeekchur"
                    />
                </div>
                <footer className="absolute w-full bottom-16 flex flex-col gap-6">
                    <AddPictureButton />
                    <SkipButton onClick={handleSkip} />
                </footer>
            </div>
        </>
    );
}
