import { NextResponse } from "next/server";
import { User } from "@/lib/models";
import bcrypt from "bcrypt";
import connect from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
    try {
        await connect();
        const { name, password } = await request.json();

        if (!name || !password) {
            throw new Error("send an valid details");
        }

        const user = await User.findOne({ name }).select("name password");

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new Error("password miss match");
        }

        const token = jwt.sign(
            { name: user.name, password: user.password, _id: user.id },
            process.env.JWT_SECRECT,
            { expiresIn: "1h" },
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
