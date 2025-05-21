import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		// Get all friend requests for the current user
		const friendRequests = await prisma.activity.findMany({
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

		// Process the friend requests to include the requester information
		const processedRequests = await Promise.all(
			friendRequests.map(async (request) => {				// Extract the user ID from the content field
				// Format is "user:123 wants to follow you"
				const content = request.content || '';
				const match = content.match(/user:(\d+)/);
				const requesterId = match ? parseInt(match[1]) : null;

				if (requesterId) {
					// Get the requester's information
					const requester = await prisma.user.findUnique({
						where: { id: requesterId },
						select: {
							id: true,
							name: true,
							username: true,
							profileImage: true,
						},
					});

					if (requester) {
						return {
							...request,
							requester
						};
					}
				}

				// Fallback if we can't find the requester
				return request;
			})
		);

		return NextResponse.json(processedRequests);
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
		}		if (action === 'accept') {
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
			}			// Get the requester's user details for the activity notification
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
				}),				// Create a new activity record showing the follow has been accepted
				prisma.activity.create({
					data: {
						type: 'followed',
						userId: requesterId, // This activity is for the requester (they see that their request was accepted)
						content: `${session.user.name || session.user.username} (${session.user.username}) accepted your follow request`,
					},
				}),				// Create a new activity record for the current user to see they've been followed
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
