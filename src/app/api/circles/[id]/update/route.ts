import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const updateCircleSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100),
	description: z.string().max(500).nullish(),
	isPrivate: z.boolean(),
});

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
			return NextResponse.json({ error: 'Only the circle creator can update settings' }, { status: 403 });
		}

		// Parse and validate request body
		const requestBody = await request.json();
		const validationResult = updateCircleSchema.safeParse(requestBody);

		if (!validationResult.success) {
			return NextResponse.json(
				{
					error: 'Invalid input',
					details: validationResult.error.issues,
				},
				{ status: 400 }
			);
		}

		const { name, description, isPrivate } = validationResult.data;

		// Update the circle
		const updatedCircle = await prisma.circle.update({
			where: { id: circleId },
			data: {
				name,
				description,
				isPrivate,
			},
		});

		return NextResponse.json({
			message: 'Circle updated successfully',
			circle: {
				id: updatedCircle.id,
				name: updatedCircle.name,
				description: updatedCircle.description,
				isPrivate: updatedCircle.isPrivate,
			},
		});
	} catch (error) {
		console.error('Error updating circle:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
