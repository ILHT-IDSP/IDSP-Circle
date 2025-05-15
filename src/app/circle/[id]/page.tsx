import { auth } from '@/auth';
// Import directly with relative path instead of alias to avoid module resolution issues
import CirclePageView from '../../../components/circle/CirclePageView';
import NavBar from '@/components/bottom_bar/NavBar';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface PageParams {
	params: Promise<{
		id: string;
	}>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
	// Await params before accessing its properties
	const { id: paramId } = await params;
	const id = parseInt(paramId);
	if (isNaN(id)) return { title: 'Circle Not Found' };

	try {
		// Fetch circle data to get the name
		const circle = await prisma.circle.findUnique({
			where: { id },
			select: { name: true },
		});

		if (!circle) return { title: 'Circle Not Found' };

		return {
			title: `${circle.name} | Circle`,
			description: `View the ${circle.name} circle on Circle`,
		};
	} catch (e) {
		console.error(e);
		return {
			title: 'Circle | Circle App',
			description: 'A circle on Circle App',
		};
	}
}

export default async function CirclePage({ params }: PageParams) {
	const session = await auth();

	// Await params before accessing its properties
	const { id: paramId } = await params;
	const id = parseInt(paramId);
	if (isNaN(id)) {
		return notFound();
	}

	return (
		<>
			<CirclePageView
				circleId={id}
				session={session}
			/>
			<NavBar />
		</>
	);
}
