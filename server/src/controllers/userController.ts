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
    }
};

export default userController;
