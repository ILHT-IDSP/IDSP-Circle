import {NextResponse} from "next/server";
import {useRouter} from "next/router";

export async function GET() {
    const router = useRouter();
    try {
        console.log("Create a circle or album");
        NextResponse.json({message: "Authorized to create."}, {status: 200});
    } catch (err) {
        NextResponse.json({message: "Not authorized to create"}, {status: 400});
        router.push("/auth/login");
    }
}
