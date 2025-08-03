"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admissionRoutes = void 0;
const express_1 = require("express");
const admission_controller_1 = require("./admission.controller");
const router = (0, express_1.Router)();
router.post("/admission", admission_controller_1.admissionController.createAdmission);
exports.admissionRoutes = router;
