"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admission = void 0;
const mongoose_1 = require("mongoose");
const AdmissionSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "College",
        required: true
    },
}, {
    versionKey: false,
    timestamps: true
});
exports.Admission = (0, mongoose_1.model)("admission", AdmissionSchema);
