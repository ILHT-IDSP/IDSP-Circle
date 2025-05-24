import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

const validateSchema = z.object({
	field: z.enum(['email', 'username']),
	value: z.string().min(1),
});

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const validationResult = validateSchema.safeParse(body);
		if (!validationResult.success) {
			return NextResponse.json(
				{
					error: 'Invalid request data',
				},
				{ status: 400 }
			);
		}

		const { field, value } = validationResult.data;

		if (field === 'email') {
			const lowercaseEmail = value.toLowerCase();
			const existingUser = await prisma.user.findUnique({
				where: { email: lowercaseEmail },
			});

			return NextResponse.json({
				available: !existingUser,
				message: existingUser ? 'Email is already registered' : 'Email is available',
			});
		}
		if (field === 'username') {
			// Additional username validation for URL-friendliness
			const lowercaseUsername = value.toLowerCase();

			if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(lowercaseUsername)) {
				return NextResponse.json({
					available: false,
					message: 'Username must start with a letter and contain only letters, numbers, underscores, and hyphens',
				});
			}

			if (lowercaseUsername.length < 3 || lowercaseUsername.length > 20) {
				return NextResponse.json({
					available: false,
					message: 'Username must be between 3 and 20 characters',
				});
			}

			if (lowercaseUsername.endsWith('-') || lowercaseUsername.endsWith('_')) {
				return NextResponse.json({
					available: false,
					message: 'Username cannot end with a hyphen or underscore',
				});
			}

			const existingUser = await prisma.user.findUnique({
				where: { username: lowercaseUsername },
			});

			return NextResponse.json({
				available: !existingUser,
				message: existingUser ? 'Username is already taken' : 'Username is available',
			});
		}

		return NextResponse.json(
			{
				error: 'Invalid field',
			},
			{ status: 400 }
		);
	} catch (error) {
		console.error('Validation error:', error);
		return NextResponse.json(
			{
				error: 'Internal server error',
			},
			{ status: 500 }
		);
	}
}
