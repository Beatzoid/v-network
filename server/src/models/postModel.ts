import mongoose from "mongoose";

import { Post } from "../types/types";

const postSchema = new mongoose.Schema(
    {
        content: String,
        images: {
            type: Array,
            required: true
        },
        likes: [{ type: mongoose.Types.ObjectId, ref: "users" }],
        comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
        user: { type: mongoose.Types.ObjectId, ref: "users" }
    },
    { timestamps: true }
);

export default mongoose.model<Post>("posts", postSchema);
