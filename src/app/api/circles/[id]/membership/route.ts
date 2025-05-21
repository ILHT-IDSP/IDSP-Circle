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

			// Get circle details for the activity content
			const circleDetails = await prisma.circle.findUnique({
				where: { id: circleId },
				select: {
					name: true,
					creatorId: true
				}
			});

			// Create membership and activity records in a transaction
			let membership;
			await prisma.$transaction(async (prisma) => {
				// Create the membership
				membership = await prisma.membership.create({
					data: {
						userId,
						circleId,
						role: 'MEMBER',
					},
				});
				
				// Create activity for circle creator if they're not the one joining
				if (circleDetails && circleDetails.creatorId !== userId) {
					await prisma.activity.create({
						data: {
							type: 'circle_join',
							content: `joined your circle "${circleDetails.name}"`,
							userId: circleDetails.creatorId, // Activity belongs to circle creator
							circleId: circleId
						}
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
