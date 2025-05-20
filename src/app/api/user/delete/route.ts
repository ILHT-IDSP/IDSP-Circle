import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signOut } from '@/auth';

export async function POST(req: Request) {
	try {
		let { userId } = await req.json();
		userId = Number(userId);

		const confirmedUserExist = await prisma.user.findUnique({ where: { id: userId } });
		if (!confirmedUserExist) throw new Error('User does not exist already');

		await prisma.albumComment.deleteMany({
			where: { userId: confirmedUserExist.id },
		});

		await prisma.albumLike.deleteMany({
			where: { userId: confirmedUserExist.id },
		});

		await prisma.comment.deleteMany({
			where: { userId: confirmedUserExist.id },
		});

		await prisma.like.deleteMany({
			where: { userId: confirmedUserExist.id },
		});

		await prisma.follow.deleteMany({
			where: {
				OR: [{ followerId: confirmedUserExist.id }, { followingId: confirmedUserExist.id }],
			},
		});

		await prisma.membership.deleteMany({
			where: { userId: confirmedUserExist.id },
		});

		await prisma.post.deleteMany({
			where: { userId: confirmedUserExist.id },
		});

		await prisma.userSettings.deleteMany({
			where: { userId: confirmedUserExist.id },
		});

		await prisma.circle.deleteMany({
			where: { creatorId: confirmedUserExist.id },
		});

		await prisma.album.deleteMany({
			where: { creatorId: confirmedUserExist.id },
		});

		await prisma.user.delete({ where: { id: confirmedUserExist.id } });
		console.log(`Circle Account of: ${confirmedUserExist.username} successfully deleted!`);
		return NextResponse.json({ message: 'Successfully Deleted!' }, { status: 200 });
	} catch (err) {
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
