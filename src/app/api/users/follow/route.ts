import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
	try {
		const session = await auth();

		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { targetUserId, action } = await request.json();

		if (!targetUserId || !action || !['follow', 'unfollow'].includes(action)) {
			return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
		}

		const currentUserId = parseInt(session.user.id);

		// Check if trying to follow/unfollow self
		if (currentUserId === targetUserId) {
			return NextResponse.json({ error: 'Cannot follow/unfollow yourself' }, { status: 400 });
		}

		// Check if target user exists
		const targetUser = await prisma.user.findUnique({
			where: { id: targetUserId },
		});

		if (!targetUser) {
			return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
		}
		if (action === 'follow') {
			// Create follow record if it doesn't exist
			await prisma.follow.upsert({
				where: {
					followerId_followingId: {
						followerId: currentUserId,
						followingId: targetUserId,
					},
				},
				update: {},
				create: {
					followerId: currentUserId,
					followingId: targetUserId,
				},
			});

			// Get updated follower and following counts
			const [followerCount, followingCount] = await Promise.all([
				prisma.follow.count({
					where: {
						followingId: targetUserId,
					},
				}),
				prisma.follow.count({
					where: {
						followerId: targetUserId,
					},
				}),
			]);

			return NextResponse.json({
				success: true,
				action: 'followed',
				followerCount,
				followingCount,
			});
		} else if (action === 'unfollow') {
			// Delete follow record if it exists
			await prisma.follow.deleteMany({
				where: {
					followerId: currentUserId,
					followingId: targetUserId,
				},
			});

			// Get updated follower and following counts
			const [followerCount, followingCount] = await Promise.all([
				prisma.follow.count({
					where: {
						followingId: targetUserId,
					},
				}),
				prisma.follow.count({
					where: {
						followerId: targetUserId,
					},
				}),
			]);

			return NextResponse.json({
				success: true,
				action: 'unfollowed',
				followerCount,
				followingCount,
			});
		}

		return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
	} catch (error) {
		console.error('Error handling follow/unfollow:', error);
		return NextResponse.json({ error: 'Failed to process follow/unfollow action' }, { status: 500 });
	}
}
