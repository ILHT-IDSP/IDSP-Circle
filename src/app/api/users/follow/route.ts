import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
	try {
		const session = await auth();

		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { targetUserId, action } = await request.json();

		if (!targetUserId || !action || !['follow', 'unfollow'].includes(action)) {
			return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
		}

		const currentUserId = parseInt(session.user.id);

		// Check if trying to follow/unfollow self
		if (currentUserId === targetUserId) {
			return NextResponse.json({ error: 'Cannot follow/unfollow yourself' }, { status: 400 });
		}

		// Check if target user exists
		const targetUser = await prisma.user.findUnique({
			where: { id: targetUserId },
		});

		if (!targetUser) {
			return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
		}
		if (action === 'follow') {
			// Check if target user has a private profile
			const isTargetPrivate = targetUser.isProfilePrivate;

			if (isTargetPrivate) {
				// Check if there's already a pending friend request
				const existingRequest = await prisma.activity.findFirst({
					where: {
						type: 'friend_request',
						userId: targetUserId,
						content: { contains: `wants to follow you` },
					},
				});
				if (!existingRequest) {
					// For private profiles, create a friend request activity
					await prisma.activity.create({
						data: {
							type: 'friend_request',
							content: `user:${currentUserId} wants to follow you`,
							userId: targetUserId, // Activity belongs to the target user
							circleId: null,
						},
					});

					return NextResponse.json({
						success: true,
						action: 'request_sent',
						message: 'Follow request sent',
					});
				} else {
					return NextResponse.json({
						success: true,
						action: 'request_already_sent',
						message: 'Follow request already sent',
					});
				}			} else {				// For public profiles, create follow record immediately
				await prisma.$transaction([
					// Create the follow relationship
					prisma.follow.upsert({
						where: {
							followerId_followingId: {
								followerId: currentUserId,
								followingId: targetUserId,
							},
						},
						update: {},
						create: {
							followerId: currentUserId,
							followingId: targetUserId,
						},
					}),							// Create activity notification for the target user
					prisma.activity.create({
						data: {
							type: 'followed',
							userId: targetUserId, // This activity is for the user being followed
							content: `${session.user.name || session.user.username} (${session.user.username}) started following you`,
						},
					})
				]);
			}

			// Get updated follower and following counts
			const [followerCount, followingCount] = await Promise.all([
				prisma.follow.count({
					where: {
						followingId: targetUserId,
					},
				}),
				prisma.follow.count({
					where: {
						followerId: targetUserId,
					},
				}),
			]);

			return NextResponse.json({
				success: true,
				action: 'followed',
				followerCount,
				followingCount,
			});
		} else if (action === 'unfollow') {
			// Delete follow record if it exists
			await prisma.follow.deleteMany({
				where: {
					followerId: currentUserId,
					followingId: targetUserId,
				},
			});

			// Get updated follower and following counts
			const [followerCount, followingCount] = await Promise.all([
				prisma.follow.count({
					where: {
						followingId: targetUserId,
					},
				}),
				prisma.follow.count({
					where: {
						followerId: targetUserId,
					},
				}),
			]);

			return NextResponse.json({
				success: true,
				action: 'unfollowed',
				followerCount,
				followingCount,
			});
		}

		return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
	} catch (error) {
		console.error('Error handling follow/unfollow:', error);
		return NextResponse.json({ error: 'Failed to process follow/unfollow action' }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	try {
		const session = await auth();

		if (!session?.user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const url = new URL(request.url);
		const targetUserId = url.searchParams.get('targetUserId');
		const checkRequestStatus = url.searchParams.get('checkRequestStatus');

		if (!targetUserId) {
			return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
		}

		const currentUserId = parseInt(session.user.id);
		const parsedTargetUserId = parseInt(targetUserId);

		// Check if there's already a pending friend request
		if (checkRequestStatus === 'true') {
			const existingRequest = await prisma.activity.findFirst({
				where: {
					type: 'friend_request',
					userId: parsedTargetUserId,
					content: { contains: `user:${currentUserId} wants to follow you` },
				},
			});

			return NextResponse.json({
				requestSent: !!existingRequest,
			});
		}

		// Get follow status and counts
		const [isFollowing, followerCount, followingCount] = await Promise.all([
			prisma.follow.findFirst({
				where: {
					followerId: currentUserId,
					followingId: parsedTargetUserId,
				},
			}),
			prisma.follow.count({
				where: {
					followingId: parsedTargetUserId,
				},
			}),
			prisma.follow.count({
				where: {
					followerId: parsedTargetUserId,
				},
			}),
		]);

		return NextResponse.json({
			isFollowing: !!isFollowing,
			followerCount,
			followingCount,
		});
	} catch (error) {
		console.error('Error checking follow status:', error);
		return NextResponse.json({ error: 'Failed to check follow status' }, { status: 500 });
	}
}
