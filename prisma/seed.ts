import { PrismaClient, User, Circle, Music, Post, Role } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
	console.log('Start seeding the database...');

	// Clean up existing data (optional - be careful in production)
	await cleanDatabase();

	// Create users
	const users = await createUsers();

	// Create circles
	const circles = await createCircles(users);

	// Create memberships (users joining circles)
	await createMemberships(users, circles);

	// Create music
	const music = await createMusic();

	// Create posts
	const posts = await createPosts(users, circles, music);

	// Create comments
	await createComments(users, posts);

	// Create likes
	await createLikes(users, posts);
	// Create follows
	await createFollows(users);

	// Create user settings
	await createUserSettings(users);

	// Create saved music
	await createSavedMusic(users, music);

	console.log('Seeding completed successfully!');
}

async function cleanDatabase() {
	console.log('Cleaning up existing data...');

	// Delete in order to respect foreign key constraints
	await prisma.like.deleteMany();
	await prisma.comment.deleteMany();
	await prisma.savedMusic.deleteMany();
	await prisma.post.deleteMany();
	await prisma.membership.deleteMany();
	await prisma.circle.deleteMany();
	await prisma.follow.deleteMany();
	await prisma.userSettings.deleteMany();
	await prisma.user.deleteMany();
	await prisma.music.deleteMany();
}

async function createUsers() {
	console.log('Creating users...');

	const userData = [
		{
			email: 'john.doe@example.com',
			name: 'John Doe',
			username: 'johndoe',
			bio: 'Music lover and avid concert-goer',
			profileImage: '/images/profile1.jpg',
			coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
		},
		{
			email: 'jane.smith@example.com',
			name: 'Jane Smith',
			username: 'janesmith',
			bio: 'Amateur DJ and electronic music producer',
			profileImage: '/images/profile2.jpg',
			coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
		},
		{
			email: 'alex.johnson@example.com',
			name: 'Alex Johnson',
			username: 'alexj',
			bio: 'Rock music enthusiast and guitarist',
			profileImage: '/images/profile3.jpg',
			coverImage: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34',
		},
		{
			email: 'maria.garcia@example.com',
			name: 'Maria Garcia',
			username: 'mariag',
			bio: 'Classical music lover and pianist',
			profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
			coverImage: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76',
		},
		{
			email: 'david.wilson@example.com',
			name: 'David Wilson',
			username: 'davidw',
			bio: 'Hip-hop producer and music collector',
			profileImage: 'https://randomuser.me/api/portraits/men/46.jpg',
			coverImage: 'https://images.unsplash.com/photo-1526328828355-69b01f8048b9',
		},
	];

	const users = [];

	for (const user of userData) {
		const createdUser = await prisma.user.create({
			data: user,
		});
		users.push(createdUser);
	}

	return users;
}

async function createCircles(users: User[]) {
	console.log('Creating circles...');

	const circlesData = [
		{
			name: 'Rock Enthusiasts',
			description: 'A circle for fans of rock music from all eras',
			avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
			coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
			isPrivate: false,
			creatorId: users[0].id,
		},
		{
			name: 'Electronic Music Producers',
			description: 'Share your tracks, get feedback, and collaborate',
			avatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
			coverImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81',
			isPrivate: false,
			creatorId: users[1].id,
		},
		{
			name: 'Classical Music Appreciation',
			description: 'Discussing the great composers and their works',
			avatar: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76',
			coverImage: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c',
			isPrivate: false,
			creatorId: users[3].id,
		},
		{
			name: 'Hip-Hop Collective',
			description: 'Celebrating hip-hop culture and music',
			avatar: 'https://images.unsplash.com/photo-1526328828355-69b01f8048b9',
			coverImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
			isPrivate: true,
			creatorId: users[4].id,
		},
		{
			name: 'Indie Music Discovery',
			description: 'Find and share hidden gems in the indie music scene',
			avatar: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34',
			coverImage: 'https://images.unsplash.com/photo-1532293064532-7083e5bd8974',
			isPrivate: false,
			creatorId: users[2].id,
		},
	];

	const circles = [];

	for (const circle of circlesData) {
		const createdCircle = await prisma.circle.create({
			data: circle,
		});
		circles.push(createdCircle);
	}

	return circles;
}

