import ProfileScreen from "@/components/profile/ProfileScreen";
import {auth} from "@/auth";
import {redirect} from "next/dist/server/api-utils";
import {useRouter} from "next/navigation";

export default async function ProfilePage() {
    const router = useRouter();
    const session = await auth();
    if (!session) router.push("/auth/login");
    // const {data: session} = useSession();
    // if (!session?.user) throw new Error("not authed bro");
    return <ProfileScreen session={session} />;
}
