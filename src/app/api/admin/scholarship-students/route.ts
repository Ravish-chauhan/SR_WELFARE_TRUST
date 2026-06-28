import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import ScholarshipStudent from "@/lib/models/ScholarshipStudent";

export async function GET() {
    try {
        const payload = await getCurrentUser();
        if (!payload || payload.role !== "admin") {
            return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
        }

        await connectDB();
        const students = await ScholarshipStudent.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ students });
    } catch (err) {
        console.error("[SCHOLARSHIP STUDENTS ADMIN ERROR]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
