import mongoose from "mongoose";

import { Comment } from "../types/types";

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        tag: Object,
        reply: mongoose.Types.ObjectId,
        likes: [{ type: mongoose.Types.ObjectId, ref: "users" }],
        user: { type: mongoose.Types.ObjectId, ref: "users" }
    },
    { timestamps: true }
);

export default mongoose.model<Comment>("comments", commentSchema);
