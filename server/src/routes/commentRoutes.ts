import { Router } from "express";

import auth from "../middleware/authMiddleware";

import commentController from "../controllers/commentController";

const router = Router();

router.post("/comment", auth, commentController.createComment);

export default router;
