import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
// bcrypt password hashing shi goes here
const now = new Date();
// export const runtime = "nodejs";

export async function GET() {}

export async function POST(req: Request) {
	try {
		const { formData } = await req.json();
		// Convert email to lowercase for case-insensitive handling
		const lowercaseEmail = formData.email.toLowerCase();

		const existingUser = await prisma.user.findUnique({ where: { email: lowercaseEmail } });

		if (existingUser) {
			return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
		}

		console.log('SERVER SUCCESSFULLY RECIEVED FORMDATA: ', formData);
		console.log('Creating user...');
		const user = await prisma.user.create({
			data: {
				email: lowercaseEmail, // Store email as lowercase
				name: formData.fullName,
				username: formData.username,
				password: formData.password,
				profileImage: formData.profileImage || null,
				createdAt: now,
				updatedAt: now,
			},
		});

		console.log(`Account ${user.username} successfully created `);

		if (!user) throw new Error('User not found');

		return NextResponse.json(
			{
				message: 'Registration Success',
			},
			{ status: 200 }
		);
	} catch (err) {
		console.log('Failed to create user into prisma db' + err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
