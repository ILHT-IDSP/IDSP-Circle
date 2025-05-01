import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
	try {
		const users = await prisma.user.findMany();
		return NextResponse.json(users);
	} catch (error) {
		console.error('Error fetching users:', error);
		return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const data = await request.json();

		if (!data.email) {
			return NextResponse.json({ error: 'Email is required' }, { status: 400 });
		}

		const user = await prisma.user.create({
			data,
		});

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
	}
}
