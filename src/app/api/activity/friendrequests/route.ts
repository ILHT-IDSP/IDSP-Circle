import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const friendRequests = await prisma.activity.findMany({
            where: {
                type: "friend_request",
                userId: parseInt(session.user.id),
            },
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                    },
                },
            },
        });

        return NextResponse.json(friendRequests);
    } catch (error) {
        console.error("Error fetching friend requests:", error);
        return NextResponse.json({ error: "Failed to fetch friend requests" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, action } = await req.json();
        if (!id || !action) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        if (action === "accept") {
            await prisma.activity.update({
                where: { id },
                data: { type: "friend" },
            });
        } else if (action === "decline") {
            await prisma.activity.delete({
                where: { id },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating friend request:", error);
        return NextResponse.json({ error: "Failed to update friend request" }, { status: 500 });
    }
}
