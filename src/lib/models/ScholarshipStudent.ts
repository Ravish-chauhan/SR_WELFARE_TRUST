import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IScholarshipStudent extends Document {
    // Personal Info
    name: string;
    fatherName: string;
    dob: Date;
    gender: "Male" | "Female" | "Other";
    category: "General" | "OBC" | "SC" | "ST" | "EWS";

    // Contact & Address
    phone: string;
    email?: string;
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: string;

    // Academic Info
    studentClass: "10th" | "11th" | "12th" | "Dropper";
    board: "CBSE" | "State Board" | "ICSE" | "Other";
    schoolName: string;
    neetAttempt: "1st" | "2nd" | "3rd+";

    paymentProof?: string;

    createdAt: Date;
    updatedAt: Date;
}

const ScholarshipStudentSchema = new Schema<IScholarshipStudent>(
    {
        name: { type: String, required: true, trim: true },
        fatherName: { type: String, required: true, trim: true },
        dob: { type: Date, required: true },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
        category: { type: String, enum: ["General", "OBC", "SC", "ST", "EWS"], required: true },

        phone: { type: String, required: true, trim: true },
        email: { type: String, trim: true, lowercase: true },
        street: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        district: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        pincode: { type: String, required: true, trim: true },

        studentClass: { type: String, enum: ["10th", "11th", "12th", "Dropper"], required: true },
        board: { type: String, enum: ["CBSE", "State Board", "ICSE", "Other"], required: true },
        schoolName: { type: String, required: true, trim: true },
        neetAttempt: { type: String, enum: ["1st", "2nd", "3rd+"], required: true },
        paymentProof: { type: String }, // base64 data URL of uploaded screenshot
    },
    { timestamps: true }
);

const ScholarshipStudent =
    models.ScholarshipStudent ||
    model<IScholarshipStudent>("ScholarshipStudent", ScholarshipStudentSchema);

export default ScholarshipStudent;
