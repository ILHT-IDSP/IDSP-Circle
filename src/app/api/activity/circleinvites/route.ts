import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { PrismaUtils } from '@/lib/prisma-utils';

export async function GET(req: NextRequest) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		} // OPTIMIZATION: Use transaction to batch all queries and eliminate N+1 pattern
		const result = await PrismaUtils.transaction(async tx => {
			// Get all circle invites for the current user
			const circleInvites = await tx.activity.findMany({
				where: {
					type: 'circle_invite',
					userId: parseInt(session.user.id),
				},
				orderBy: { createdAt: 'desc' },
				include: {
					user: {
						select: {
							id: true,
							name: true,
							username: true,
							profileImage: true,
						},
					},
					circle: {
						select: {
							id: true,
							name: true,
							avatar: true,
							description: true,
						},
					},
				},
			});

			// Extract all unique inviter IDs from content
			const inviterIds = new Set<number>();
			circleInvites.forEach(invite => {
				const contentMatch = invite.content?.match(/user:(\d+) invited/);
				const inviterId = contentMatch ? parseInt(contentMatch[1]) : null;
				if (inviterId) {
					inviterIds.add(inviterId);
				}
			});

			// OPTIMIZATION: Batch fetch all inviters in single query
			const inviters =
				inviterIds.size > 0
					? await tx.user.findMany({
							where: {
								id: { in: Array.from(inviterIds) },
							},
							select: {
								id: true,
								name: true,
								username: true,
								profileImage: true,
							},
					  })
					: [];

			// Create a map for O(1) lookup
			const inviterMap = new Map(inviters.map(user => [user.id, user])); // Process invites with inviter data
			const enhancedInvites = circleInvites.map(invite => {
				const contentMatch = invite.content?.match(/user:(\d+) invited/);
				const inviterId = contentMatch ? parseInt(contentMatch[1]) : null;

				let inviter: (typeof inviters)[0] | null = null;
				if (inviterId && inviterMap.has(inviterId)) {
					inviter = inviterMap.get(inviterId) || null;
				}

				// Format the content to be more user-friendly
				let formattedContent = invite.content;
				if (inviter) {
					formattedContent = `invited you to join "${invite.circle?.name}"`;
				}

				return {
					...invite,
					inviter,
					formattedContent,
				};
			});

			return enhancedInvites;
		});

		return NextResponse.json(result);
	} catch (error) {
		console.error('Error fetching circle invites:', error);
		return NextResponse.json({ error: 'Failed to fetch circle invites' }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { id, action } = await req.json();
		if (!id || !action) {
			return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
		}

		// Verify activity belongs to user
		const activity = await prisma.activity.findFirst({
			where: {
				id: id,
				userId: parseInt(session.user.id),
				type: 'circle_invite',
			},
			include: {
				circle: true,
			},
		});

		if (!activity) {
			return NextResponse.json({ error: 'Circle invite not found' }, { status: 404 });
		}
		if (action === 'accept') {
			// Extract the inviter user ID from the content
			const contentMatch = activity.content?.match(/user:(\d+) invited/);
			const inviterId = contentMatch ? parseInt(contentMatch[1]) : null;

			// Create membership
			await prisma.$transaction([
				// Delete this invitation
				prisma.activity.delete({
					where: { id },
				}),
				// Create membership
				prisma.membership.create({
					data: {
						userId: parseInt(session.user.id),
						circleId: activity.circleId!,
						role: 'MEMBER',
					},
				}),
				// Create an activity record for the circle join
				prisma.activity.create({
					data: {
						type: 'circle_join',
						content: `joined the circle "${activity.circle!.name}"`,
						userId: parseInt(session.user.id),
						circleId: activity.circleId!,
					},
				}),
			]);
		} else if (action === 'decline') {
			await prisma.activity.delete({
				where: { id },
			});
		} else {
			return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error updating circle invite:', error);
		return NextResponse.json({ error: 'Failed to update circle invite' }, { status: 500 });
	}
}
