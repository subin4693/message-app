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
        verifyAccessToken(token);

        const name = searchParams.get("name");
        const user = await User.find({ name }).select("-password -chats");

        return new NextResponse(JSON.stringify({ message: "success", user }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);

        return new NextResponse(JSON.stringify(error), {
            status: 200,
        });
    }
};
