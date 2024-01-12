import { NextResponse } from "next/server";
import { User } from "@/lib/models";

import connect from "@/lib/db";
import { cookies } from "next/headers";
import verifyAccessToken from "@/lib/jwtverification";

export const GET = async (request) => {
    try {
        await connect();

        const { searchParams } = new URL(request.url);

        const token = cookies().get("token");
        const verifyedToken = verifyAccessToken(token);
        console.log(verifyedToken);
        if(!verifyedToken){
            throw new Error("not an valid token");
        }
        const chats = await User.findOne({verifyedToken._id }).select("chats").populate({
            path: "chats",
            model: "Chat",
        });
        return new NextResponse(JSON.stringify({ message: "success" }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);

        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
};
