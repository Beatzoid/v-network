import { Request, Response } from "express";

import Users from "../models/userModel";

import { sanitizeInput } from "../utils/sanitizeInput";
import { handleError } from "../utils/handleError";

const userController = {
    searchUser: async (req: Request, res: Response) => {
        try {
            const users = await Users.find({
                username: { $regex: req.query.username as string }
            })
                .limit(10)
                .select("fullname username avatar");
            return res.json({ users });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    getUser: async (req: Request, res: Response) => {
        try {
            const user = await Users.findById(req.params.id)
                .select("-password")
                .populate("followers following", "-password");
            if (!user) return res.status(404).json({ msg: "User not found" });
            return res.json({ user });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    updateUser: async (req: Request, res: Response) => {
        try {
            sanitizeInput(req.body);

            const { avatar, fullname, story, website, gender } = req.body;
            if (!fullname)
                return res
                    .status(400)
                    .json({ msg: "Please add your full name" });

            await Users.findOneAndUpdate(
                { _id: req.user._id },
                { avatar, fullname, story, website, gender }
            );

            return res.json({ msg: "Updated successfully!" });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    follow: async (req: Request, res: Response) => {
        try {
            const user = await Users.find({
                _id: req.params.id,
                followers: req.user._id
            });
            if (user.length > 0)
                return res
                    .status(400)
                    .json({ err: "You already followed this user" });

            await Users.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { followers: req.user._id } },
                { new: true }
            ).populate("followers following", "-password");

            await Users.findOneAndUpdate(
                { _id: req.user._id },
                { $push: { following: req.params.id } },
                { new: true }
            );

            return res.json({ msg: "Successfully followed" });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    unfollow: async (req: Request, res: Response) => {
        try {
            await Users.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { followers: req.user._id } },
                { new: true }
            );

            await Users.findOneAndUpdate(
                { _id: req.user._id },
                { $pull: { following: req.params.id } },
                { new: true }
            );

            return res.json({ msg: "Successfully unfollowed" });
        } catch (err) {
            handleError(err, res);
        }

        return;
    }
};

export default userController;
