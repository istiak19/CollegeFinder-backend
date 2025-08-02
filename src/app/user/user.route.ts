import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/user", userController.createUser);
router.get("/user/:email", userController.getUserSingle);
router.put("/user/:email", userController.updateUserSingle);

export const userRoutes = router;