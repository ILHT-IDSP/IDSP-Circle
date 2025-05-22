import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
	try {
		const session = await auth();

		if (!session || !session.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const userId = parseInt(session.user.id, 10);

		// Get circles where the user is either a creator or a member
		const ownedCircles = await prisma.circle.findMany({
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
		const memberCircles = await prisma.membership.findMany({
			where: {
				userId,
				// Include all roles, not just admin and moderator
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
