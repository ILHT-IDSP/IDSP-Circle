import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const {albumId} = await req.json();
        console.log("ALBUM ID JITT!!!", albumId);

        await prisma.album.delete({
            where: {
                id: albumId,
            },
        });
        console.log("Album deleted");
        return NextResponse.json({message: "Successfully deleted album"}, {status: 200});
    } catch (err) {
        console.error("u sold");
        return NextResponse.json({error: err}, {status: 500});
    }
}
