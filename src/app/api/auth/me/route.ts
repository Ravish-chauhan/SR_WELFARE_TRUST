import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET() {
    try {
        const payload = await getCurrentUser();
        if (!payload) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        await connectDB();
        const user = await User.findById(payload.userId).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (err) {
        console.error("[ME ERROR]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
