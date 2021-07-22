import { Router } from "express";
import postController from "../controllers/postController";
import auth from "../middleware/authMiddleware";

const router = Router();

router
    .route("/posts")
    .post(auth, postController.createPost)
    .get(auth, postController.getPosts);

export default router;
