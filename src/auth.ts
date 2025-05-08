import NextAuth from "next-auth";
import {type NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const config = {
    providers: [
        Credentials({
            credentials: {email: {}, username: {}, phoneNumber: {}, password: {}},
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {},
} satisfies NextAuthConfig;

export const {handlers, auth, signIn, signOut} = NextAuth(config);
