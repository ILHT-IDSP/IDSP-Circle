import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }) {
	try {
		const session = await auth();
		const resolvedParams = await params;
		const userId = session?.user?.id ? parseInt(session.user.id, 10) : null;
		const circleId = parseInt(resolvedParams.id, 10);

		if (isNaN(circleId)) {
			return NextResponse.json({ error: 'Invalid circle ID' }, { status: 400 });
		}

		// Check if the circle exists and if it's private
		const circle = await prisma.circle.findUnique({
			where: { id: circleId },
			select: {
				isPrivate: true,
				creatorId: true,
			},
		});

		if (!circle) {
			return NextResponse.json({ error: 'Circle not found' }, { status: 404 });
		}

		// For private circles, check if the user is a member
		if (circle.isPrivate && userId !== circle.creatorId) {
			const membership = await prisma.membership.findUnique({
				where: {
					userId_circleId: {
						userId: userId as number,
						circleId,
					},
				},
			});

			if (!membership) {
				return NextResponse.json({ error: 'Access denied to private circle' }, { status: 403 });
			}
		}
		// Get all members with their basic info
		const members = await prisma.membership.findMany({
			where: { circleId },
			include: {
				user: {
					select: {
						id: true,
						username: true,
						name: true,
						profileImage: true,
					},
				},
			},
			orderBy: [
				{ role: 'asc' }, // ADMIN comes before MEMBER alphabetically
				{ createdAt: 'asc' },
			],
		});

		// Get all pending invitations for this circle
		const invites = await prisma.activity.findMany({
			where: {
				type: 'circle_invite',
				circleId,
			},
			select: {
				id: true,
				userId: true,
				createdAt: true,
				user: {
					select: {
						id: true,
						username: true,
						name: true,
						profileImage: true,
					},
				},
			},
		});

		// Format the response
		const formattedMembers = members.map(member => ({
			id: member.user.id,
			username: member.user.username,
			name: member.user.name,
			profileImage: member.user.profileImage,
			role: member.role,
		}));

		const formattedInvites = invites.map(invite => ({
			id: invite.id,
			userId: invite.userId,
			username: invite.user.username,
			name: invite.user.name,
			profileImage: invite.user.profileImage,
			createdAt: invite.createdAt,
		}));

		return NextResponse.json({
			members: formattedMembers,
			invites: formattedInvites,
		});
	} catch (error) {
		console.error('Error fetching circle members:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
