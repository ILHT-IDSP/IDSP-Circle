import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

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
		}

		// Get the user's followers
		const userFriends = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				followers: true,
			},
		});

		// Extract follower IDs
		const followerIds =
			userFriends?.followers?.map(friend => {
				return friend.followerId;
			}) || [];
		// Get the user details of all followers
		const friends = await prisma.user.findMany({
			where: {
				id: {
					in: followerIds,
				},
			},
			select: {
				id: true,
				username: true,
				name: true,
				profileImage: true,
				isProfilePrivate: true,
			},
		});
		// If circleId is provided, we need to:
		// 1. Get the current members of the circle to exclude them
		// 2. Check for existing invitations to mark those users as already invited
		let membersToExclude: number[] = [];
		let invitedUsers: number[] = [];

		if (circleId) {
			// Get the current members of the circle
			const members = await prisma.membership.findMany({
				where: { circleId },
				select: { userId: true }
			});
			membersToExclude = members.map(member => member.userId);

			// Get users who already have pending invitations
			const invites = await prisma.activity.findMany({
				where: {
					type: 'circle_invite',
					circleId,
				},
				select: {
					userId: true,
				}
			});
			invitedUsers = invites.map(invite => invite.userId);
		}

		// Filter out members and mark invited users
		const friendsWithStatus = friends
			.filter(friend => !membersToExclude.includes(friend.id))
			.map(friend => ({
				...friend,
				isInvited: invitedUsers.includes(friend.id)
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
