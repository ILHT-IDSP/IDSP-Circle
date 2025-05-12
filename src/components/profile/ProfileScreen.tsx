"use client";

import {Session} from "next-auth";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";


export default function ProfileScreen({session}: {session: Session | null}) {
    return (
        <div className="min-h-screen bg-circles-dark px-4 pt-6 pb-20">
            <ProfileHeader session={session} />
            <ProfileTabs />
        </div>
    );
}
