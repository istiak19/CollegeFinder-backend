import { Request, Response } from "express";
import { College } from "./college.model";

const getCollege = async (req: Request, res: Response) => {
    try {
        const college = await College.find();

        return res.status(201).json({
            success: true,
            message: "College retrieved successfully",
            data: college
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });

    }
};

const getSingleCollege = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const college = await College.findById(id);

        return res.status(201).json({
            success: true,
            message: "College single retrieved successfully",
            data: college
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });

    }
};

export const collegeController = {
    getCollege,
    getSingleCollege
};