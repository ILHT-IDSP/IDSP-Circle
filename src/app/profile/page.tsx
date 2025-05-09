import ProfileScreen from "@/components/profile/ProfileScreen";
<<<<<<< HEAD
import {useSession} from "next-auth/react";
import {auth} from "@/auth";
=======
>>>>>>> bd1ef4ae7eada3fa1c0686834797d4ff6f7954af

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user) return null;
    // const {data: session} = useSession();
    // if (!session?.user) throw new Error("not authed bro");
<<<<<<< HEAD
    return <ProfileScreen session={session} />;
=======
return (<ProfileScreen/>)
>>>>>>> bd1ef4ae7eada3fa1c0686834797d4ff6f7954af
}
