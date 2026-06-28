import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET() {
    try {
        const payload = await getCurrentUser();
        if (!payload || payload.role !== "admin") {
            return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
        }

        await connectDB();
        const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });

        return NextResponse.json({ users });
    } catch (err) {
        console.error("[ADMIN USERS ERROR]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
