import { model, Schema } from "mongoose";
import { ICollege } from "./college.interface";

const collegeSchema = new Schema<ICollege>(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        rating: { type: Number, required: true },
        admissionDate: { type: String, required: true },
        researchCount: { type: Number, required: true },
        events: { type: [String], required: true },
        sports: { type: [String], required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const College = model<ICollege>('college', collegeSchema);