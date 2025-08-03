import { model, Schema } from "mongoose";
import { IAdmission, IReview } from "./admission.interface";

const reviewSchema = new Schema<IReview>({
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    reviewedAt: { type: Date, default: Date.now }
});

const AdmissionSchema = new Schema<IAdmission>({
    candidateName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    college: {
        type: Schema.Types.ObjectId,
        ref: "college",
        required: true
    },
    reviews: {
        type: [reviewSchema],
        default: []
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Admission = model<IAdmission>("admission", AdmissionSchema);