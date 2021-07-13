import { Router } from "express";

import authController from "../controllers/authController";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh_token", authController.generateAccessToken);

export default router;
