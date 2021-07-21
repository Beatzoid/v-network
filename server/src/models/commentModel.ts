import mongoose from "mongoose";

import { Comment } from "../types/types";

const commentSchema = new mongoose.Schema({}, { timestamps: true });

export default mongoose.model<Comment>("comments", commentSchema);
