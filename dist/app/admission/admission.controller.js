"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admissionController = void 0;
const admission_model_1 = require("./admission.model");
const createAdmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { candidateName, email, image, phone, address, dob, subject, college } = req.body;
        // Validate all fields
        if (!candidateName || !email || !image || !phone || !address || !dob || !subject || !college) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const existingUser = yield admission_model_1.Admission.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ success: true, message: "User already exists" });
        }
        // Create new admission entry
        const newAdmission = new admission_model_1.Admission({
            candidateName,
            email,
            image,
            phone,
            address,
            dob,
            subject,
            college,
        });
        yield newAdmission.save();
        return res.status(201).json({
            success: true,
            message: "Admission created successfully",
            insertedId: newAdmission._id,
        });
    }
    catch (error) {
        // Handle different types of errors
        if (error.name === "ValidationError") {
            res.status(400).json({ success: false, message: "Validation failed", error: error.message });
        }
        else if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Email already exists", error: error.keyValue });
        }
        else {
            res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        }
    }
});
exports.admissionController = {
    createAdmission
};
