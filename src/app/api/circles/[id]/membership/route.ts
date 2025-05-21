import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request, { params }) {
	try {
		const session = await auth();

		if (!session || !session.user) {
			return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
		}

		const userId = parseInt(session.user.id, 10);
		const resolvedParams = await params;
		const circleId = parseInt(resolvedParams.id, 10);

		if (isNaN(circleId)) {
			return NextResponse.json({ error: 'Invalid circle ID' }, { status: 400 });
		}

		// Get the action from the request body
		const { action } = await request.json();

		if (!action || (action !== 'join' && action !== 'leave')) {
			return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
		}

		// Check if the circle exists
		const circle = await prisma.circle.findUnique({
			where: { id: circleId },
			select: {
				id: true,
				creatorId: true,
				isPrivate: true,
				name: true,
			},
		});

		if (!circle) {
			return NextResponse.json({ error: 'Circle not found' }, { status: 404 });
		}

		// Can't leave if you're the creator
		if (action === 'leave' && circle.creatorId === userId) {
			return NextResponse.json(
				{
					error: 'Circle creator cannot leave the circle',
				},
				{ status: 400 }
			);
		}

		// Handle join action
		if (action === 'join') {
			// Check if user is already a member
			const existingMembership = await prisma.membership.findUnique({
				where: {
					userId_circleId: {
						userId,
						circleId,
					},
				},
			});

			if (existingMembership) {
				return NextResponse.json({
					message: 'User is already a member of this circle',
				});
			}

			// Check if there's already a pending join request
			const existingRequest = await prisma.activity.findFirst({
				where: {
					type: 'circle_join_request',
					userId: circle.creatorId, // Activity belongs to the circle creator or admins
					content: { contains: `user:${userId} wants to join` },
					circleId: circleId,
				},
			});

			// For private circles, create a join request instead of adding directly
			if (circle.isPrivate) {
				if (existingRequest) {
					return NextResponse.json({
						success: true,
						action: 'request_already_sent',
						message: 'Join request already sent',
					});
				}

				// Get the user information to include in the activity
				const requestingUser = await prisma.user.findUnique({
					where: { id: userId },
					select: { name: true, username: true }
				});
				
				const userName = requestingUser?.name || requestingUser?.username || "Unknown user";
				
				// Create a join request activity with better content
				await prisma.activity.create({
					data: {
						type: 'circle_join_request',
						content: `${userName} wants to join your circle "${circle.name}"`,
						userId: circle.creatorId, // Activity belongs to the circle creator
						circleId: circleId,
						requesterId: userId, // Store the requester ID directly in the database field
					},
				});

				return NextResponse.json({
					success: true,
					action: 'request_sent',
					message: 'Join request sent',
				});
			}

			// For public circles, create membership directly
			let membership;
			await prisma.$transaction(async prisma => {
				// Create the membership
				membership = await prisma.membership.create({
					data: {
						userId,
						circleId,
						role: 'MEMBER',
					},
				});

				// Create activity for circle creator if they're not the one joining
				if (circle.creatorId !== userId) {
					await prisma.activity.create({
						data: {
							type: 'circle_join',
							content: `joined your circle "${circle.name}"`,
							userId: circle.creatorId, // Activity belongs to circle creator
							circleId: circleId,
						},
					});
				}
			});

			return NextResponse.json({
				message: 'Successfully joined the circle',
				membership,
			});
		}

		// Handle leave action
		if (action === 'leave') {
			const deletedMembership = await prisma.membership.deleteMany({
				where: {
					userId,
					circleId,
				},
			});

			if (deletedMembership.count === 0) {
				return NextResponse.json({
					message: 'User was not a member of this circle',
				});
			}

			return NextResponse.json({
				message: 'Successfully left the circle',
			});
		}
	} catch (error) {
		console.error('Error handling circle membership:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
