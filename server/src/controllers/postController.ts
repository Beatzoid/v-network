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
            })
                .populate("user likes", "avatar username fullname")
                .populate({
                    path: "comments",
                    populate: { path: "user likes", select: "-password" }
                })
                .sort({ createdAt: "desc" });

            return res.json({
                msg: "Successfully got posts",
                result: posts.length,
                posts
            });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    updatePost: async (req: Request, res: Response) => {
        try {
            const { content, images } = req.body;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const post: any = await Posts.findOneAndUpdate(
                { _id: req.params.id },
                { content, images }
            ).populate("user", "avatar username fullname");

            return res.json({
                msg: "Successfully updated post",
                newPost: { ...post?._doc, content, images }
            });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    likePost: async (req: Request, res: Response) => {
        try {
            const post = await Posts.find({
                _id: req.params.id,
                likes: req.user._id
            });

            if (post?.length > 0)
                return res
                    .status(400)
                    .json({ err: "You already liked this post" });

            await Posts.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: { likes: req.user._id }
                },
                { new: true }
            );

            return res.json({ msg: "Successfully liked" });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    unlikePost: async (req: Request, res: Response) => {
        try {
            await Posts.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $pull: { likes: req.user._id }
                },
                { new: true }
            );

            return res.json({ msg: "Successfully unliked" });
        } catch (err) {
            handleError(err, res);
        }

        return;
    }
};

export default postController;
