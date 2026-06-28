import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ScholarshipLead from "@/lib/models/ScholarshipLead";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
    try {
        const payload = await getCurrentUser();
        if (!payload || payload.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        await connectDB();
        
        // Fetch all leads, sorted by newest first
        const leads = await ScholarshipLead.find().sort({ createdAt: -1 });

        return NextResponse.json({ leads });
    } catch (err) {
        console.error("[ADMIN LEADS ERROR]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
