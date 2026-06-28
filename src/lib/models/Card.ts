import mongoose, { Schema, Document, models, model, Types } from "mongoose";

export interface ICard extends Document {
    userId: Types.ObjectId;
    cardNumber: string;
    discountPercent: number;
    hospitalName: string;
    validUntil: Date;
    assignedBy: string;
    isActive: boolean;
    createdAt: Date;
}

const CardSchema = new Schema<ICard>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        cardNumber: { type: String, unique: true, required: true },
        discountPercent: { type: Number, required: true, min: 1, max: 100 },
        hospitalName: { type: String, required: true, trim: true },
        validUntil: { type: Date, required: true },
        assignedBy: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Card = models.Card || model<ICard>("Card", CardSchema);
export default Card;
