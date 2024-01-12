import { NextResponse } from "next/server";

export default async function middleware(request) {
    const path = request.nextUrl.pathname;

    const isAuthPage = path === "/signin" || path === "/signup";

    const token = request.cookies.get("token")?.value || "";
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isAuthPage && !token) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }
}

export const config = {
    matcher: ["/", "/signin", "/signup"],
};
