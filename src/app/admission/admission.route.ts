import { Router } from "express";
import { admissionController } from "./admission.controller";

const router = Router();

router.post("/admission", admissionController.createAdmission);
router.get("/admission/:email", admissionController.getMeAdmission);

export const admissionRoutes = router;