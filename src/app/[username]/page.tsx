import ProfileScreen from '@/components/profile/ProfileScreen';
import { auth } from '@/auth';
import NavBar from '@/components/bottom_bar/NavBar';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
	const resolvedParams = await params;
	const username = resolvedParams.username;

	try {
		const user = await prisma.user.findUnique({
			where: { username },
			select: { name: true },
		});

		const displayName = user?.name || username;

		return {
			title: `${displayName} (@${username}) | Circle`,
			description: `View ${displayName}'s profile on Circle`,
		};
	} catch (e) {
		console.error(e);
		return {
			title: 'Profile | Circle',
			description: 'A user profile on Circle',
		};
	}
}

export default async function UserProfilePage({ params }: { params: { username: string } }) {
	const session = await auth();
	const resolvedParams = await params;
	const username = resolvedParams.username;

	return (
		<>
			<ProfileScreen
				session={session}
				username={username}
			/>
			<NavBar />
		</>
	);
}
