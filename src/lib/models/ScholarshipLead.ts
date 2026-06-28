import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IScholarshipLead extends Document {
    name: string;
    fatherName: string;
    dob: Date;
    gender: "Male" | "Female" | "Other";
    category: "General" | "OBC" | "SC" | "ST" | "EWS";
    phone: string;
    email?: string;
    studentClass: "10th" | "11th" | "12th" | "Dropper";
    isConverted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ScholarshipLeadSchema = new Schema<IScholarshipLead>(
    {
        name: { type: String, required: true, trim: true },
        fatherName: { type: String, required: true, trim: true },
        dob: { type: Date, required: true },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
        category: { type: String, enum: ["General", "OBC", "SC", "ST", "EWS"], required: true },
        phone: { type: String, required: true, trim: true, unique: true }, // unique to prevent duplicates for same number
        email: { type: String, trim: true, lowercase: true },
        studentClass: { type: String, enum: ["10th", "11th", "12th", "Dropper"], required: true },
        isConverted: { type: Boolean, default: false }, // Will be set to true if they complete the form
    },
    { timestamps: true }
);

const ScholarshipLead =
    models.ScholarshipLead ||
    model<IScholarshipLead>("ScholarshipLead", ScholarshipLeadSchema);

export default ScholarshipLead;