async function createMemberships(users: User[], circles: Circle[]) {
	console.log('Creating memberships...');

	// Each user is automatically a member (and admin) of their own circle
	// Let's add cross-memberships
	const memberships = [
		// User 0 joins other circles
		{ userId: users[0].id, circleId: circles[1].id, role: Role.MEMBER },
		{ userId: users[0].id, circleId: circles[2].id, role: Role.MEMBER },

		// User 1 joins other circles
		{ userId: users[1].id, circleId: circles[0].id, role: Role.MEMBER },
		{ userId: users[1].id, circleId: circles[4].id, role: Role.MODERATOR },

		// User 2 joins other circles
		{ userId: users[2].id, circleId: circles[0].id, role: Role.MODERATOR },
		{ userId: users[2].id, circleId: circles[3].id, role: Role.MEMBER },

		// User 3 joins other circles
		{ userId: users[3].id, circleId: circles[1].id, role: Role.MEMBER },
		{ userId: users[3].id, circleId: circles[4].id, role: Role.MEMBER },

		// User 4 joins other circles
		{ userId: users[4].id, circleId: circles[0].id, role: Role.MEMBER },
		{ userId: users[4].id, circleId: circles[2].id, role: Role.MODERATOR },
	];

	for (const membership of memberships) {
		await prisma.membership.create({
			data: membership,
		});
	}
}

async function createMusic() {
	console.log('Creating music...');

	const musicData = [
		{
			title: 'Bohemian Rhapsody',
			artist: 'Queen',
			albumCover: 'https://images.unsplash.com/photo-1484876065684-b683cf17d276',
			audioUrl: 'https://example.com/music/bohemian-rhapsody.mp3',
			duration: 354, // 5:54 in seconds
		},
		{
			title: 'Imagine',
			artist: 'John Lennon',
			albumCover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
			audioUrl: 'https://example.com/music/imagine.mp3',
			duration: 183, // 3:03 in seconds
		},
		{
			title: 'Billie Jean',
			artist: 'Michael Jackson',
			albumCover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
			audioUrl: 'https://example.com/music/billie-jean.mp3',
			duration: 294, // 4:54 in seconds
		},
		{
			title: 'Hotel California',
			artist: 'Eagles',
			albumCover: 'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b',
			audioUrl: 'https://example.com/music/hotel-california.mp3',
			duration: 391, // 6:31 in seconds
		},
		{
			title: "Sweet Child O' Mine",
			artist: "Guns N' Roses",
			albumCover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
			audioUrl: 'https://example.com/music/sweet-child-of-mine.mp3',
			duration: 356, // 5:56 in seconds
		},
		{
			title: 'Moonlight Sonata',
			artist: 'Ludwig van Beethoven',
			albumCover: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76',
			audioUrl: 'https://example.com/music/moonlight-sonata.mp3',
			duration: 318, // 5:18 in seconds
		},
		{
			title: 'Lose Yourself',
			artist: 'Eminem',
			albumCover: 'https://images.unsplash.com/photo-1526328828355-69b01f8048b9',
			audioUrl: 'https://example.com/music/lose-yourself.mp3',
			duration: 320, // 5:20 in seconds
		},
		{
			title: 'Indie Summer',
			artist: 'The Neighborhood',
			albumCover: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34',
			audioUrl: 'https://example.com/music/indie-summer.mp3',
			duration: 246, // 4:06 in seconds
		},
	];

	const music = [];

	for (const track of musicData) {
		const createdTrack = await prisma.music.create({
			data: track,
		});
		music.push(createdTrack);
	}

	return music;
}

async function createPosts(users: User[], circles: Circle[], music: Music[]) {
	console.log('Creating posts...');

	const postsData = [
		{
			content: 'Just discovered this amazing song! What do you think?',
			userId: users[0].id,
			circleId: circles[0].id,
			musicId: music[0].id,
		},
		{
			content: 'Working on a new remix of this track. Will share the final version soon!',
			userId: users[1].id,
			circleId: circles[1].id,
			musicId: music[1].id,
			imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81',
		},
		{
			content: 'This guitar solo is absolutely mind-blowing!',
			userId: users[2].id,
			circleId: circles[0].id,
			musicId: music[4].id,
		},
		{
			content: "One of the most beautiful compositions of all time. What's your favorite movement?",
			userId: users[3].id,
			circleId: circles[2].id,
			musicId: music[5].id,
		},
		{
			content: 'Throwback to this classic hip-hop track that changed the game.',
			userId: users[4].id,
			circleId: circles[3].id,
			musicId: music[6].id,
			imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
		},
		{
			content: 'Perfect song for summer road trips!',
			userId: users[0].id,
			circleId: circles[4].id,
			musicId: music[3].id,
		},
		{
			content: 'Been listening to this on repeat all week.',
			userId: users[1].id,
			circleId: circles[0].id,
			musicId: music[2].id,
		},
		{
			content: "What's your favorite indie track right now?",
			userId: users[2].id,
			circleId: circles[4].id,
			musicId: music[7].id,
		},
		{
			content: 'Classical music helps me focus while working. Anyone else?',
			userId: users[3].id,
			circleId: circles[2].id,
			musicId: music[5].id,
		},
		{
			content: 'The best workout motivation song!',
			userId: users[4].id,
			circleId: circles[0].id,
			musicId: music[6].id,
		},
	];

	const posts = [];

	for (const post of postsData) {
		const createdPost = await prisma.post.create({
			data: post,
		});
		posts.push(createdPost);
	}

	return posts;
}

