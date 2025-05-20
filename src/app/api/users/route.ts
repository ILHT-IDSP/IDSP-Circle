import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const searchQuery = url.searchParams.get("q");

        let users;
        if (searchQuery) {
            // Search by name or username (case-insensitive)
            users = await prisma.user.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: searchQuery,
                                mode: "insensitive",
                            },
                        },
                        {
                            username: {
                                contains: searchQuery,
                                mode: "insensitive",
                            },
                        },
                    ],
                },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    profileImage: true,
                },
                take: 20, // Limit results for performance
            });
        } else {
            // Return all users if no search query is provided (for testing)
            users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    username: true,
                    profileImage: true,
                },
                take: 20,
            });
        }

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
