import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ScholarshipLead from "@/lib/models/ScholarshipLead";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        const {
            name, fatherName, dob, gender, category,
            phone, email, studentClass
        } = body;

        // Basic validation
        if (!name || !fatherName || !dob || !gender || !category || !phone || !studentClass) {
            return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
        }

        if (!/^\d{10}$/.test(phone)) {
            return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
        }

        // Upsert based on phone number so we don't create duplicates 
        // if they click next, back, and next again
        await ScholarshipLead.findOneAndUpdate(
            { phone: phone.trim() },
            {
                $set: {
                    name: name.trim(),
                    fatherName: fatherName.trim(),
                    dob: new Date(dob),
                    gender,
                    category,
                    email: email ? email.toLowerCase().trim() : undefined,
                    studentClass,
                    // If they are submitting a partial again, they might have previously completed the form.
                    // But we don't want to reset `isConverted` if it was true.
                }
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({ message: "Partial lead saved successfully" }, { status: 200 });
    } catch (err) {
        console.error("[PARTIAL LEAD ERROR]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
