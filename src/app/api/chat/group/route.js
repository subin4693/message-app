import { NextResponse } from "next/server";
import { User, Chat } from "@/lib/models";

import connect from "@/lib/db";
import { cookies } from "next/headers";
import verifyAccessToken from "@/lib/jwtverification";

export const POST = async (request) => {
    try {
        await connect();

        const { users, isgroup, groupname, groupicon } = await request.json();

        const token = cookies().get("token");
        verifyAccessToken(token);

        if (users.length <= 2) {
            throw new Error("Provide a users");
        }

        const createdChat = await Chat.create({
            isgroup,
            groupname,
            groupicon,
        });

        for (let i = 0; i < users.length; i++) {
            const userChats = await User.findOne({ name: users[i] }).select(
                "chats",
            );
            createdChat.users.push(userChats._id);
            userChats.chats.push(createdChat._id);
            await userChats.save();

            if (userChats.length === 0)
                throw new Error("Not a valid user name sented");
        }

        await createdChat.save();

        return new NextResponse(JSON.stringify({ message: "success" }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);

        return new NextResponse(JSON.stringify(error), {
            status: 200,
        });
    }
};
