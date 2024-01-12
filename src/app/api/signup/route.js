import { NextResponse } from "next/server";
import { User } from "@/lib/models";
import bcrypt from "bcrypt";
import connect from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
    console.log("working");
    try {
        await connect();
        const { name, password, image } = await request.json();

        if (!name || !password) {
            throw new Error("send an valid details");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const res = await User.create({
            name,
            password: hashedPassword,
            image,
        });
        const { name: retName, password: retPassword, _id } = await res;

        const token = jwt.sign(
            { name: retName, password: retPassword, _id },
            process.env.JWT_SECRECT,
            { expiresIn: "7d" },
        );

        cookies().set("token", token);

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
