import { model, Schema } from "mongoose";
import { IAdmission } from "./admission.interface";

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
        ref: "College",
        required: true
    },
}, {
    versionKey: false,
    timestamps: true
});

export const Admission = model<IAdmission>("admission", AdmissionSchema);