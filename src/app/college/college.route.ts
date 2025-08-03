import { Router } from "express";
import { collegeController } from "./college.controller";

const router = Router();

router.get("/colleges",collegeController.getCollege);
router.get("/colleges/:id",collegeController.getSingleCollege);

export const collegeRoutes = router;