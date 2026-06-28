import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    dob: Date;
    city: string;
    state: string;
    address: string;
    role: "user" | "admin";
    createdAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        phone: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
        dob: { type: Date, required: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
