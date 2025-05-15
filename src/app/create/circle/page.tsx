import {auth} from "@/auth";
import CreateCircle from "@/components/create/create_circle";
import {redirect} from "next/navigation";
export default async function CreateCirclePage() {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/auth/login");
    }

    return (
        <>
            <CreateCircle session={session} />
        </>
    );
}
