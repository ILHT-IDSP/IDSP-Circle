import {redirect} from "next/navigation";
import {auth} from "@/auth";
import CreateAlbum from "@/components/create/create_album";
export default async function CreateAlbumPage() {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/auth/login");
    }
    return (
        <>
            <CreateAlbum session={session} />
        </>
    );
}
