import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: NextRequest, { params }) {
    try {
        const { username } = params;

        // Find the user by username
        const user = await prisma.user.findUnique({
            where: { username },
            select: { id: true },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Get followers of the user
        const followers = await prisma.follow.findMany({
            where: { followingId: user.id },
            include: {
                follower: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        profileImage: true,
                    },
                },
            },
        });

        const formattedFollowers = followers.map(f => ({
            id: f.follower.id,
            username: f.follower.username,
            name: f.follower.name,
            profileImage: f.follower.profileImage,
        }));

        return NextResponse.json(formattedFollowers);
    } catch (error) {
        console.error('Error fetching followers:', error);
        return NextResponse.json({ error: 'Failed to fetch followers' }, { status: 500 });
    }
}
