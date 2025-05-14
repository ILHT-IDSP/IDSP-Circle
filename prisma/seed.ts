import { PrismaClient, User, Circle, Post, Role } from '../src/generated/prisma';

export const prisma = new PrismaClient();

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

	// Create albums
	await createAlbums(users);

	// Create posts
	const posts = await createPosts(users, circles);

	// Create comments
	await createComments(users, posts);

	// Create likes
	await createLikes(users, posts);

	// Create follows
	await createFollows(users);

	// Create user settings
	await createUserSettings(users);

	console.log('Seeding completed successfully!');
}

async function cleanDatabase() {
	console.log('Cleaning up existing data...');

	// Delete in order to respect foreign key constraints
	await prisma.like.deleteMany();
	await prisma.comment.deleteMany();
	await prisma.post.deleteMany();
	await prisma.membership.deleteMany();
	await prisma.circle.deleteMany();
	await prisma.follow.deleteMany();
	await prisma.userSettings.deleteMany();
	await prisma.album.deleteMany();
	await prisma.user.deleteMany();
}

async function createUsers() {
	console.log('Creating users...');

	const userData = [
		{
			email: 'nikita@example.com',
			name: 'Nikita',
			username: 'nikita',
			password: 'password123',
			bio: 'Coding enthusiast and music lover',
			profileImage: '/images/profile1.jpg',
			coverImage: '/images/albums/nightout.jpeg',
		},
		{
			email: 'adnan@example.com',
			name: 'Adnan',
			username: 'adnan',
			password: 'password123',
			bio: 'Designer and photographer',
			profileImage: '/images/profile2.jpg',
			coverImage: '/images/albums/sunsets.jpeg',
		},
		{
			email: 'naldoz@example.com',
			name: 'Naldoz',
			username: 'naldoz',
			password: 'password123',
			bio: 'ilht on top!!!',
			profileImage: '/images/circles/naldoz.jpg',
			coverImage: '/images/albums/sleeps.jpeg',
		},
		{
			email: 'burgerboy@example.com',
			name: 'Burger Boy',
			username: 'burgerboy',
			password: 'password123',
			bio: 'Burger enthusiast and foodie',
			profileImage: '/images/profile3.jpg',
			coverImage: '/images/albums/year1.jpeg',
		},
		{
			email: 'pline@example.com',
			name: 'Pline',
			username: 'pline',
			password: 'password123',
			bio: 'Artist and illustrator',
			profileImage: '/images/default-avatar.png',
			coverImage: '/images/albums/dyson.png',
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
			name: 'Altitude Attitudes',
			description: 'A circle for mountain enthusiasts and hikers',
			avatar: '/images/circles/altitude-attitudes.png',
			coverImage: '/images/albums/nightout.jpeg',
			isPrivate: false,
			creatorId: users[0].id,
		},
		{
			name: 'Groovy Girls',
			description: 'Music and dance enthusiasts sharing their favorite tunes',
			avatar: '/images/circles/groovy-girls.jpg',
			coverImage: '/images/albums/sunsets.jpeg',
			isPrivate: false,
			creatorId: users[1].id,
		},
		{
			name: 'Isaiah Fan Club',
			description: 'Celebrating all things Isaiah',
			avatar: '/images/circles/isaiah.png',
			coverImage: '/images/albums/sleeps.jpeg',
			isPrivate: false,
			creatorId: users[2].id,
		},
		{
			name: 'Work Gang',
			description: 'Colleagues sharing work-life balance tips',
			avatar: '/images/circles/work-gang.jpeg',
			coverImage: '/images/albums/year1.jpeg',
			isPrivate: true,
			creatorId: users[3].id,
		},
		{
			name: 'Baby Club',
			description: 'New parents sharing tips and experiences',
			avatar: '/images/circles/03-babies.jpeg',
			coverImage: '/images/albums/dyson.png',
			isPrivate: false,
			creatorId: users[4].id,
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

async function createAlbums(users: User[]) {
	console.log('Creating albums...');
	const albumsData = [
		{
			title: 'Night Out',
			description: 'Photos from our wild night out!',
			coverImage: '/images/albums/nightout.jpeg',
			creatorId: users[0].id,
		},
		{
			title: 'Sunsets',
			description: 'Best sunset moments.',
			coverImage: '/images/albums/sunsets.jpeg',
			creatorId: users[1].id,
		},
		{
			title: 'Sleeps',
			description: 'Caught sleeping everywhere.',
			coverImage: '/images/albums/sleeps.jpeg',
			creatorId: users[2].id,
		},
		{
			title: 'Year 1',
			description: 'Our first year together!',
			coverImage: '/images/albums/year1.jpeg',
			creatorId: users[3].id,
		},
	];
	const albums = [];
	for (const album of albumsData) {
		const createdAlbum = await prisma.album.create({ data: album });
		albums.push(createdAlbum);
	}
	return albums;
}

async function createPosts(users: User[], circles: Circle[]) {
	console.log('Creating posts...');

	const postsData = [
		{
			content: 'Just joined this amazing Circle community!',
			userId: users[0].id,
			circleId: circles[0].id,
		},
		{
			content: 'Working on a new design project. Will share the results soon!',
			userId: users[1].id,
			circleId: circles[1].id,
			imageUrl: '/images/albums/sunsets.jpeg',
		},
		{
			content: 'This view is absolutely mind-blowing!',
			userId: users[2].id,
			circleId: circles[0].id,
		},
		{
			content: "One of the most beautiful places I've visited. Where should I go next?",
			userId: users[3].id,
			circleId: circles[2].id,
		},
		{
			content: 'Throwback to this amazing hike last weekend.',
			userId: users[4].id,
			circleId: circles[3].id,
			imageUrl: '/images/circles/naldoz.jpg',
		},
		{
			content: 'Perfect day for outdoor activities!',
			userId: users[0].id,
			circleId: circles[4].id,
		},
		{
			content: 'Been exploring new places all week.',
			userId: users[1].id,
			circleId: circles[0].id,
		},
		{
			content: "What's your favorite hiking trail?",
			userId: users[2].id,
			circleId: circles[4].id,
		},
		{
			content: 'Work-life balance tips anyone?',
			userId: users[3].id,
			circleId: circles[2].id,
		},
		{
			content: "The best workout routine I've found!",
			userId: users[4].id,
			circleId: circles[0].id,
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
			content: 'Welcome to the community!',
			userId: users[1].id,
			postId: posts[0].id,
		},
		{
			content: "Can't wait to see the results!",
			userId: users[2].id,
			postId: posts[1].id,
		},
		{
			content: 'Wow, where is this place?',
			userId: users[0].id,
			postId: posts[2].id,
		},
		{
			content: 'You should visit the Grand Canyon next.',
			userId: users[4].id,
			postId: posts[3].id,
		},
		{
			content: 'Looks like an amazing hike!',
			userId: users[3].id,
			postId: posts[4].id,
		},
		{
			content: 'The weather is perfect today!',
			userId: users[2].id,
			postId: posts[5].id,
		},
		{
			content: 'Any recommendations for places to visit?',
			userId: users[3].id,
			postId: posts[6].id,
		},
		{
			content: "I've been loving the trails at Mount Rainier.",
			userId: users[0].id,
			postId: posts[7].id,
		},
		{
			content: 'Set clear boundaries and take regular breaks!',
			userId: users[1].id,
			postId: posts[8].id,
		},
		{
			content: 'Thanks for sharing your routine!',
			userId: users[2].id,
			postId: posts[9].id,
		},
		{
			content: 'This community is so welcoming.',
			userId: users[4].id,
			postId: posts[0].id,
		},
		{
			content: 'What tools are you using for your design work?',
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

	// For clarity:
	// followerId: the person who is following (the active user)
	// followingId: the person being followed (the passive user, profile being viewed)
	const follows = [
		// Nikita (0) is followed by Adnan (1) and Burger Boy (3)
		{ followerId: users[1].id, followingId: users[0].id }, // Adnan follows Nikita
		{ followerId: users[3].id, followingId: users[0].id }, // Burger Boy follows Nikita

		// Adnan (1) is followed by Nikita (0) and Naldoz (2)
		{ followerId: users[0].id, followingId: users[1].id }, // Nikita follows Adnan
		{ followerId: users[2].id, followingId: users[1].id }, // Naldoz follows Adnan

		// Naldoz (2) is followed by Pline (4) and Nikita (0)
		{ followerId: users[4].id, followingId: users[2].id }, // Pline follows Naldoz
		{ followerId: users[0].id, followingId: users[2].id }, // Nikita follows Naldoz

		// Burger Boy (3) is followed by Adnan (1)
		{ followerId: users[1].id, followingId: users[3].id }, // Adnan follows Burger Boy

		// Pline (4) is followed by Burger Boy (3) and Naldoz (2)
		{ followerId: users[3].id, followingId: users[4].id }, // Burger Boy follows Pline
		{ followerId: users[2].id, followingId: users[4].id }, // Naldoz follows Pline
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

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
