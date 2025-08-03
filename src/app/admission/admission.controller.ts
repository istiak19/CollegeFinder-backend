import { Request, Response } from "express";
import { Admission } from "./admission.model";

const createAdmission = async (req: Request, res: Response) => {
    try {
        const { candidateName, email, image, phone, address, dob, subject, college } = req.body;
        if (!candidateName || !email || !image || !phone || !address || !dob || !subject || !college) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const existingUser = await Admission.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ success: true, message: "User already exists" });
        };

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
        if (error.name === "ValidationError") {
            res.status(400).json({ success: false, message: "Validation failed", error: error.message });
        } else if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Email already exists", error: error.keyValue });
        } else {
            res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        }
    }
};

const getReview = async (req: Request, res: Response) => {
    try {
        const admission = await Admission.find()
            .select("reviews")

        if (!admission.length) {
            return res.status(404).json({
                success: false,
                message: "No reviews found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Reviews retrieved successfully",
            data: admission,
        });

    } catch (error: any) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.message,
            });
        } else if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
                error: error.keyValue,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    }
};

const getMeAdmission = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;

        const admission = await Admission.find({ email })
            .populate("college", "name")
            .sort({ createdAt: -1 });

        if (!admission.length) {
            return res.status(404).json({
                success: false,
                message: "No admission found for this email",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admission retrieved successfully",
            data: admission,
        });

    } catch (error: any) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.message,
            });
        } else if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
                error: error.keyValue,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    }
};

const addReviewToAdmission = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const { rating, comment } = req.body;

        if (!rating || !comment) {
            return res.status(400).json({ success: false, message: "Rating and comment are required" });
        };

        const admission = await Admission.findOne({ email });

        if (!admission) {
            return res.status(404).json({ success: false, message: "Admission not found" });
        };

        const newReview = {
            rating,
            comment,
            reviewedAt: new Date(),
        };

        admission.reviews = admission.reviews ?? [];
        admission.reviews.push(newReview);
        await admission.save();
        return res.status(200).json({
            success: true,
            message: "Review added successfully",
            review: newReview,
            admissionId: admission._id,
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred while adding the review", error: error.message });
    }
};

export const admissionController = {
    createAdmission,
    getMeAdmission,
    addReviewToAdmission,
    getReview 
};