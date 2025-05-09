import ProfileScreen from "@/components/profile/ProfileScreen";
import {useSession} from "next-auth/react";

export default function ProfilePage() {
    const {data: session} = useSession();
    if (!session?.user) throw new Error("not authed bro");
    return <ProfileScreen session={session} />;
}
