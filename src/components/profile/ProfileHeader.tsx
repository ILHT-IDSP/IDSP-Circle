"use client";
import {Settings} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {IFormData} from "../user_registration/register_types";
import {Session} from "next-auth";

export default function ProfileHeader({session}: {session: Session | null}) {
    const handleClick = () => {
        document.getElementById("upload-profile-pic")?.click();
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("avatar", file);
        await fetch("/api/user/avatar", {method: "POST", body: formData});
        window.location.reload();
    };

    return (
        <div className="relative flex flex-col items-center">
            <input
                type="file"
                id="upload-profile-pic"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
            />
            <Image
                src={session?.user?.image || "/default-avatar.png"}
                alt="Profile"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover cursor-pointer"
                onClick={handleClick}
            />
            <p className="text-lg font-semibold mt-2">@{session?.user?.username}</p>
            <Link
                href="/settings"
                className="absolute right-0 top-0"
            >
                <Settings className="w-6 h-6 text-black" />
            </Link>
        </div>
    );
}
