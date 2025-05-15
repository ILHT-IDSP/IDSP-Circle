import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const session = await auth();
		const userId = session?.user?.id ? parseInt(session.user.id, 10) : null;
		const circleId = parseInt(params.id, 10);

		if (isNaN(circleId)) {
			return NextResponse.json({ error: 'Invalid circle ID' }, { status: 400 });
		}

		// Get circle details with member count
		const circle = await prisma.circle.findUnique({
			where: { id: circleId },
			include: {
				_count: {
					select: { members: true },
				},
			},
		});

		if (!circle) {
			return NextResponse.json({ error: 'Circle not found' }, { status: 404 });
		}

		// Check if the current user is a member or creator of the circle
		let isMember = false;
		let isCreator = false;

		if (userId) {
			// Check if user is circle creator
			isCreator = circle.creatorId === userId;

			// Check if user is a member
			if (!isCreator) {
				const membership = await prisma.membership.findUnique({
					where: {
						userId_circleId: {
							userId,
							circleId,
						},
					},
				});
				isMember = !!membership;
			} else {
				isMember = true; // Creator is automatically a member
			}
		}

		// Format the response
		return NextResponse.json({
			id: circle.id,
			name: circle.name,
			avatar: circle.avatar,
			description: circle.description,
			isPrivate: circle.isPrivate,
			createdAt: circle.createdAt,
			membersCount: circle._count.members,
			isCreator,
			isMember,
		});
	} catch (error) {
		console.error('Error fetching circle details:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
