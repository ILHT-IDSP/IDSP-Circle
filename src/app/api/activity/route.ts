import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { PrismaUtils } from '@/lib/prisma-utils';

export async function GET(req: NextRequest) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		const userId = parseInt(session.user.id);

		// OPTIMIZATION: Use transaction to batch all queries
		const result = await PrismaUtils.transaction(async tx => {
			// OPTIMIZATION: Batch all activity-related queries
			const [activities, friendRequestsCount, circleInvitesCount] = await Promise.all([
				// Get activities where the logged-in user is the target/recipient, not the actor
				tx.activity.findMany({
					where: {
						userId: userId,
						type: {
							notIn: ['friend_request', 'circle_invite'], // Exclude pending requests
						},
						// Exclude self-initiated activities by checking if the content
						// doesn't mention the user themselves joining or creating something
						AND: [
							{
								NOT: {
									content: {
										contains: `${session.user.name || session.user.username} joined`,
									},
								},
							},
							{
								NOT: {
									content: {
										contains: `${session.user.name || session.user.username} created`,
									},
								},
							},
							{
								NOT: {
									content: {
										contains: `${session.user.name || session.user.username} added`,
									},
								},
							},
						],
					},
					orderBy: { createdAt: 'desc' },
					// OPTIMIZATION: Limit results for better performance
					take: 50,
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
						requester: {
							select: {
								id: true,
								username: true,
								name: true,
								profileImage: true,
							},
						},
					},
				}),
				// Check if user has pending friend requests
				tx.activity.count({
					where: {
						userId: userId,
						type: 'friend_request',
					},
				}),
				// Check if user has pending circle invites
				tx.activity.count({
					where: {
						userId: userId,
						type: 'circle_invite',
					},
				}),
			]);

			return { activities, friendRequestsCount, circleInvitesCount };
		});
		return NextResponse.json({
			activities: result.activities,
			hasFollowRequests: result.friendRequestsCount > 0,
			hasCircleInvites: result.circleInvitesCount > 0,
			followRequestsCount: result.friendRequestsCount,
			circleInvitesCount: result.circleInvitesCount,
		});
	} catch (error) {
		console.error('Error fetching activities:', error);
		return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
	}
}
