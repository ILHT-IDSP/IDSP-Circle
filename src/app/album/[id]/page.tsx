import { Metadata } from 'next';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import AlbumDetail from '@/components/album/AlbumDetail';
import NavBar from '@/components/bottom_bar/NavBar';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
	try {
		const resolvedParams = await params;
		const albumId = parseInt(resolvedParams.id);

		if (isNaN(albumId)) {
			return {
				title: 'Album Not Found | Circle',
				description: 'The requested album could not be found',
			};
		}

		const album = await prisma.album.findUnique({
			where: { id: albumId },
			select: { title: true },
		});

		if (!album) {
			return {
				title: 'Album Not Found | Circle',
				description: 'The requested album could not be found',
			};
		}

		return {
			title: `${album.title} | Circle Albums`,
			description: `View photos in the ${album.title} album on Circle`,
		};
	} catch (e) {
		console.error(e);
		return {
			title: 'Album | Circle',
			description: 'View an album on Circle',
		};
	}
}

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
	const session = await auth();
	const resolvedParams = await params;
	const albumId = parseInt(resolvedParams.id);

	if (isNaN(albumId)) {
		return <div>Invalid album ID</div>;
	}
	const album = await prisma.album.findUnique({
		where: { id: albumId },
		include: {
			Photo: {
				orderBy: { createdAt: 'desc' },
			},
			creator: {
				select: {
					id: true,
					username: true,
					name: true,
					profileImage: true,
				},
			},
			Circle: {
				select: {
					id: true,
					name: true,
					avatar: true,
				},
			},
			_count: {
				select: {
					AlbumLike: true,
					AlbumComment: true,
					Photo: true,
				},
			},
		},
	});

	if (!album) {
		return <div>Album not found</div>;
	}
	let isLiked = false;

	if (session?.user) {
		const like = await prisma.albumLike.findUnique({
			where: {
				userId_albumId: {
					userId: parseInt(session.user.id),
					albumId: album.id,
				},
			},
		});

		isLiked = !!like;
	}
	// Format dates to strings for the component
	const formattedAlbum = {
		...album,
		createdAt: album.createdAt.toISOString(),
		Photo: album.Photo.map(photo => ({
			...photo,
			createdAt: photo.createdAt.toISOString(),
			updatedAt: photo.updatedAt.toISOString()
		}))
	};

	return (
		<>
			<AlbumDetail
				album={formattedAlbum}
				isLiked={isLiked}
				session={session}
			/>
			<NavBar />
		</>
	);
}
