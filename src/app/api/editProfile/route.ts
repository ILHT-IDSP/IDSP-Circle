import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
	const session = await auth();
	if (!session || !session.user?.email) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { name, email, avatar } = await req.json();

	try {
		const user = await prisma.user.update({
			where: { email: session.user.email },
			data: {
				name,
				email,
				profileImage: avatar,
			},
		});
		return NextResponse.json({ user });
	} catch (error: unknown) {
		if (error instanceof Error) return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
	}
}
