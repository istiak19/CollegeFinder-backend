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
        if (!candidateName || !email || !image || !phone || !address || !dob || !subject || !college) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const existingUser = yield admission_model_1.Admission.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ success: true, message: "User already exists" });
        }
        ;
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
const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admission = yield admission_model_1.Admission.find()
            .select("reviews");
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
    }
    catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.message,
            });
        }
        else if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
                error: error.keyValue,
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    }
});
const getMeAdmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const admission = yield admission_model_1.Admission.find({ email })
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
    }
    catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.message,
            });
        }
        else if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
                error: error.keyValue,
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    }
});
const addReviewToAdmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email } = req.params;
        const { rating, comment } = req.body;
        if (!rating || !comment) {
            return res.status(400).json({ success: false, message: "Rating and comment are required" });
        }
        ;
        const admission = yield admission_model_1.Admission.findOne({ email });
        if (!admission) {
            return res.status(404).json({ success: false, message: "Admission not found" });
        }
        ;
        const newReview = {
            rating,
            comment,
            reviewedAt: new Date(),
        };
        admission.reviews = (_a = admission.reviews) !== null && _a !== void 0 ? _a : [];
        admission.reviews.push(newReview);
        yield admission.save();
        return res.status(200).json({
            success: true,
            message: "Review added successfully",
            review: newReview,
            admissionId: admission._id,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred while adding the review", error: error.message });
    }
});
exports.admissionController = {
    createAdmission,
    getMeAdmission,
    addReviewToAdmission,
    getReview
};
