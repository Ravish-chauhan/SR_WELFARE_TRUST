import { NextResponse } from "next/server";
import { getAuthCookieOptions } from "@/lib/auth";

export async function POST() {
    const res = NextResponse.json({ message: "Logged out successfully" });
    const cookieOpts = getAuthCookieOptions(0); // maxAge = 0 clears the cookie
    res.cookies.set(cookieOpts.name, "", { ...cookieOpts, maxAge: 0 });
    return res;
}
