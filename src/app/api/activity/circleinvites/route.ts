import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const circleInvites = await prisma.activity.findMany({
            where: {
                type: "circle_invite",
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
                circle: {  // Changed from "C"ircle to "c"ircle
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(circleInvites);
    } catch (error) {
        console.error("Error fetching circle invites:", error);
        return NextResponse.json({ error: "Failed to fetch circle invites" }, { status: 500 });
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

        // Verify activity belongs to user
        const activity = await prisma.activity.findFirst({
            where: {
                id: id,
                userId: parseInt(session.user.id),
                type: "circle_invite"
            },
            include: {
                circle: true 
            }});

        if (!activity) {
            return NextResponse.json({ error: "Circle invite not found" }, { status: 404 });
        }

        if (action === "accept") {
            // Create membership
            await prisma.$transaction([
                prisma.activity.update({
                    where: { id },
                    data: { type: "circle_member" }
                }),
                prisma.membership.create({
                    data: {
                        userId: parseInt(session.user.id),
                        circleId: activity.circleId!,
                        role: "MEMBER"
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
        console.error("Error updating circle invite:", error);
        return NextResponse.json({ error: "Failed to update circle invite" }, { status: 500 });
    }
}