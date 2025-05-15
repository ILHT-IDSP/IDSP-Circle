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
		const circleId = parseInt(params.id, 10);

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

			// For now, let anyone join (you could add invitation logic here for private circles)
			const membership = await prisma.membership.create({
				data: {
					userId,
					circleId,
					role: 'MEMBER',
				},
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
