import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { signToken, getAuthCookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        const { name, email, phone, password, age, gender, dob, city, state, address } = body;

        // Validate required fields
        if (!name || !email || !phone || !password || !age || !gender || !dob || !city || !state || !address) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check duplicate email
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            password: hashedPassword,
            age: Number(age),
            gender,
            dob: new Date(dob),
            city: city.trim(),
            state: state.trim(),
            address: address.trim(),
            role: "user",
        });

        // Issue JWT
        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
        });

        const res = NextResponse.json(
            { message: "Account created successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role } },
            { status: 201 }
        );

        const cookieOpts = getAuthCookieOptions();
        res.cookies.set(cookieOpts.name, token, cookieOpts);

        return res;
    } catch (err) {
        console.error("[REGISTER ERROR]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
