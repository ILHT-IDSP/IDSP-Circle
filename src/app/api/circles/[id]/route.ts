import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { PrismaUtils } from '@/lib/prisma-utils';

export async function GET(request: Request, { params }) {
	try {
		const session = await auth();
		const resolvedParams = await params;
		const userId = session?.user?.id ? parseInt(session.user.id, 10) : null;
		const circleId = parseInt(resolvedParams.id, 10);

		if (isNaN(circleId)) {
			return NextResponse.json({ error: 'Invalid circle ID' }, { status: 400 });
		}
		// Get circle details and membership in a single transaction
		const [circle, membership] = await PrismaUtils.transaction(async (tx) => {
			const circleQuery = tx.circle.findUnique({
				where: { id: circleId },
				include: {
					_count: {
						select: { members: true },
					},
				},
			});

			const membershipQuery = userId ? tx.membership.findUnique({
				where: {
					userId_circleId: {
						userId,
						circleId,
					},
				},
			}) : Promise.resolve(null);

			return Promise.all([circleQuery, membershipQuery]);
		});

		if (!circle) {
			return NextResponse.json({ error: 'Circle not found' }, { status: 404 });
		}

		// Check if the current user is a member or creator of the circle
		const isCreator = userId ? circle.creatorId === userId : false;
		const isMember = isCreator || !!membership;

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
