import ProfileScreen from "@/components/profile/ProfileScreen";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();
    if (!session) {
        redirect("/auth/login");
    }
    return <ProfileScreen session={session} />;
}
