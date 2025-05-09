import ProfileScreen from "@/components/profile/ProfileScreen";
import {useSession} from "next-auth/react";
import {auth} from "@/auth";

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user) return null;
    // const {data: session} = useSession();
    // if (!session?.user) throw new Error("not authed bro");
    return <ProfileScreen session={session} />;
}
