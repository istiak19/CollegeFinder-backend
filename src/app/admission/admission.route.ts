import { Router } from "express";
import { admissionController } from "./admission.controller";

const router = Router();

router.post("/admission", admissionController.createAdmission);
router.get("/review", admissionController.getReview);
router.get("/admission/:email", admissionController.getMeAdmission);
router.put("/admission/:email", admissionController.addReviewToAdmission);

export const admissionRoutes = router;