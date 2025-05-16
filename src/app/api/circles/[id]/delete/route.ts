import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request, { params }) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const userId = parseInt(session.user.id, 10);
		const resolvedParams = await params;
		const circleId = parseInt(resolvedParams.id, 10);

		if (isNaN(circleId)) {
			return NextResponse.json({ error: 'Invalid circle ID' }, { status: 400 });
		}

		const circle = await prisma.circle.findUnique({
			where: { id: circleId },
			select: { creatorId: true },
		});

		if (!circle) {
			return NextResponse.json({ error: 'Circle not found' }, { status: 404 });
		}

		if (circle.creatorId !== userId) {
			return NextResponse.json({ error: 'Only the creator can delete this circle' }, { status: 403 });
		}

		await prisma.circle.delete({
			where: { id: circleId },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error deleting circle:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
