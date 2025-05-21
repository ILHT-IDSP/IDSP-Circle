import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = parseInt(session.user.id);
        
        // Get regular activities (excluding pending requests/invites)
        const activities = await prisma.activity.findMany({
            where: { 
                userId: userId,
                type: {
                    notIn: ["friend_request", "circle_invite"] // Exclude pending requests
                }
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
                circle: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        
        // Check if user has pending friend requests
        const friendRequestsCount = await prisma.activity.count({
            where: {
                userId: userId,
                type: "friend_request"
            }
        });
        
        // Check if user has pending circle invites
        const circleInvitesCount = await prisma.activity.count({
            where: {
                userId: userId,
                type: "circle_invite"
            }
        });

        return NextResponse.json({
            activities,
            hasFollowRequests: friendRequestsCount > 0,
            hasCircleInvites: circleInvitesCount > 0
        });
    } catch (error) {
        console.error("Error fetching activities:", error);
        return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
    }
}