import { handlers } from '@/auth';
import { NextResponse } from 'next/server';

// Add error handling for auth handlers
export async function GET(req: Request) {
	try {
		return await handlers.GET(req);
	} catch (error) {
		console.error('NextAuth GET handler error:', error);
		return NextResponse.json({ error: 'Authentication service error' }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		return await handlers.POST(req);
	} catch (error) {
		console.error('NextAuth POST handler error:', error);
		return NextResponse.json({ error: 'Authentication service error' }, { status: 500 });
	}
}

// Add HEAD handler for session checks
export async function HEAD(req: Request) {
	try {
		return await handlers.HEAD?.(req) || new Response(null, { status: 200 });
	} catch (error) {
		console.error('NextAuth HEAD handler error:', error);
		return new Response(null, { status: 200 });
	}
}

// Add PATCH handler for session updates
export async function PATCH(req: Request) {
	try {
		return await handlers.PATCH?.(req) || NextResponse.json({}, { status: 200 });
	} catch (error) {
		console.error('NextAuth PATCH handler error:', error);
		return NextResponse.json({ error: 'Authentication service error' }, { status: 500 });
	}
}
