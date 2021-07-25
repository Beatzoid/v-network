import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import Users from "../models/userModel";
import { User } from "../types/types";

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header("Authentication");

        if (!token)
            return res
                .status(400)
                .json({ msg: "Invalid authentication, please login" });

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        ) as JwtPayload;
        if (!decoded)
            return res
                .status(400)
                .json({ msg: "Invalid authentication, please login" });

        const user = (await Users.findOne({ _id: decoded.id })) as User;
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }

    // Typescript's annoying
    return;
};

export default authMiddleware;
