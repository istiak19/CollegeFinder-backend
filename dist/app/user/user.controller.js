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
exports.userController = void 0;
const user_model_1 = require("./user.model");
const getUserSingle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const existingUser = yield user_model_1.User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        ;
        return res.status(201).json({
            success: true,
            message: "User retrieved successfully",
            data: existingUser
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, photo } = req.body;
        if (!name || !email || !photo) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const existingUser = yield user_model_1.User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ success: true, message: "User already exists" });
        }
        const newUser = new user_model_1.User(Object.assign({ name,
            email,
            photo }, req.body));
        yield newUser.save();
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            insertedId: newUser._id,
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
const updateUserSingle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, photo, phone, university, address } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        ;
        const existingUser = yield user_model_1.User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // Update the fields that were sent in the request body
        existingUser.name = name || existingUser.name;
        existingUser.photo = photo || existingUser.photo;
        existingUser.phone = phone || existingUser.phone;
        existingUser.university = university || existingUser.university;
        existingUser.address = address || existingUser.address;
        // Save the updated user data
        yield existingUser.save();
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: existingUser,
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
exports.userController = {
    createUser,
    getUserSingle,
    updateUserSingle
};
