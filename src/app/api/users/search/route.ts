import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the search term from the query parameters
    const searchParams = request.nextUrl.searchParams;
    const term = searchParams.get('term');
    
    if (!term || term.trim().length < 2) {
      return NextResponse.json({ users: [] }, { status: 200 });
    }
    
    // Search users by username or name
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: term, mode: 'insensitive' } },
          { name: { contains: term, mode: 'insensitive' } }
        ],
        NOT: {
          id: parseInt(session.user.id, 10) // Exclude the current user
        }
      },
      select: {
        id: true,
        username: true,
        name: true,
        profileImage: true,
        isProfilePrivate: true,
      },
      take: 10, // Limit results
    });

    return NextResponse.json({ 
      users: users.map(user => ({
        id: user.id,
        username: user.username,
        name: user.name,
        profileImage: user.profileImage,
        isPrivate: user.isProfilePrivate
      }))
    });
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json({ error: 'Failed to search users' }, { status: 500 });
  }
}
