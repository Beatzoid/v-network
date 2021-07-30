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
    }
};

export default commentController;
