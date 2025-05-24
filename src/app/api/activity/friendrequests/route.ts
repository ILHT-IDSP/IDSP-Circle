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

		// OPTIMIZATION: Use transaction to batch all queries and eliminate N+1 pattern
		const result = await PrismaUtils.transaction(async tx => {
			// Get all friend requests for the current user
			const friendRequests = await tx.activity.findMany({
				where: {
					type: 'friend_request',
					userId: parseInt(session.user.id),
				},
				orderBy: { createdAt: 'desc' },
				select: {
					id: true,
					content: true,
					createdAt: true,
					user: {
						select: {
							id: true,
							name: true,
							username: true,
							profileImage: true,
						},
					},
				},
			});

			// Extract all unique requester IDs from content
			const requesterIds = new Set<number>();
			friendRequests.forEach(request => {
				// Format is "user:123 wants to follow you"
				const content = request.content || '';
				const match = content.match(/user:(\d+)/);
				const requesterId = match ? parseInt(match[1]) : null;
				if (requesterId) {
					requesterIds.add(requesterId);
				}
			});

			// OPTIMIZATION: Batch fetch all requesters in single query
			const requesters =
				requesterIds.size > 0
					? await tx.user.findMany({
							where: {
								id: { in: Array.from(requesterIds) },
							},
							select: {
								id: true,
								name: true,
								username: true,
								profileImage: true,
							},
					  })
					: [];

			// Create a map for O(1) lookup
			const requesterMap = new Map(requesters.map(user => [user.id, user]));

			// Process requests with requester data
			const processedRequests = friendRequests.map(request => {
				const content = request.content || '';
				const match = content.match(/user:(\d+)/);
				const requesterId = match ? parseInt(match[1]) : null;

				if (requesterId && requesterMap.has(requesterId)) {
					return {
						...request,
						requester: requesterMap.get(requesterId),
					};
				}

				return request;
			});

			return processedRequests;
		});

		return NextResponse.json(result);
	} catch (error) {
		console.error('Error fetching friend requests:', error);
		return NextResponse.json({ error: 'Failed to fetch friend requests' }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { id, action } = await req.json();
		if (!id || !action) {
			return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
		}

		// Verify the activity exists and belongs to the user
		const activity = await prisma.activity.findFirst({
			where: {
				id: id,
				userId: parseInt(session.user.id),
				type: 'friend_request',
			},
		});

		if (!activity) {
			return NextResponse.json({ error: 'Friend request not found' }, { status: 404 });
		}
		if (action === 'accept') {
			// Get the follow request activity
			const friendRequest = await prisma.activity.findFirst({
				where: {
					id: id,
					type: 'friend_request',
				},
				select: {
					id: true,
					content: true,
				},
			});

			if (!friendRequest) {
				return NextResponse.json({ error: 'Friend request not found' }, { status: 404 });
			}

			// Extract the requester ID from the content
			// Format is "user:123 wants to follow you"
			const content = friendRequest.content || '';
			const match = content.match(/user:(\d+)/);
			const requesterId = match ? parseInt(match[1]) : null;

			if (!requesterId) {
				return NextResponse.json({ error: 'Could not identify requester' }, { status: 400 });
			} // Get the requester's user details for the activity notification
			const requester = await prisma.user.findUnique({
				where: { id: requesterId },
				select: {
					id: true,
					name: true,
					username: true,
				},
			});

			if (!requester) {
				return NextResponse.json({ error: 'Requester not found' }, { status: 404 });
			}

			const requesterName = requester.name || requester.username;

			// Create follow relationship - the current user follows the requester
			await prisma.$transaction([
				// Delete the friend request activity
				prisma.activity.delete({
					where: { id },
				}), // Create a new activity record showing the follow has been accepted
				prisma.activity.create({
					data: {
						type: 'followed',
						userId: requesterId, // This activity is for the requester (they see that their request was accepted)
						content: `${session.user.name || session.user.username} (${session.user.username}) accepted your follow request`,
					},
				}), // Create a new activity record for the current user to see they've been followed
				prisma.activity.create({
					data: {
						type: 'followed',
						userId: parseInt(session.user.id), // This activity is for the current user
						content: `${requesterName} (${requester.username}) started following you`,
					},
				}),

				// Create the follow relationship - requester follows the current user
				// (The requester is the one who initiated the follow request)
				prisma.follow.create({
					data: {
						followerId: requesterId,
						followingId: parseInt(session.user.id),
					},
				}),
			]);
		} else if (action === 'decline') {
			await prisma.activity.delete({
				where: { id },
			});
		} else {
			return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error updating friend request:', error);
		return NextResponse.json({ error: 'Failed to update friend request' }, { status: 500 });
	}
}
