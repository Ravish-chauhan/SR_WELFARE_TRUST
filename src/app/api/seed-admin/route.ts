import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

// One-time admin seeder — visit /api/seed-admin to create the first admin
// REMOVE this file after first use in production!
export async function GET() {
    try {
        await connectDB();

        const existing = await User.findOne({ email: "admin@srwelfare.com" });
        if (existing) {
            return NextResponse.json({ message: "Admin already exists" }, { status: 200 });
        }

        const hashedPassword = await bcrypt.hash("Admin@1234", 12);

        await User.create({
            name: "SR Welfare Admin",
            email: "admin@srwelfare.com",
            phone: "9999999999",
            password: hashedPassword,
            age: 30,
            gender: "Other",
            dob: new Date("1994-01-01"),
            city: "Admin City",
            state: "Maharashtra",
            address: "SR Welfare Trust HQ",
            role: "admin",
        });

        return NextResponse.json({
            message: "✅ Admin created successfully!",
            credentials: {
                email: "admin@srwelfare.com",
                password: "Admin@1234",
            },
        });
    } catch (err) {
        console.error("[SEED ERROR]", err);
        return NextResponse.json({ error: "Failed to seed admin" }, { status: 500 });
    }
}
