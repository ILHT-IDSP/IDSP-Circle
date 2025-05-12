/* eslint-disable @typescript-eslint/no-explicit-any */

import CredentialsProvider from "next-auth/providers/credentials"; // have to use this one <----
import Credentials from "next-auth/providers/credentials";

import {signInSchema} from "./lib/zod";
import prisma from "./lib/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";

import NextAuth, {type DefaultSession} from "next-auth";

// this was from the documentation
declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            address: string;
            username: string;
            circleCount: number;
            albumCount: number;
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        username: string;
        image: string;
        circleCount: number;
        albumCount: number;
    }
}

export const {handlers, signIn, signOut, auth} = NextAuth({
    // adapter pos to work but dont
    // adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
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

                    console.log("FORM DATA HIT CREDENTIALS: ", credentials);

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
                                select: {createdCircles: true, Album: true},
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
    session: {
        strategy: "jwt",
    },

    callbacks: {
        async session({session, token}) {
            if (token) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.image = token.image as string;
                session.user.circleCount = token.circleCount as number;
                session.user.albumCount = token.albumCount as number;
            }
            return session;
        },
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.image = user.image;
                token.circleCount = user.circleCount;
                token.albumCount = user.albumCount;
            }
            return token;
        },
    },

    trustHost: true,
});
