import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Card from "@/lib/models/Card";
import User from "@/lib/models/User";

function generateCardNumber(): string {
    const prefix = "SRW";
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
}

export async function POST(req: NextRequest) {
    try {
        const payload = await getCurrentUser();
        if (!payload || payload.role !== "admin") {
            return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
        }

        await connectDB();
        const body = await req.json();
        const { userId, discountPercent, hospitalName, validUntil } = body;

        if (!userId || !discountPercent || !hospitalName || !validUntil) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const card = await Card.create({
            userId,
            cardNumber: generateCardNumber(),
            discountPercent: Number(discountPercent),
            hospitalName: hospitalName.trim(),
            validUntil: new Date(validUntil),
            assignedBy: payload.name,
            isActive: true,
        });

        return NextResponse.json({ message: "Card assigned successfully", card }, { status: 201 });
    } catch (err) {
        console.error("[ASSIGN CARD ERROR]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const payload = await getCurrentUser();
        if (!payload || payload.role !== "admin") {
            return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        await connectDB();
        const query = userId ? { userId } : {};
        const cards = await Card.find(query).populate("userId", "name email phone").sort({ createdAt: -1 });

        return NextResponse.json({ cards });
    } catch (err) {
        console.error("[GET CARDS ERROR]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
