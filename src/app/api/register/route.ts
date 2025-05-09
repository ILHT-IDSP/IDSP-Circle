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
        console.log("FORM DATA IN THE BACKEND: ", formData);
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

        // await signIn("credentials", {
        //     email: formData.email,
        //     password: formData.password,
        //     redirectTo: "/profile",
        // });

        if (!user) throw new Error("User not found");

        return NextResponse.json(
            {
                message: "Registration Success",
                user: {id: user.id, email: user.email, username: user.username},
            },
            {status: 200}
        );
    } catch (err) {
        return NextResponse.json({error: "Failed to handle registration"}, {status: 500});
    }
}
