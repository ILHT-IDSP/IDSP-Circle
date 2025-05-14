/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './lib/prisma';

// Since we're having TypeScript issues with NextAuth v5 beta, we'll use a workaround.
// Type 'any' is used to bypass the errors while maintaining functionality.
export const { handlers, signIn, signOut, auth } = (NextAuth as any)({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any) {
        try {
          if (!credentials) {
            throw new Error('No credentials provided.');
          }

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
              id: String(user.id), // Convert ID to string
              image: user.profileImage,
              username: user.username,
              circleCount: user._count.createdCircles || 0,
              albumCount: user._count.Album || 0,
              followersCount: user._count.followers || 0,
              followingCount: user._count.following || 0,
            };
          }
          return null;
        } catch (err) {
          console.error('Authorization error:', err);
          return null;
        }
      },
    } as any),
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.image = token.image;
        session.user.circleCount = token.circleCount;
        session.user.albumCount = token.albumCount;
        session.user.followersCount = token.followersCount;
        session.user.followingCount = token.followingCount;
      }
      return session;
    },
    async jwt({ token, user }: any) {
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
