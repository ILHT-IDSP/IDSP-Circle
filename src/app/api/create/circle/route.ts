import {NextResponse} from "next/server";
import prisma from "../../../../lib/prisma";

const now = new Date();

export async function POST(req: Request) {
    try {
        const {formData} = await req.json();
        console.log("Server hit!");
        console.log("backend: ", formData);

        // frontend should console log formData if u coment out the whole ass query shi
        const newCircle = await prisma.circle.create({
            data: {
                creatorId: formData.creatorId as number,
                name: formData.name,
                creator: formData.creator,
                avatar: formData.avatar || null,

                createdAt: now,
                updatedAt: now,
            },
        });
        console.log(`created circle ${newCircle.name}`);

        return NextResponse.json({message: "successfully created circle"}, {status: 200});
    } catch (err) {
        return NextResponse.json({error: err}, {status: 500});
    }
}
