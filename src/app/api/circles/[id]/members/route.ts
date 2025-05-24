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
		} // OPTIMIZATION: Use transaction to batch all queries and access checks
		const result = await PrismaUtils.transaction(async tx => {
			// Check if the circle exists and if it's private
			const circle = await tx.circle.findUnique({
				where: { id: circleId },
				select: {
					isPrivate: true,
					creatorId: true,
				},
			});

			if (!circle) {
				return null; // Will be handled outside transaction
			}

			// For private circles, check if the user is a member
			if (circle.isPrivate && userId !== circle.creatorId) {
				const membership = await tx.membership.findUnique({
					where: {
						userId_circleId: {
							userId: userId as number,
							circleId,
						},
					},
				});

				if (!membership) {
					return { accessDenied: true };
				}
			}

			// OPTIMIZATION: Batch both member and invite queries
			const [members, invites] = await Promise.all([
				// Get all members with their basic info
				tx.membership.findMany({
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
				}),
				// Get all pending invitations for this circle
				tx.activity.findMany({
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
				}),
			]);

			return { members, invites };
		});

		// Handle circle not found error
		if (!result) {
			return NextResponse.json({ error: 'Circle not found' }, { status: 404 });
		}

		// Handle access denied error
		if ('accessDenied' in result) {
			return NextResponse.json({ error: 'Access denied to private circle' }, { status: 403 });
		}
		// Format the response
		const formattedMembers = result.members.map(member => ({
			id: member.user.id,
			username: member.user.username,
			name: member.user.name,
			profileImage: member.user.profileImage,
			role: member.role,
		}));

		const formattedInvites = result.invites.map(invite => ({
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
