import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { PrismaUtils } from '@/lib/prisma-utils';

export async function GET(request: Request) {
	try {
		const session = await auth();

		if (!session || !session.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const userId = parseInt(session.user.id, 10);

		// OPTIMIZATION: Use transaction to batch circle queries for both owned and member circles
		const result = await PrismaUtils.transaction(async tx => {
			// Get circles where the user is either a creator or a member
			const [ownedCircles, memberCircles] = await Promise.all([
				// Circles created by the user
				tx.circle.findMany({
					where: {
						creatorId: userId,
					},
					select: {
						id: true,
						name: true,
						avatar: true,
						isPrivate: true,
						creatorId: true,
						_count: {
							select: {
								members: true,
							},
						},
					},
					orderBy: { createdAt: 'desc' },
				}),
				// Circles where user is a member (excluding created ones)
				tx.membership.findMany({
					where: {
						userId,
					},
					select: {
						role: true,
						circle: {
							select: {
								id: true,
								name: true,
								avatar: true,
								isPrivate: true,
								creatorId: true,
								_count: {
									select: {
										members: true,
									},
								},
							},
						},
					},
				}),
			]);

			return { ownedCircles, memberCircles };
		});

		// Format circles with permission info for album creation
		const circlesWithPermission = [
			// Add owned circles first (creator has all permissions)
			...result.ownedCircles.map(circle => ({
				id: circle.id,
				name: circle.name,
				avatar: circle.avatar,
				isPrivate: circle.isPrivate,
				creatorId: circle.creatorId,
				memberCount: circle._count.members,
				role: 'CREATOR',
				canCreateAlbum: true,
			})),
			// Add member circles (all members can create albums)
			...result.memberCircles
				.filter(membership => membership.circle.creatorId !== userId) // Exclude owned circles
				.map(membership => ({
					id: membership.circle.id,
					name: membership.circle.name,
					avatar: membership.circle.avatar,
					isPrivate: membership.circle.isPrivate,
					creatorId: membership.circle.creatorId,
					memberCount: membership.circle._count.members,
					role: membership.role,
					canCreateAlbum: true,
				})),
		];

		return NextResponse.json(
			{
				success: true,
				data: circlesWithPermission,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error fetching user circles:', error);
		return NextResponse.json({ error: 'Failed to fetch circles' }, { status: 500 });
	}
}