async function createComments(users: User[], posts: Post[]) {
	console.log('Creating comments...');

	const commentsData = [
		{
			content: 'Totally agree! This is a masterpiece!',
			userId: users[1].id,
			postId: posts[0].id,
		},
		{
			content: "Can't wait to hear the final version!",
			userId: users[2].id,
			postId: posts[1].id,
		},
		{
			content: 'Best guitar solo of all time, hands down.',
			userId: users[0].id,
			postId: posts[2].id,
		},
		{
			content: 'The third movement is my absolute favorite.',
			userId: users[4].id,
			postId: posts[3].id,
		},
		{
			content: 'This track never gets old!',
			userId: users[3].id,
			postId: posts[4].id,
		},
		{
			content: 'Added to my road trip playlist!',
			userId: users[2].id,
			postId: posts[5].id,
		},
		{
			content: 'Such a classic tune.',
			userId: users[3].id,
			postId: posts[6].id,
		},
		{
			content: "I've been loving the new album by Tame Impala.",
			userId: users[0].id,
			postId: posts[7].id,
		},
		{
			content: 'Absolutely! Mozart works best for me.',
			userId: users[1].id,
			postId: posts[8].id,
		},
		{
			content: 'This is my go-to gym song!',
			userId: users[2].id,
			postId: posts[9].id,
		},
		{
			content: 'The lyrics are so meaningful.',
			userId: users[4].id,
			postId: posts[0].id,
		},
		{
			content: 'What software are you using for the remix?',
			userId: users[3].id,
			postId: posts[1].id,
		},
	];

	for (const comment of commentsData) {
		await prisma.comment.create({
			data: comment,
		});
	}
}

async function createLikes(users: User[], posts: Post[]) {
	console.log('Creating likes...');

	const likes = [
		{ userId: users[1].id, postId: posts[0].id },
		{ userId: users[2].id, postId: posts[0].id },
		{ userId: users[3].id, postId: posts[0].id },
		{ userId: users[0].id, postId: posts[1].id },
		{ userId: users[2].id, postId: posts[1].id },
		{ userId: users[0].id, postId: posts[2].id },
		{ userId: users[1].id, postId: posts[2].id },
		{ userId: users[4].id, postId: posts[2].id },
		{ userId: users[0].id, postId: posts[3].id },
		{ userId: users[4].id, postId: posts[3].id },
		{ userId: users[0].id, postId: posts[4].id },
		{ userId: users[2].id, postId: posts[5].id },
		{ userId: users[3].id, postId: posts[6].id },
		{ userId: users[0].id, postId: posts[7].id },
		{ userId: users[1].id, postId: posts[8].id },
		{ userId: users[2].id, postId: posts[9].id },
	];

	for (const like of likes) {
		await prisma.like.create({
			data: like,
		});
	}
}

async function createFollows(users: User[]) {
	console.log('Creating follows...');

	const follows = [
		{ followerId: users[1].id, followingId: users[0].id },
		{ followerId: users[2].id, followingId: users[0].id },
		{ followerId: users[3].id, followingId: users[0].id },
		{ followerId: users[0].id, followingId: users[1].id },
		{ followerId: users[2].id, followingId: users[1].id },
		{ followerId: users[0].id, followingId: users[2].id },
		{ followerId: users[1].id, followingId: users[2].id },
		{ followerId: users[4].id, followingId: users[2].id },
		{ followerId: users[1].id, followingId: users[3].id },
		{ followerId: users[2].id, followingId: users[4].id },
	];

	for (const follow of follows) {
		await prisma.follow.create({
			data: follow,
		});
	}
}

async function createUserSettings(users: User[]) {
	console.log('Creating user settings...');

	for (const user of users) {
		await prisma.userSettings.create({
			data: {
				userId: user.id,
				// Using defaults for most settings
				// But customizing a few for variety
				darkMode: Math.random() > 0.3, // 70% chance of dark mode
				highContrast: Math.random() > 0.8, // 20% chance of high contrast
				fontSize: Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small',
			},
		});
	}
}

// Create saved music records
async function createSavedMusic(users: User[], music: Music[]) {
	console.log('Creating saved music...');

	const savedMusicEntries = [
		{ userId: users[0].id, musicId: music[0].id },
		{ userId: users[0].id, musicId: music[3].id },
		{ userId: users[1].id, musicId: music[1].id },
		{ userId: users[1].id, musicId: music[6].id },
		{ userId: users[2].id, musicId: music[4].id },
		{ userId: users[2].id, musicId: music[7].id },
		{ userId: users[3].id, musicId: music[5].id },
		{ userId: users[3].id, musicId: music[2].id },
		{ userId: users[4].id, musicId: music[6].id },
		{ userId: users[4].id, musicId: music[0].id },
	];

	for (const entry of savedMusicEntries) {
		await prisma.savedMusic.create({
			data: entry,
		});
	}
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
