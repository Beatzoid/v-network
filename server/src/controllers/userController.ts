import { Request, Response } from "express";

import Users from "../models/userModel";

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
    }
};

export default userController;
