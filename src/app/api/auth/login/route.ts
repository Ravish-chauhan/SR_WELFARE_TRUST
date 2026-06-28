import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { signToken, getAuthCookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
        });

        const res = NextResponse.json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });

        const cookieOpts = getAuthCookieOptions();
        res.cookies.set(cookieOpts.name, token, cookieOpts);

        return res;
    } catch (err) {
        console.error("[LOGIN ERROR]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
