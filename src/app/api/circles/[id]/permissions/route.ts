import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json({
				canCreateAlbum: false,
				canInviteMembers: false,
				canRemoveMembers: false,
				canEditCircle: false,
				role: null,
			});
		}

		const userId = parseInt(session.user.id, 10);
		const circleId = parseInt(params.id, 10);

		if (isNaN(circleId)) {
			return NextResponse.json({ error: 'Invalid circle ID' }, { status: 400 });
		}

		// Check if the circle exists
		const circle = await prisma.circle.findUnique({
			where: { id: circleId },
			select: {
				creatorId: true,
			},
		});

		if (!circle) {
			return NextResponse.json({ error: 'Circle not found' }, { status: 404 });
		}

		// Check user's role in the circle
		let role = null;
		let isCreator = false;

		// If user is creator
		if (circle.creatorId === userId) {
			isCreator = true;
			role = 'ADMIN';
		} else {
			// Otherwise check membership
			const membership = await prisma.membership.findUnique({
				where: {
					userId_circleId: {
						userId,
						circleId,
					},
				},
				select: {
					role: true,
				},
			});

			role = membership?.role || null;
		}

		// Determine permissions
		const canCreateAlbum = role === 'ADMIN' || role === 'MODERATOR';
		const canInviteMembers = !!role; // Any member can invite
		const canRemoveMembers = role === 'ADMIN';
		const canEditCircle = isCreator;

		return NextResponse.json({
			canCreateAlbum,
			canInviteMembers,
			canRemoveMembers,
			canEditCircle,
			role,
		});
	} catch (error) {
		console.error('Error checking circle permissions:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
