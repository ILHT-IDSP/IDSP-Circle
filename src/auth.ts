import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import Credentials from "next-auth/providers/credentials";
import {signInSchema} from "./lib/zod";
import prisma from "./lib/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        // CredentialsProvider({
        //     credentials: {
        //         email: {},
        //         password: {},
        //     },
        //     authorize: async (credentials) => {
        //         try {
        //             if (!credentials) {
        //                 throw new Error("No credentials provided.");
        //             }
        //             // Your logic to verify the user
        //             const {email, password} = await signInSchema.parseAsync({
        //                 email: credentials.email,
        //                 password: credentials.password,
        //             });
        //             // Example: user = await getUserFromDb(email, password);
        //             const user = await prisma.user.findUnique({
        //                 where: {
        //                     email: email,
        //                     password: password,
        //                 },
        //             });
        //             if (user) {
        //                 return user as any;
        //             }
        //             return user;
        //         } catch (err) {
        //             console.error(err);
        //             return null;
        //         }
        //     },
        // }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    // callbacks: {
    // 	authorized: async ({ auth }:) => {
    // 		return auth;
    // 	},
    // },
    // session: {
    // 	strategy: "jwt"
    // }
    // trustHost: true,
});
