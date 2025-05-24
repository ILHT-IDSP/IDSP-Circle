import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { PrismaUtils } from '@/lib/prisma-utils';

export async function POST(req: NextRequest) {
	const session = await auth();
	if (!session || !session.user?.email) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { name, email, avatar } = await req.json();

	// Convert email to lowercase for case-insensitive handling
	const lowercaseEmail = email ? email.toLowerCase() : undefined;

	try {
		// OPTIMIZATION: Use transaction to batch validation and update operations
		const user = await PrismaUtils.transaction(async (tx) => {
			// If email is changing, check if it's already taken
			if (lowercaseEmail && lowercaseEmail !== session.user.email.toLowerCase()) {
				const existingUser = await tx.user.findUnique({
					where: { email: lowercaseEmail },
					select: { id: true },
				});

				if (existingUser) {
					throw new Error('Email already in use');
				}
			}

			// Update user profile
			return await tx.user.update({
				where: { email: session.user.email },
				data: {
					name,
					email: lowercaseEmail, // Store email as lowercase
					profileImage: avatar,
				},
			});
		});

		return NextResponse.json({ user });
	} catch (error: unknown) {
		console.error('Error updating profile:', error);
		if (error instanceof Error) {
			if (error.message === 'Email already in use') {
				return NextResponse.json({ error: error.message }, { status: 400 });
			}
			return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
		}
		return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
	}
}
