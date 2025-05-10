import {NextResponse} from "next/server";
import prisma from "../../../lib/prisma";
import {signIn} from "next-auth/react";
// bcrypt password hashing shi goes here
const now = new Date();
export const runtime = "nodejs";

export async function GET() {}

export async function POST(req: Request) {
    try {
        const {formData} = await req.json();
        console.log("SERVER SUCCESSFULLY RECIEVED FORMDATA: ", formData);
        const user = await prisma.user.create({
            data: {
                email: formData.email,
                name: formData.fullName,
                username: formData.username,
                password: formData.password,
                birthday: formData.birtdhay,
                profileImage: formData.profileImg || null,
                createdAt: now,
                updatedAt: now,
            },
        });

        console.log(`Account ${user.username} successfully created `);

        if (!user) throw new Error("User not found");

        return NextResponse.json(
            {
                message: "Registration Success",
            },
            {status: 200}
        );
    } catch (err) {
        console.log("Failed to create user into prisma db");
        return NextResponse.json({error: "Failed to handle registration"}, {status: 500});
    }
}
