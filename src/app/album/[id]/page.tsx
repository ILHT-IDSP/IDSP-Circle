import { Metadata } from 'next';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import AlbumDetail from '@/components/album/AlbumDetail';
import NavBar from '@/components/bottom_bar/NavBar';
import { redirect } from 'next/navigation';

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

	// First fetch basic album info with circle details
	const albumBasicInfo = await prisma.album.findUnique({
		where: { id: albumId },
		select: {
			id: true,
			Circle: {
				select: {
					id: true,
					isPrivate: true,
					creatorId: true,
				},
			},
		},
	});

	if (!albumBasicInfo) {
		return <div>Album not found</div>;
	}

	// Check if album belongs to a private circle and enforce access control
	if (albumBasicInfo.Circle?.isPrivate) {
		const userId = session?.user?.id ? parseInt(session.user.id) : null;

		// Allow access if user is the circle creator
		const isCreator = userId === albumBasicInfo.Circle.creatorId;

		// Otherwise, check if user is a member
		if (!isCreator && userId) {
			const membership = await prisma.membership.findUnique({
				where: {
					userId_circleId: {
						userId,
						circleId: albumBasicInfo.Circle.id,
					},
				},
			});

			// If not a member, redirect to circle page to show the join request UI
			if (!membership) {
				redirect(`/circle/${albumBasicInfo.Circle.id}`);
			}
		} else if (!isCreator && !userId) {
			// Not logged in, redirect to login page
			redirect('/auth/login');
		}
	}

	// Now fetch full album details since user has access
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
					isPrivate: true,
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
			updatedAt: photo.updatedAt.toISOString(),
		})),
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
