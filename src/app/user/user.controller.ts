import { Request, Response } from "express";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, photo } = req.body;

        if (!name || !email || !photo) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ success: true, message: "User already exists" });
        }

        const newUser = new User({
            name,
            email,
            photo,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            insertedId: newUser._id,
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

export const userController = {
    createUser,
};