import { Router } from "express";
import { admissionController } from "./admission.controller";

const router = Router();

router.post("/admission", admissionController.createAdmission);

export const admissionRoutes=router;