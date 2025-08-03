"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collegeRoutes = void 0;
const express_1 = require("express");
const college_controller_1 = require("./college.controller");
const router = (0, express_1.Router)();
router.get("/colleges", college_controller_1.collegeController.getCollege);
router.get("/colleges/:id", college_controller_1.collegeController.getSingleCollege);
exports.collegeRoutes = router;
