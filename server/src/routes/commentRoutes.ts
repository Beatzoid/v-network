import { Router } from "express";

import auth from "../middleware/authMiddleware";

import commentController from "../controllers/commentController";

const router = Router();

router.post("/comment", auth, commentController.createComment);

router.patch("/comment/:id", auth, commentController.updateComment);

router.patch("/comment/:id/like", auth, commentController.likeComment);
router.patch("/comment/:id/unlike", auth, commentController.unlikeComment);

export default router;
