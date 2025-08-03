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
exports.collegeController = void 0;
const college_model_1 = require("./college.model");
const getCollege = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const college = yield college_model_1.College.find();
        return res.status(201).json({
            success: true,
            message: "College retrieved successfully",
            data: college
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
});
const getSingleCollege = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const college = yield college_model_1.College.findById(id);
        return res.status(201).json({
            success: true,
            message: "College single retrieved successfully",
            data: college
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
});
exports.collegeController = {
    getCollege,
    getSingleCollege
};
