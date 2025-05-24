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
		// Get circles where the user is either a creator or a member in a single transaction
		const [ownedCircles, memberCircles] = await PrismaUtils.transaction(async (tx) => {
			const ownedQuery = tx.circle.findMany({
				where: {
					creatorId: userId,
				},
				select: {
					id: true,
					name: true,
					avatar: true,
					isPrivate: true,
					_count: {
						select: {
							members: true,
						},
					},
				},
			});

			const memberQuery = tx.membership.findMany({
				where: {
					userId,
				},
				select: {
					circle: {
						select: {
							id: true,
							name: true,
							avatar: true,
							isPrivate: true,
							_count: {
								select: {
									members: true,
								},
							},
						},
					},
					role: true,
				},
			});

			return Promise.all([ownedQuery, memberQuery]);
		});

		const circlesWithPermission = [
			...ownedCircles.map(circle => ({
				...circle,
				role: 'CREATOR', // Mark as creator for UI display
				canCreateAlbum: true,
			})),
			...memberCircles.map(membership => ({
				...membership.circle,
				role: membership.role,
				canCreateAlbum: true, // All members can create albums
			})),
		];

		return NextResponse.json(
			{
				circles: circlesWithPermission,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error fetching user circles:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
