import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {signIn} from "next-auth/react";

export async function GET() {}

export async function POST(req: Request) {
    try {
        const {formData} = await req.json();
        console.log("FORM DATA IN THE BACKEND: ", formData);

        return NextResponse.json({message: "Registration Success", formData}, {status: 200});
    } catch (err) {
        return NextResponse.json({error: "Failed to handle registration"}, {status: 500});
    }
}
