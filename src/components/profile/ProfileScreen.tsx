"use client";

import ProfileHeader from "./ProfileHeader";
import EditProfileForm from "./EditProfileForm";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {IFormData} from "../user_registration/register_types";
// const fakeUser = {
//     name: "adnan",
//     email: "adnan@example.com",
//     image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Fcartoons%2Fcomments%2F17sypd2%2Fwho_is_arguably_the_most_famous_cartoon_character%2F&psig=AOvVaw2MqBuehigzGexl5Rxr3bQD&ust=1746652898415000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjPo6Tjj40DFQAAAAAdAAAAABAE",
// };

export default function ProfileScreen() {
    const {data: session} = useSession();

    // useEffect(() => {
    //     const fetchSession = async () => {
    //         try {
    //             const response = await fetch("/api/auth/session");
    //             if (!response.ok) throw new Error("Failed to fetch session");
    //             const data = await response.json();

    //             setSession(data.session);
    //         } catch (err) {
    //             console.error("Error fetching sesh", err);
    //         }
    //     };
    //     fetchSession();
    // }, []);

    if (!session?.user) {
        console.error("Not authorized to see page");
        return (
            <>
                <h2>Loading jitt...</h2>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-[#fdf8f4] px-4 pt-6 pb-20">
            <ProfileHeader user={session?.user as IFormData} />
            <EditProfileForm user={session?.user as IFormData} />
        </div>
    );
}
