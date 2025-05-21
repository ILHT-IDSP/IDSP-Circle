import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

/**
 * Endpoint to invite users to a circle
 */
export async function POST(request: Request, { params }) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const resolvedParams = await params;
		const circleId = parseInt(resolvedParams.id, 10);
		const userId = parseInt(session.user.id, 10);

		if (isNaN(circleId)) {
			return NextResponse.json({ error: 'Invalid circle ID' }, { status: 400 });
		}

		// Parse request body
		const { targetUserId } = await request.json();
		if (!targetUserId) {
			return NextResponse.json({ error: 'Missing targetUserId' }, { status: 400 });
		}

		// Validate the circle exists
		const circle = await prisma.circle.findUnique({
			where: { id: circleId },
			select: {
				id: true,
				name: true,
				creatorId: true,
				members: {
					where: { userId },
					select: { role: true },
				},
			},
		});

		if (!circle) {
			return NextResponse.json({ error: 'Circle not found' }, { status: 404 });
		}

		// Validate permissions - user must be a member with appropriate permissions
		const isCreator = circle.creatorId === userId;
		const membership = circle.members.length > 0 ? circle.members[0] : null;

		// Check if target user exists
		const targetUser = await prisma.user.findUnique({
			where: { id: parseInt(targetUserId, 10) },
			select: { id: true },
		});

		if (!targetUser) {
			return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
		}

		// Check if user is already a member
		const existingMembership = await prisma.membership.findUnique({
			where: {
				userId_circleId: {
					userId: parseInt(targetUserId, 10),
					circleId,
				},
			},
		});

		if (existingMembership) {
			return NextResponse.json(
				{
					error: 'User is already a member of this circle',
				},
				{ status: 409 }
			);
		} // Check if there's already a pending invitation
		const existingInvite = await prisma.activity.findFirst({
			where: {
				type: 'circle_invite',
				userId: parseInt(targetUserId, 10), // Activity belongs to the target user
				circleId: circleId,
				content: { contains: `user:${userId} invited` }, // Invitation from the current user
			},
		});

		if (existingInvite) {
			return NextResponse.json(
				{
					error: 'An invitation has already been sent to this user',
				},
				{ status: 409 }
			);
		} // Create the invite activity
		// Store the target user info in the content since there's no dedicated field for target user
		const activity = await prisma.activity.create({
			data: {
				type: 'circle_invite',
				content: `user:${userId} invited user:${targetUserId} to join "${circle.name}"`,
				userId: parseInt(targetUserId, 10), // Activity belongs to the target user (who receives the invitation)
				circleId: circleId,
			},
		});

		return NextResponse.json({
			success: true,
			message: 'Invitation sent successfully',
			activity,
		});
	} catch (error) {
		console.error('Error sending circle invitation:', error);
		return NextResponse.json(
			{
				error: 'Failed to send invitation',
			},
			{ status: 500 }
		);
	}
}
