import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

// Validation schema for registration
const registrationSchema = z
	.object({
		email: z.string().email('Invalid email format').toLowerCase(),
		confirmEmail: z.string(),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
			.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
			.regex(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Password must contain at least one number or special character'),
		confirmPassword: z.string(),
		fullName: z.string().min(1, 'Full name is required'),
		username: z
			.string()
			.min(3, 'Username must be at least 3 characters')
			.max(20, 'Username must be at most 20 characters')
			.regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, 'Username must start with a letter and contain only letters, numbers, underscores, and hyphens')
			.transform(val => val.toLowerCase()) // Make usernames lowercase for URL consistency
			.refine(val => !val.endsWith('-') && !val.endsWith('_'), {
				message: 'Username cannot end with a hyphen or underscore',
			}),
		profileImage: z.string().optional(),
	})
	.refine(data => data.email === data.confirmEmail, {
		message: "Emails don't match",
		path: ['confirmEmail'],
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export async function GET() {}

export async function POST(req: Request) {
	try {
		const { formData } = await req.json();

		// Validate input data
		const validationResult = registrationSchema.safeParse(formData);
		if (!validationResult.success) {
			const errorMessages = validationResult.error.errors.map(err => ({
				field: err.path.join('.'),
				message: err.message,
			}));
			return NextResponse.json(
				{
					error: 'Validation failed',
					details: errorMessages,
				},
				{ status: 400 }
			);
		}

		const validatedData = validationResult.data;

		// Check if email already exists
		const existingEmail = await prisma.user.findUnique({
			where: { email: validatedData.email },
		});

		if (existingEmail) {
			return NextResponse.json(
				{
					error: 'Email already in use',
					field: 'email',
				},
				{ status: 409 }
			);
		}

		// Check if username already exists
		const existingUsername = await prisma.user.findUnique({
			where: { username: validatedData.username },
		});

		if (existingUsername) {
			return NextResponse.json(
				{
					error: 'Username already taken',
					field: 'username',
				},
				{ status: 409 }
			);
		}

		console.log('SERVER SUCCESSFULLY RECEIVED FORMDATA: ', validatedData);
		console.log('Creating user...');

		const now = new Date();
		const user = await prisma.user.create({
			data: {
				email: validatedData.email,
				name: validatedData.fullName,
				username: validatedData.username,
				password: validatedData.password, // Note: In production, hash this password
				profileImage: validatedData.profileImage || null,
				createdAt: now,
				updatedAt: now,
			},
		});

		console.log(`Account ${user.username} successfully created`);

		return NextResponse.json(
			{
				message: 'Registration successful',
				user: {
					id: user.id,
					email: user.email,
					username: user.username,
					name: user.name,
				},
			},
			{ status: 201 }
		);
	} catch (err) {
		console.error('Failed to create user:', err);
		return NextResponse.json(
			{
				error: 'Internal server error',
				message: 'Failed to create account. Please try again.',
			},
			{ status: 500 }
		);
	}
}
