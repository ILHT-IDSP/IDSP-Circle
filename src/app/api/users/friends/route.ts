import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { PrismaUtils } from '@/lib/prisma-utils';

// function to get the logged in users friends for creating a circle
export async function POST(req: Request) {
	try {
		// Get request body (may be empty)
		const body = await req.json().catch(() => ({}));

		// Get user ID from request body or from session
		let userId;
		const circleId = body?.circleId ? parseInt(body.circleId) : null;

		if (body && body.userId) {
			// If userId is provided in the request body, use it
			userId = parseInt(body.userId);
		} else {
			// If not provided, get the authenticated user's ID from the session
			const session = await auth();
			if (!session?.user?.id) {
				return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
			}
			userId = parseInt(session.user.id as string);
		} // OPTIMIZATION: Use transaction to batch all queries
		const result = await PrismaUtils.transaction(async tx => {
			// Get the user's followers
			const userFriends = await tx.user.findUnique({
				where: { id: userId },
				select: {
					followers: {
						select: { followerId: true },
					},
				},
			});

			// Extract follower IDs
			const followerIds = userFriends?.followers?.map(friend => friend.followerId) || [];

			if (followerIds.length === 0) {
				return { friends: [], membersToExclude: [], invitedUsers: [] };
			}

			// OPTIMIZATION: Batch all remaining queries
			const queries = [
				// Get the user details of all followers
				tx.user.findMany({
					where: { id: { in: followerIds } },
					select: {
						id: true,
						username: true,
						name: true,
						profileImage: true,
						isProfilePrivate: true,
					},
				}),
			];

			// If circleId is provided, add circle-specific queries
			if (circleId) {
				queries.push(
					// Get current members of the circle
					tx.membership.findMany({
						where: { circleId },
						select: { userId: true },
					}),
					// Get users with pending invitations
					tx.activity.findMany({
						where: {
							type: 'circle_invite',
							circleId,
						},
						select: { userId: true },
					})
				);
			}

			const results = await Promise.all(queries);
			const friends = results[0];
			const members = circleId ? results[1] : [];
			const invites = circleId ? results[2] : [];

			return {
				friends,
				membersToExclude: members.map((member: any) => member.userId),
				invitedUsers: invites.map((invite: any) => invite.userId),
			};
		});

		// Filter out members and mark invited users
		const friendsWithStatus = result.friends
			.filter(friend => !result.membersToExclude.includes(friend.id))
			.map(friend => ({
				...friend,
				isInvited: result.invitedUsers.includes(friend.id),
			}));

		return NextResponse.json(
			{
				message: 'Retrieved friends successfully!',
				data: friendsWithStatus,
			},
			{ status: 200 }
		);
	} catch (err) {
		console.error('Error fetching friends:', err);
		return NextResponse.json({ error: 'Failed to fetch friends' }, { status: 500 });
	}
}
