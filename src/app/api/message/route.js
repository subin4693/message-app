import { NextResponse } from "next/server";
import { Message, Chat } from "@/lib/models";

import connect from "@/lib/db";
import { cookies } from "next/headers";
import verifyAccessToken from "@/lib/jwtverification";

export const POST = async (request) => {
    try {
        await connect();

        const { chatid, userid, message } = await request.json();

        const token = cookies().get("token");
        verifyAccessToken(token);

        if (!message || !chatid || !userid) {
            throw new Error("faild to create a message");
        }

        const createdMsg = await Message.create({
            chatid,
            userid,
            message,
        });

        const chat = await Chat.findById(chatid);

        chat.latestmsg = createdMsg._id;
        await chat.save();

        return new NextResponse(JSON.stringify({ message: "success" }), {
            status: 201,
        });
    } catch (error) {
        console.log(error);

        return new NextResponse(JSON.stringify(error), {
            status: 200,
        });
    }
};

export const GET = async (request) => {
    try {
        await connect();

        const { searchParams } = new URL(request.url);

        const token = cookies().get("token");
        verifyAccessToken(token);

        const id = searchParams.get("chatid");

        const messages = await Message.find({ chatid: id })
            .sort({ createdAt: -1 })
            .populate({
                path: "userid",
                model: "User",
                select: "name image",
            });

        return new NextResponse(
            JSON.stringify({ message: "success", messages }),
            {
                status: 200,
            },
        );
    } catch (error) {
        console.log(error);

        return new NextResponse(JSON.stringify(error), {
            status: 200,
        });
    }
};
