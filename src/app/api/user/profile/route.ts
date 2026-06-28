import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import Card from "@/lib/models/Card";

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

        const cards = await Card.find({ userId: payload.userId }).sort({ createdAt: -1 });

        return NextResponse.json({ user, cards });
    } catch (err) {
        console.error("[PROFILE GET ERROR]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const payload = await getCurrentUser();
        if (!payload) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();

        // Only allow safe fields to be updated
        const allowedFields = ["name", "phone", "city", "state", "address"];
        const updates: Record<string, unknown> = {};
        for (const field of allowedFields) {
            if (body[field] !== undefined) updates[field] = body[field];
        }

        const user = await User.findByIdAndUpdate(payload.userId, updates, { new: true }).select("-password");

        return NextResponse.json({ user });
    } catch (err) {
        console.error("[PROFILE PUT ERROR]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
