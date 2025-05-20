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

        // Verify the activity exists and belongs to the user
        const activity = await prisma.activity.findFirst({
            where: {
                id: id,
                userId: parseInt(session.user.id),
                type: "friend_request"
            }
        });

        if (!activity) {
            return NextResponse.json({ error: "Friend request not found" }, { status: 404 });
        }

        if (action === "accept") {
            // Create friendship record
            await prisma.$transaction([
                prisma.activity.update({
                    where: { id },
                    data: { type: "friend" }
                }),
                prisma.follow.create({
                    data: {
                        followerId: parseInt(session.user.id),
                        followingId: activity.userId
                    }
                })
            ]);
        } else if (action === "decline") {
            await prisma.activity.delete({
                where: { id }
            });
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating friend request:", error);
        return NextResponse.json({ error: "Failed to update friend request" }, { status: 500 });
    }
}