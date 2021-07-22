import { Router } from "express";
import postController from "../controllers/postController";
import auth from "../middleware/authMiddleware";

const router = Router();

router
    .route("/posts")
    .post(auth, postController.createPost)
    .get(auth, postController.getPosts);

router.route("/post/:id").patch(auth, postController.updatePost);

export default router;
