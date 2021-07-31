import { Request, Response } from "express";

import Comments from "../models/commentModel";
import Posts from "../models/postModel";

import { handleError } from "../utils/handleError";

const commentController = {
    createComment: async (req: Request, res: Response) => {
        try {
            const { postId, content, tag, reply } = req.body;

            const newComment = new Comments({
                user: req.user._id,
                content,
                tag,
                reply
            });

            await Posts.findOneAndUpdate(
                { _id: postId },
                { $push: { comments: newComment._id } },
                { new: true }
            );

            await newComment.save();

            return res.json({ newComment });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    updateComment: async (req: Request, res: Response) => {
        try {
            const { content } = req.body;

            const comment = await Comments.findOneAndUpdate(
                { _id: req.params.id, user: req.user._id },
                { content }
            );
            if (!comment)
                return res.status(404).json({ error: "Comment not found!" });

            return res.json({ msg: "Updated successfully" });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    likeComment: async (req: Request, res: Response) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const comment = await Comments.find({
                _id: req.params.id,
                likes: req.user._id
            });

            if (comment?.length > 0)
                return res
                    .status(400)
                    .json({ err: "You already liked this comment" });

            await Comments.findOneAndUpdate(
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
    unlikeComment: async (req: Request, res: Response) => {
        try {
            await Comments.findOneAndUpdate(
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

export default commentController;
