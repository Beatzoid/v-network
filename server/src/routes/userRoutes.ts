import { Router } from "express";
import userController from "../controllers/userController";
import auth from "../middleware/authMiddleware";

const router = Router();

router.get("/search", auth, userController.searchUser);

export default router;
