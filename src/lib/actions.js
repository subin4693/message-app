import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { User } from "@/lib/models";
import bcrypt from "bcrypt";
import connect from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const signin = async (formData) => {
    "use server";

    try {
        const name = formData.get("name");
        const password = formData.get("password");

        if (!name || !password) {
            throw new Error("send an valid details");
        }

        await connect();

        const user = await User.findOne({ name }).select("name password");

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new Error("password miss match");
        }

        const token = jwt.sign(
            { name: user.name, password: user.password, _id: user._id },
            process.env.JWT_SECRECT,
            { expiresIn: "1h" },
        );

        cookies().set("token", token);
    } catch (error) {
        console.log(error);
    }
    revalidatePath("/");
    redirect("/");
};

export const signup = async (formData) => {
    "use server";

    try {
        const name = formData.get("name");
        const password = formData.get("password");
        const confirmpassword = formData.get("confirmpassword");
        if (password !== confirmpassword) {
            alert("passwords dosn't match");
            return;
        }

        await connect();

        if (!name || !password) {
            throw new Error("send an valid details");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const res = await User.create({
            name,
            password: hashedPassword,
        });
        const { name: retName, password: retPassword } = await res;

        const token = jwt.sign(
            { name: retName, password: retPassword },
            process.env.JWT_SECRECT,
            { expiresIn: "1h" },
        );

        cookies().set("token", token);
    } catch (error) {
        console.log(error);
        alert("signup faild try again");
    }
    revalidatePath("/ ");
    redirect("/ ");
};
