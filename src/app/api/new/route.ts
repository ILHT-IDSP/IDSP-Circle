import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export async function GET() {
	try {
		const session = await auth();

		if (!session) {
			redirect('/auth/login');
		}

		console.log('Create a circle or album');
		return NextResponse.json({ message: 'Authorized to create.' }, { status: 200 });
	} catch (err) {
		console.error('Error in route handler:', err);
		return NextResponse.json(
			{
				message: 'Not authorized to create',
			},
			{ status: 401 }
		);
	}
}
