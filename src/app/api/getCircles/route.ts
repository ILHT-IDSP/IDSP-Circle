import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        console.log("Server hit!");
        const circles = await prisma.circle.findMany();
        console.log("DATABASE RESULT: ", circles);
        return NextResponse.json({message: "success", data: circles}, {status: 200});
    } catch (err) {
        return NextResponse.json({error: err}, {status: 500});
    }
}
