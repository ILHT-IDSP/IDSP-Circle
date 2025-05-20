import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(req: Request) {
	try {
		console.log('Server hit!');

		// Get the current user from the session
		const session = await auth();

		if (!session || !session.user) {
			return NextResponse.json({ message: 'Unauthorized', data: [] }, { status: 401 });
		}

		const userId = parseInt(session.user.id, 10);

		// Get circles where the user is either a creator or a member
		const circles = await prisma.circle.findMany({
			where: {
				OR: [{ creatorId: userId }, { members: { some: { userId } } }],
			},
			select: {
				id: true,
				name: true,
				description: true,
				avatar: true,
				isPrivate: true,
				createdAt: true,
				updatedAt: true,
				creatorId: true,
				members: {
					where: {
						userId: userId,
					},
					select: {
						role: true,
					},
				},
			},
		});

		// Transform the circles data before returning
		const transformedCircles = circles
			.map(circle => {
				// Check if user is a member of this circle
				const isMember = circle.members.length > 0 || circle.creatorId === userId;

				// Only return circles where the user is a member
				if (isMember) {
					return {
						id: circle.id,
						name: circle.name,
						description: circle.description,
						avatar: circle.avatar,
						isPrivate: circle.isPrivate,
						createdAt: circle.createdAt,
						updatedAt: circle.updatedAt,
						creatorId: circle.creatorId,
					};
				}
				return null;
			})
			.filter(circle => circle !== null);

		console.log('DATABASE RESULT: ', transformedCircles);
		return NextResponse.json({ message: 'success', data: transformedCircles }, { status: 200 });
	} catch (err) {
		console.error('Error fetching circles:', err);
		return NextResponse.json({ error: 'Failed to fetch circles' }, { status: 500 });
	}
}
