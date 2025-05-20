import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

// function to get the logged in users friends for creating a circle
export async function POST(req: Request) {
    // const friends = [];
    try {
        let {userId} = await req.json();
        userId = parseInt(userId);

        const userFriends = await prisma.user.findUnique({
            where: {
                id: userId,
            },

            select: {
                followers: true,
            },
        });

        const followerIds = userFriends?.followers?.map((friend) => {
            return friend.followerId;
        });

        console.log(userFriends?.followers);
        console.log(followerIds);

        const friends = await prisma.user.findMany({
            where: {
                id: {
                    in: followerIds,
                },
            },
        });

        if (!friends) throw new Error("No Friends :(");

        console.log("FRIEND DATA: ", friends);	

        return NextResponse.json({message: "Recieved Friends from database!", data: friends}, {status: 200});
    } catch (err) {
        return NextResponse.json({error: err}, {status: 500});
    }
}
