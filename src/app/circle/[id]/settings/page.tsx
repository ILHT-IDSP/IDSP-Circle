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

	if (!circle) {
		return notFound();
	}

	const userId = parseInt(session.user.id);
	if (circle.creatorId !== userId) {
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
