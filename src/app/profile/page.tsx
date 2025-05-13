import ProfileScreen from "@/components/profile/ProfileScreen";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import NavBar from "@/components/bottom_bar/NavBar";

export default async function ProfilePage() {
    const session = await auth();
    if (!session) {
        redirect("/auth/login");
    }
    return (
        <>
            <ProfileScreen session={session} />
            <NavBar />
        </>
    );
}
