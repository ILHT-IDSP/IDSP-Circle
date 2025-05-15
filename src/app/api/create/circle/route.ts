import {NextResponse} from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
    try {
        const {formData} = await req.json();
        console.log("Server hit!");
        console.log("backend: ", formData);

        const creatorId = parseInt(formData.creatorId, 10);
        
        if (isNaN(creatorId)) {
            return NextResponse.json({error: "Invalid creator ID"}, {status: 400});
        }

        const newCircle = await prisma.circle.create({
            data: {
                creatorId,
                name: formData.name,
                avatar: formData.avatar || null,
                isPrivate: formData.isPrivate
            },
        });
        
        await prisma.membership.create({
            data: {
                userId: creatorId,
                circleId: newCircle.id,
                role: "ADMIN"
            }
        });
        
        console.log(`Created circle: ${newCircle.name}`);

        return NextResponse.json({
            message: "Successfully created circle", 
            circle: newCircle
        }, {status: 200});
    } catch (err) {
        console.error("Error creating circle:", err);
        return NextResponse.json({error: "Failed to create circle"}, {status: 500});
    }
}
