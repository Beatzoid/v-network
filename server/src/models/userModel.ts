import mongoose from "mongoose";

import { User } from "../types/types";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
            maxlength: 25
        },
        username: {
            type: String,
            required: true,
            trim: true,
            maxlength: 25,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default:
                "https://res.cloudinary.com/beatzoid/image/upload/v1625167768/mern-social-media/avatars/default_xcfxgb.png"
        },
        role: {
            type: String,
            default: "user"
        },
        gender: {
            type: String,
            default: "male"
        },
        story: {
            type: String,
            default: "",
            maxlength: 200
        },
        website: { type: String, default: "" },
        followers: [
            {
                type: mongoose.Types.ObjectId,
                ref: "users"
            }
        ],
        following: [
            {
                type: mongoose.Types.ObjectId,
                ref: "users"
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model<User>("users", userSchema);
