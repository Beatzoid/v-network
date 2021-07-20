import { Request, Response } from "express";

import Users from "../models/userModel";

import { sanitizeInput } from "../utils/sanitizeInput";

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
            return res.status(500).json({ msg: err.message });
        }
    },
    getUser: async (req: Request, res: Response) => {
        try {
            const user = await Users.findById(req.params.id).select(
                "-password"
            );
            if (!user) return res.status(404).json({ msg: "User not found" });
            return res.json({ user });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
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
            return res.status(500).json({ err: err.message });
        }
    }
};

export default userController;
