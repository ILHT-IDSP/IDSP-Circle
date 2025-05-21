import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get all circle invites for the current user
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
                        profileImage: true,
                    },
                },
                circle: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        description: true,
                    },
                },
            },
        });
        
        // Process invites to extract the inviter user ID and get inviter information
        const enhancedInvites = await Promise.all(circleInvites.map(async (invite) => {            // Extract the inviter ID from the content
            const contentMatch = invite.content?.match(/user:(\d+) invited/);
            const inviterId = contentMatch ? parseInt(contentMatch[1]) : null;
            
            let inviter: { 
                id: number; 
                name: string | null; 
                username: string; 
                profileImage: string | null; 
            } | null = null;
            
            // If we found an inviter ID, get their information
            if (inviterId) {
                inviter = await prisma.user.findUnique({
                    where: { id: inviterId },
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        profileImage: true,
                    }
                });
            }
            
            // Format the content to be more user-friendly
            let formattedContent = invite.content;
            if (inviter) {
                formattedContent = `invited you to join "${invite.circle?.name}"`;
            }
            
            return {
                ...invite,
                inviter,
                formattedContent
            };
        }));

        return NextResponse.json(enhancedInvites);
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
        }        if (action === "accept") {
            // Extract the inviter user ID from the content
            const contentMatch = activity.content?.match(/user:(\d+) invited/);
            const inviterId = contentMatch ? parseInt(contentMatch[1]) : null;
            
            // Create membership
            await prisma.$transaction([
                // Delete this invitation
                prisma.activity.delete({
                    where: { id }
                }),
                // Create membership
                prisma.membership.create({
                    data: {
                        userId: parseInt(session.user.id),
                        circleId: activity.circleId!,
                        role: "MEMBER"
                    }
                }),
                // Create an activity record for the circle join
                prisma.activity.create({
                    data: {
                        type: "circle_join",
                        content: `joined the circle "${activity.circle!.name}"`,
                        userId: parseInt(session.user.id),
                        circleId: activity.circleId!
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