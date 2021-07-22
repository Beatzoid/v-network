import { Request, Response } from "express";

import Posts from "../models/postModel";

import { handleError } from "../utils/handleError";

const postController = {
    createPost: async (req: Request, res: Response) => {
        try {
            const { content, images } = req.body;

            if (images.length === 0)
                return res
                    .status(400)
                    .json({ err: "You must select at least one image" });

            const newPost = new Posts({ content, images, user: req.user._id });
            await newPost.save();

            return res.json({ msg: "Successfully created post", newPost });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    getPosts: async (req: Request, res: Response) => {
        try {
            const posts = await Posts.find({
                user: [...req.user.following, req.user._id]
            }).populate("user", "avatar username fullname");

            return res.json({
                msg: "Successfully got posts",
                result: posts.length,
                posts
            });
        } catch (err) {
            handleError(err, res);
        }

        return;
    }
};

export default postController;
