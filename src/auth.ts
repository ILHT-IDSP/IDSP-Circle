/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import CredentialsProvider from 'next-auth/providers/credentials'; // have to use this one <----

import { signInSchema } from './lib/zod';
import prisma from './lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { default as NextAuth } from 'next-auth';
// Import Session type to extend it
import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

// Module declarations are in types.d.ts

export const { handlers, signIn, signOut, auth } = NextAuth({	// Uncomment this line if you want to use a database adapter
	// adapter: PrismaAdapter(prisma),
	secret: process.env.AUTH_SECRET,
	providers: [
		CredentialsProvider({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async credentials => {
				try {
					if (!credentials) {
						throw new Error('No credentials provided.');
					}

					console.log('FORM DATA HIT CREDENTIALS: ', credentials);

					// const {email, password} = await signInSchema.parseAsync({
					//     email: credentials.email,
					//     password: credentials.password,
					// });

					// Find the user by email
					const user = await prisma.user.findUnique({
						where: {
							email: credentials.email as string,
						},
						include: {
							_count: {
								select: {
									createdCircles: true,
									Album: true,
									followers: true,
									following: true,
								},
							},
						},
					});

					if (user && user.password === credentials.password) {
						return {
							name: user.name,
							email: user.email,
							id: user.id,
							image: user.profileImage,
							username: user.username,
							circleCount: user._count.createdCircles || 0,
							albumCount: user._count.Album || 0,
							followersCount: user._count.followers || 0,
							followingCount: user._count.following || 0,
						} as any;
					}
				} catch (err) {
					console.error('Authorization error:', err);
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
	},
	session: {
		strategy: 'jwt',
	},	callbacks: {
		async session({ session, token }: { session: any; token: JWT }) {
			if (token) {
				session.user.id = token.id as string;
				session.user.username = token.username as string;
				session.user.image = token.image as string;
				session.user.circleCount = token.circleCount as number;
				session.user.albumCount = token.albumCount as number;
				session.user.followersCount = token.followersCount as number;
				session.user.followingCount = token.followingCount as number;
			}
			return session;
		},
		async jwt({ token, user }: { token: JWT; user?: any }) {
			if (user) {
				token.id = user.id;
				token.username = user.username;
				token.image = user.image;
				token.circleCount = user.circleCount;
				token.albumCount = user.albumCount;
				token.followersCount = user.followersCount;
				token.followingCount = user.followingCount;
			}
			return token;
		},
	},

	trustHost: true,
});
