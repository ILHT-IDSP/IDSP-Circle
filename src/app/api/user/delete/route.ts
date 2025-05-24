import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signOut } from '@/auth';
import { PrismaUtils } from '@/lib/prisma-utils';

export async function POST(req: Request) {
	try {
		let { userId } = await req.json();
		userId = Number(userId);

		// OPTIMIZATION: Use transaction to batch all deletion operations
		const result = await PrismaUtils.transaction(async (tx) => {
			// Verify user exists first
			const confirmedUserExist = await tx.user.findUnique({ 
				where: { id: userId },
				select: { id: true, username: true }
			});
			
			if (!confirmedUserExist) {
				throw new Error('User does not exist already');
			}

			// OPTIMIZATION: Batch all deletions in a single transaction
			// Order matters for foreign key constraints
			await Promise.all([
				// Delete user-related data (no foreign key dependencies)
				tx.albumComment.deleteMany({
					where: { userId: confirmedUserExist.id },
				}),
				tx.albumLike.deleteMany({
					where: { userId: confirmedUserExist.id },
				}),
				tx.comment.deleteMany({
					where: { userId: confirmedUserExist.id },
				}),
				tx.like.deleteMany({
					where: { userId: confirmedUserExist.id },
				}),
				tx.follow.deleteMany({
					where: {
						OR: [{ followerId: confirmedUserExist.id }, { followingId: confirmedUserExist.id }],
					},
				}),
				tx.membership.deleteMany({
					where: { userId: confirmedUserExist.id },
				}),
				tx.post.deleteMany({
					where: { userId: confirmedUserExist.id },
				}),
				tx.userSettings.deleteMany({
					where: { userId: confirmedUserExist.id },
				}),
			]);

			// Delete user-created content (after related data)
			await Promise.all([
				tx.circle.deleteMany({
					where: { creatorId: confirmedUserExist.id },
				}),
				tx.album.deleteMany({
					where: { creatorId: confirmedUserExist.id },
				}),
			]);

			// Finally delete the user
			await tx.user.delete({ where: { id: confirmedUserExist.id } });

			return confirmedUserExist;
		});

		console.log(`Circle Account of: ${result.username} successfully deleted!`);
		return NextResponse.json({ message: 'Successfully Deleted!' }, { status: 200 });
	} catch (err) {
		console.error('Error deleting user:', err);
		return NextResponse.json({ 
			error: err instanceof Error ? err.message : 'Failed to delete user' 
		}, { status: 500 });
	}
}
