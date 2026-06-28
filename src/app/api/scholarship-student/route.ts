import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ScholarshipStudent from "@/lib/models/ScholarshipStudent";
import ScholarshipLead from "@/lib/models/ScholarshipLead";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        const {
            name, fatherName, dob, gender, category,
            phone, email, street, city, district, state, pincode,
            studentClass, board, schoolName, neetAttempt,
            paymentProof,
        } = body;

        // Validate required fields
        if (
            !name || !fatherName || !dob || !gender || !category ||
            !phone || !street || !city || !district || !state || !pincode ||
            !studentClass || !board || !schoolName || !neetAttempt
        ) {
            return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
        }

        // Validate phone (10 digit)
        if (!/^\d{10}$/.test(phone)) {
            return NextResponse.json({ error: "Phone number must be 10 digits" }, { status: 400 });
        }

        // Validate pincode (6 digit)
        if (!/^\d{6}$/.test(pincode)) {
            return NextResponse.json({ error: "Pincode must be 6 digits" }, { status: 400 });
        }

        const student = await ScholarshipStudent.create({
            name: name.trim(),
            fatherName: fatherName.trim(),
            dob: new Date(dob),
            gender,
            category,
            phone: phone.trim(),
            email: email ? email.toLowerCase().trim() : undefined,
            street: street.trim(),
            city: city.trim(),
            district: district.trim(),
            state: state.trim(),
            pincode: pincode.trim(),
            studentClass,
            board,
            schoolName: schoolName.trim(),
            neetAttempt,
            paymentProof: paymentProof || undefined,
        });

        // If they had a partial lead, mark it as converted
        try {
            await ScholarshipLead.findOneAndUpdate(
                { phone: phone.trim() },
                { $set: { isConverted: true } }
            );
        } catch (e) {
            console.error("Failed to update lead conversion status", e);
        }

        return NextResponse.json(
            { message: "Application submitted successfully!", id: student._id },
            { status: 201 }
        );
    } catch (err) {
        console.error("[SCHOLARSHIP STUDENT ERROR]", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
