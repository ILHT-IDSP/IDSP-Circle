import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
	const session = await auth();
	if (!session || !session.user?.email) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { name, email, avatar } = await req.json();

	// Convert email to lowercase for case-insensitive handling
	const lowercaseEmail = email ? email.toLowerCase() : undefined;

	// If email is changing, check if it's already taken
	if (lowercaseEmail && lowercaseEmail !== session.user.email.toLowerCase()) {
		const existingUser = await prisma.user.findUnique({
			where: { email: lowercaseEmail },
		});

		if (existingUser) {
			return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
		}
	}

	try {
		const user = await prisma.user.update({
			where: { email: session.user.email },
			data: {
				name,
				email: lowercaseEmail, // Store email as lowercase
				profileImage: avatar,
			},
		});
		return NextResponse.json({ user });
	} catch (error: unknown) {
		if (error instanceof Error) return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
	}
}
