import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/user", userController.createUser);

export const userRoutes = router;