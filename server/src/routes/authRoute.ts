import { Router } from "express";

import { authController } from "../controllers/authController";

const router = Router();

router.get("/test", (_, res) => res.json({ msg: "works" }));
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh_token", authController.generateAccessToken);

export default router;
