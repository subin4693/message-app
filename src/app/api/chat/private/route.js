import { NextResponse } from "next/server";
import { User, Chat } from "@/lib/models";

import connect from "@/lib/db";
import { cookies } from "next/headers";
import verifyAccessToken from "@/lib/jwtverification";

export const POST = async (request) => {
    try {
        await connect();

        const { user } = await request.json();

        const token = cookies().get("token");
        const verifyedtoken = verifyAccessToken(token);
        if (!verifyedtoken) {
            return new NextResponse(JSON.stringify("Token is not verifyed"), {
                status: 400,
            });
        }

        const createdChat = await Chat.create({});
        const createrChats = await User.findById(verifyedtoken._id).select(
            "chats",
        );
        const userChats = await User.findById(user).select("chats");

        if (!userChats || !createrChats)
            throw new Error("Not a valid user name sented");

        createdChat.users.push(userChats._id);
        createdChat.users.push(createrChats._id);

        userChats.chats.push(createdChat._id);
        createrChats.chats.push(createdChat._id);

        await createrChats.save();
        await userChats.save();

        await createdChat.save();

        return new NextResponse(JSON.stringify({ message: "success" }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);

        return new NextResponse(JSON.stringify(error), {
            status: 400,
        });
    }
};
