import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		const resolvedParams = await params;
		const circleId = parseInt(resolvedParams.id, 10);
		const userId = parseInt(session.user.id, 10);

		if (isNaN(circleId)) {
			return NextResponse.json({ error: 'Invalid circle ID' }, { status: 400 });
		}

		// Check if the circle exists and user is the creator
		const circle = await prisma.circle.findUnique({
			where: { id: circleId },
			select: { creatorId: true },
		});

		if (!circle) {
			return NextResponse.json({ error: 'Circle not found' }, { status: 404 });
		}

		if (circle.creatorId !== userId) {
			return NextResponse.json({ error: 'Only the circle creator can update the avatar' }, { status: 403 });
		}

		// Parse request body
		const { avatarUrl } = await request.json();

		if (!avatarUrl) {
			return NextResponse.json({ error: 'Avatar URL is required' }, { status: 400 });
		}

		// Update the circle avatar
		const updatedCircle = await prisma.circle.update({
			where: { id: circleId },
			data: {
				avatar: avatarUrl,
			},
		});

		return NextResponse.json({
			message: 'Circle avatar updated successfully',
			avatar: updatedCircle.avatar,
		});
	} catch (error) {
		console.error('Error updating circle avatar:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
