import DemoNavBar from '@/components/top_nav/DemoNavBar';
import prisma from '@/lib/prisma';
import CircleHolder from '@/components/circle_holders';
import AlbumCard from '@/components/album/AlbumCard';
import NavBar from '@/components/bottom_bar/NavBar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
	// Get the current user's session
	const session = await auth();

	// If not logged in, redirect to login page
	if (!session || !session.user) {
		redirect('/auth/login');
	}

	// Get user ID from session
	const userId = parseInt(session.user.id);

	// Get circles the user is a member of
	const userCircles = await prisma.membership.findMany({
		where: {
			userId: userId,
		},
		select: {
			circle: {
				select: {
					id: true,
					name: true,
					avatar: true,
				},
			},
		},
	}); // Format the circles data for display
	const userCirclesFormatted = userCircles.map(membership => membership.circle);

	// Define the type for suggested circles
	interface SuggestedCircle {
		id: number;
		name: string;
		avatar: string | null;
		_count: {
			members: number;
		};
	}

	// Fetch all circles if user is not in any circles (for suggestions)
	let suggestedCircles: SuggestedCircle[] = [];
	if (userCirclesFormatted.length === 0) {
		suggestedCircles = await prisma.circle.findMany({
			select: {
				id: true,
				name: true,
				avatar: true,
				_count: {
					select: {
						members: true,
					},
				},
			},
			orderBy: {
				members: {
					_count: 'desc',
				},
			},
			take: 10, // Limit to 10 most popular circles
		});
	}

	// Get users that the current user follows
	const following = await prisma.follow.findMany({
		where: {
			followerId: userId,
		},
		select: {
			following: {
				select: {
					id: true,
				},
			},
		},
	});

	// Extract the IDs of users being followed
	const followingIds = following.map(f => f.following.id);
	// Get albums from users that the current user follows
	const followingAlbums = await prisma.album.findMany({
		where: {
			creatorId: {
				in: followingIds,
			},
		},
		include: {
			creator: true,
			_count: {
				select: {
					Photo: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: 10, // Limit to 10 most recent albums
	});

	return (
		<>
			<DemoNavBar />
			<main className='w-full max-w-xl mx-auto min-h-screen bg-background flex flex-col items-center px-2 pb-8'>
				<section className='w-full mt-4'>
					{userCirclesFormatted.length > 0 ? (
						<>
							<h2 className='text-lg font-bold mb-2'>Your Circles</h2>
							<div className='flex flex-row gap-4 overflow-x-auto pb-2'>
								{' '}
								{userCirclesFormatted.map(circle => (
									<div
										key={circle.id}
										className='flex-shrink-0'
									>
										<CircleHolder
											imageSrc={circle.avatar || '/images/circles/default.svg'}
											name={circle.name}
											circleSize={80}
											link={`/circle/${circle.id}`}
										/>
									</div>
								))}
							</div>
						</>
					) : (
						<>
							{' '}
							<h2 className='text-lg font-bold mb-2'>Suggested Circles</h2>
							<p className='text-circles-light opacity-80 mb-3 text-sm'>You&apos;re not in any circles yet. Here are some you might like:</p>
							{suggestedCircles.length > 0 ? (
								<>
									<div className='flex flex-row gap-4 overflow-x-auto pb-2'>
										{' '}
										{suggestedCircles.map(circle => (
											<div
												key={circle.id}
												className='flex-shrink-0'
											>
												<CircleHolder
													imageSrc={circle.avatar || '/images/circles/default.svg'}
													name={circle.name}
													circleSize={80}
													link={`/circle/${circle.id}`}
												/>{' '}
												<p className='text-xs text-center text-circles-light opacity-80 mt-1'>
													{circle._count.members} {circle._count.members === 1 ? 'member' : 'members'}
												</p>
											</div>
										))}
									</div>
									<div className='mt-3 text-center'>
										<Link
											href='/create/circle'
											className='inline-block px-4 py-2 bg-circles-dark-blue text-sm rounded-lg hover:bg-opacity-90 transition'
										>
											<span className='text-circles-light'>Create Your Own Circle</span>
										</Link>
									</div>
								</>
							) : (
								<div className='py-6 text-center bg-opacity-10 bg-circles-light rounded-lg'>
									<p className='text-circles-light mb-3'>No circles found</p>{' '}
									<Link
										href='/create/circle'
										className='px-4 py-2 bg-circles-dark-blue rounded-lg text-sm hover:bg-opacity-90 transition'
									>
										<span className='text-circles-light'>Create a Circle</span>
									</Link>
								</div>
							)}
						</>
					)}
				</section>{' '}
				<section className='w-full my-8 mb-32'>
					<h2 className='text-lg font-bold mb-2'>Albums</h2>
					{followingAlbums.length > 0 ? (
						<div className='grid grid-cols-2 gap-4'>
							{' '}
							{followingAlbums.map(album => (
								<AlbumCard
									key={album.id}
									albumId={album.id}
									albumImage={album.coverImage || '/images/albums/default.svg'}
									albumName={album.title}
									userProfileImage={album.creator?.profileImage || '/images/default-avatar.png'}
									photoCount={album._count.Photo}
								/>
							))}
						</div>
					) : (
						<div className='py-6 text-center bg-opacity-10 bg-circles-light rounded-lg'>
							<p className='text-circles-light mb-3'>No albums from your network yet</p>
							<p className='text-sm text-circles-light opacity-70'>Follow more users or create your own album</p>
							<div className='mt-3 flex justify-center space-x-3'>
								{' '}
								<Link
									href='/search'
									className='px-3 py-2 bg-circles-dark-blue rounded-lg text-sm hover:bg-opacity-90 transition'
								>
									<span className='text-circles-light'>Find Users</span>
								</Link>{' '}
								<Link
									href='/create/album'
									className='px-3 py-2 bg-circles-dark-blue rounded-lg text-sm hover:bg-opacity-90 transition'
								>
									<span className='text-circles-light'>Create Album</span>
								</Link>
							</div>
						</div>
					)}
					<NavBar />
				</section>
			</main>
		</>
	);
}
