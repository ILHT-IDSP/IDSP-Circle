import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
	const session = await auth();
	if (!session) {
		redirect('/auth/login');
	}

	// Redirect to the user's profile page using their username
	redirect(`/${session.user.username}`);
}
