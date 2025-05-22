import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
	try {
		const session = await auth();

		// Check if user is authenticated
		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		} // Get profile data from request body
		const { name, bio, username, email, profileImage, isProfilePrivate } = await request.json();

		// Convert email to lowercase if provided
		const lowerCaseEmail = email ? email.toLowerCase() : undefined;

		// Validate the data
		if (username && username !== session.user.username) {
			// Check if username is already taken
			const existingUser = await prisma.user.findUnique({
				where: { username },
			});

			if (existingUser) {
				return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
			}
		}

		// If email is being changed, check if it's already in use
		if (lowerCaseEmail && lowerCaseEmail !== session.user.email) {
			const existingEmailUser = await prisma.user.findUnique({
				where: { email: lowerCaseEmail },
			});

			if (existingEmailUser) {
				return NextResponse.json({ error: 'Email is already in use' }, { status: 400 });
			}
		}
		// Update the user profile
		const updatedUser = await prisma.user.update({
			where: {
				id: parseInt(session.user.id),
			},
			data: {
				name: name || undefined,
				bio: bio || undefined,
				username: username || undefined,
				email: lowerCaseEmail, // Add email field with lowercase value
				profileImage: profileImage || undefined, // Add profileImage field
				isProfilePrivate: typeof isProfilePrivate === 'boolean' ? isProfilePrivate : undefined,
			},
		});
		return NextResponse.json({
			success: true,
			user: {
				id: updatedUser.id,
				name: updatedUser.name,
				username: updatedUser.username,
				bio: updatedUser.bio,
				email: updatedUser.email, // Include email in response
				profileImage: updatedUser.profileImage,
				isProfilePrivate: updatedUser.isProfilePrivate,
				usernameChanged: username && username !== session.user.username,
			},
		});
	} catch (error) {
		console.error('Error updating profile:', error);
		return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
	}
}
