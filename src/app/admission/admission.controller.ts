import { Request, Response } from "express";
import { Admission } from "./admission.model";

const createAdmission = async (req: Request, res: Response) => {
    try {
        const { candidateName, email, image, phone, address, dob, subject, college } = req.body;

        // Validate all fields
        if (!candidateName || !email || !image || !phone || !address || !dob || !subject || !college) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const existingUser = await Admission.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ success: true, message: "User already exists" });
        }

        // Create new admission entry
        const newAdmission = new Admission({
            candidateName,
            email,
            image,
            phone,
            address,
            dob,
            subject,
            college,
        });

        await newAdmission.save();

        return res.status(201).json({
            success: true,
            message: "Admission created successfully",
            insertedId: newAdmission._id,
        });
    } catch (error: any) {
        // Handle different types of errors
        if (error.name === "ValidationError") {
            res.status(400).json({ success: false, message: "Validation failed", error: error.message });
        } else if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Email already exists", error: error.keyValue });
        } else {
            res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        }
    }
};

export const admissionController = {
    createAdmission
};