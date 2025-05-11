/* eslint-disable @typescript-eslint/no-explicit-any */

import CredentialsProvider from "next-auth/providers/credentials"; // have to use this one <----
import Credentials from "next-auth/providers/credentials";

import {signInSchema} from "./lib/zod";
import prisma from "./lib/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";

import NextAuth, {type DefaultSession} from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            address: string;
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"];
    }
}

export const {handlers, signIn, signOut, auth} = NextAuth({
    // adapter pos to work but dont
    // adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials) {
                        throw new Error("No credentials provided.");
                    }

                    const {email, password} = await signInSchema.parseAsync({
                        email: credentials.email,
                        password: credentials.password,
                    });

                    // Find the user by email
                    const user = await prisma.user.findUnique({
                        where: {
                            email: email,
                        },
                        include: {
                            _count: {
                                select: {createdCircles: true, Album: true},
                            },
                        },
                    });

                    if (user && user.password === password) {
                    }

                    // const response = await fetch("/");

                    if (user) {
                        return {
                            name: user.name,
                            email: user.email,
                            id: user.id,
                            image: user.profileImage,
                            username: user.username,
                            circleCount: user._count.createdCircles,
                            albumCount: user._count.Album,
                        } as any;
                    }
                } catch (err) {
                    console.error("Authorization error:", err);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        // async session({session, token}) {
        //     if (token) {
        //         session.user.id = token.id as string;
        //         session.user.username = token.username as string;
        //         session.user.image = token.image as string;
        //     }
        //     return session;
        // },
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.image = user.image;
                token.name = user.name;
                // token.circleCount = user.circleCount
            }
            return token;
        },
    },

    trustHost: true,
});
