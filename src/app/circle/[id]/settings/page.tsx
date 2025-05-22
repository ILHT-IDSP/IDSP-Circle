import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import NavBar from '@/components/bottom_bar/NavBar';
import CircleSettingsForm from '@/components/circle/CircleSettingsForm';

interface PageParams {
	params: Promise<{
		id: string;
	}>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
	const { id: paramId } = await params;
	const id = parseInt(paramId);
	if (isNaN(id)) return { title: 'Circle Not Found' };

	try {
		const circle = await prisma.circle.findUnique({
			where: { id },
			select: { name: true },
		});

		if (!circle) return { title: 'Circle Not Found' };

		return {
			title: `${circle.name} Settings | Circle`,
			description: `Edit settings for the ${circle.name} circle`,
		};
	} catch (e) {
		console.error(e);
		return {
			title: 'Circle Settings | Circle App',
			description: 'Edit circle settings',
		};
	}
}

export default async function CircleSettingsPage({ params }: PageParams) {
	const session = await auth();

	if (!session || !session.user) {
		redirect('/auth/login');
	}

	const { id: paramId } = await params;
	const id = parseInt(paramId);
	if (isNaN(id)) {
		return notFound();
	}
	const circle = await prisma.circle.findUnique({
		where: { id },
		select: {
			id: true,
			creatorId: true,
		},
	});

	// Get the user's membership in this circle to check their role
	const membership = await prisma.membership.findUnique({
		where: {
			userId_circleId: {
				userId: parseInt(session.user.id),
				circleId: id,
			},
		},
		select: {
			role: true,
		},
	});

	if (!circle) {
		return notFound();
	}

	// Check if the user is the creator, has an ADMIN role, or has a MODERATOR role
	const userId = parseInt(session.user.id);
	const isAdmin = circle.creatorId === userId || membership?.role === 'ADMIN';
	const isModerator = membership?.role === 'MODERATOR';

	// Only admins and moderators can access settings
	if (!isAdmin && !isModerator) {
		// Redirect to circle page if not admin or moderator
		redirect(`/circle/${id}`);
	}
	if (circle.creatorId !== userId && !isAdmin) {
		redirect(`/circle/${id}`);
	}

	return (
		<>
			<CircleSettingsForm
				circleId={id}
				session={session}
			/>
			<NavBar />
		</>
	);
}
