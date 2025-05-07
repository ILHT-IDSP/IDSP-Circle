import NextAuth from 'next-auth';
import { type NextAuthConfig } from 'next-auth';

export const config = {
	providers: [],
	pages: {
		signIn: '/auth/login',
	},
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
