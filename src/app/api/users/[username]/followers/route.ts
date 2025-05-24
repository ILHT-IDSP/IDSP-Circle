import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { PrismaUtils } from '@/lib/prisma-utils';

export async function GET(request: NextRequest, { params }) {
	try {
		const session = await auth();
		const currentUserId = session?.user?.id ? parseInt(session.user.id) : null;
		const resolvedParams = await params;
		const { username } = resolvedParams;

		// OPTIMIZATION: Use transaction to batch all queries
		const result = await PrismaUtils.transaction(async tx => {
			// Find the user by username
			const user = await tx.user.findUnique({
				where: { username },
				select: {
					id: true,
					isProfilePrivate: true,
					followers: {
						select: {
							followerId: true,
						},
					},
				},
			});

			if (!user) {
				return null;
			}

			// Check if user has private profile
			const isPrivate = user.isProfilePrivate;
			const isOwnProfile = currentUserId === user.id;
			const isFollowing = currentUserId ? user.followers.some(follower => follower.followerId === currentUserId) : false;

			// For private profiles, check if current user is allowed to see followers
			if (isPrivate && !isFollowing && !isOwnProfile) {
				return {
					error: 'This user has a private profile. Follow them to see their followers.',
					isPrivate: true,
					isOwnProfile,
				};
			}

			// OPTIMIZATION: Batch followers and current user followings in parallel
			const queries = [
				// Get followers of the user
				tx.follow.findMany({
					where: { followingId: user.id },
					include: {
						follower: {
							select: {
								id: true,
								username: true,
								name: true,
								profileImage: true,
							},
						},
					},
				})
			];

			// Add current user's followings query if logged in
			if (currentUserId) {
				queries.push(
					tx.follow.findMany({
						where: { followerId: currentUserId },
						select: { followingId: true },
					})
				);
			}

			const results = await Promise.all(queries);
			const followers = results[0];
			const currentUserFollowings = currentUserId ? results[1] : [];

			return { followers, currentUserFollowings };
		});

		if (!result) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		if ('error' in result) {
			return NextResponse.json(result, { status: 403 });
		}

		const currentUserFollowingIds = result.currentUserFollowings.map(f => f.followingId);

		const formattedFollowers = result.followers.map(f => ({
			id: f.follower.id,
			username: f.follower.username,
			name: f.follower.name,
			profileImage: f.follower.profileImage,
			isFollowing: currentUserFollowingIds.includes(f.follower.id),
		}));

		return NextResponse.json(formattedFollowers);
	} catch (error) {
		console.error('Error fetching followers:', error);
		return NextResponse.json({ error: 'Failed to fetch followers' }, { status: 500 });
	}
}
