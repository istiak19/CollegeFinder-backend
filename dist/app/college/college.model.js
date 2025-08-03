"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.College = void 0;
const mongoose_1 = require("mongoose");
const collegeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    admissionDate: { type: String, required: true },
    researchCount: { type: Number, required: true },
    events: { type: [String], required: true },
    sports: { type: [String], required: true },
    description: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});
exports.College = (0, mongoose_1.model)('college', collegeSchema);
