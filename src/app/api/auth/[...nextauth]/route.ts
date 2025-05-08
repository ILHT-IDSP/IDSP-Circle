import {handlers} from "@/auth";
import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export const {GET, POST: nextAuthPost} = handlers;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {formData} = body;

        if (!formData) return NextResponse.json({error: "missing form data"}, {status: 400});

        const token = await getToken({req});
        const sessionData = {
            ...token,
            formData,
        };

        return NextResponse.json({message: "Session created", session: sessionData});
    } catch (err) {
        console.error("error handling POST request: ", err);
        return NextResponse.json({error: " server error"}, {status: 500});
    }
}
