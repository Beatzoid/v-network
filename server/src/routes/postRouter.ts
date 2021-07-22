import { Router } from "express";
import postController from "../controllers/postController";
import auth from "../middleware/authMiddleware";

const router = Router();

router
    .route("/posts")
    .post(auth, postController.createPost)
    .get(auth, postController.getPosts);

router.route("/post/:id").patch(auth, postController.updatePost);

router.patch("/post/:id/like", auth, postController.likePost);
router.patch("/post/:id/unlike", auth, postController.unlikePost);

export default router;
