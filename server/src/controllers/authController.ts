import argon2 from "argon2";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { Request, Response } from "express";

import logger from "../utils/logger";
import { handleError } from "../utils/handleError";

import Users from "../models/userModel";

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { fullname, username, email, password, gender } = req.body;
            // Makes the entire username lowercase and then removes all spaces
            const newUsername = username.toLowerCase().replace(/ /g, "");

            const existingUsername = await Users.findOne({
                username: newUsername
            });
            if (existingUsername)
                return res.status(400).json({ err: "Username already in use" });

            const existingEmail = await Users.findOne({ email });
            if (existingEmail)
                return res.status(400).json({ err: "Email already in use" });

            if (password.length < 6)
                return res.status(400).json({
                    msg: "Password must be at least 6 characters long"
                });

            const hashedPassword = await argon2.hash(password, {
                hashLength: 200,
                timeCost: 30,
                parallelism: 16
            });

            const newUser = new Users({
                fullname,
                username: newUsername,
                email,
                password: hashedPassword,
                gender
            });

            const accessToken = createAccessToken({ id: newUser._id });
            const refreshToken = createRefreshToken({ id: newUser._id });

            res.cookie("refreshtoken", refreshToken, {
                httpOnly: true,
                secure: true,
                path: "/api/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
            });

            await newUser.save();

            return res.json({
                message: "Successfully registered",
                accessToken,
                user: {
                    ...newUser._doc,
                    password: ""
                }
            });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email }).populate(
                "followers following",
                "-password"
            );

            if (!user)
                return res.status(400).json({ err: "Email does not exist" });

            const correctPassword = await argon2.verify(
                user.password,
                password
            );

            if (!correctPassword)
                return res.status(400).json({ err: "Incorrect password" });

            const accessToken = createAccessToken({ id: user._id });
            const refreshToken = createRefreshToken({ id: user._id });

            res.cookie("refreshtoken", refreshToken, {
                httpOnly: true,
                secure: true,
                path: "/api/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
            });

            return res.json({
                message: "Successfully logged in",
                accessToken,
                user: {
                    ...user._doc,
                    password: ""
                }
            });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    logout: async (_req: Request, res: Response) => {
        try {
            res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
            return res.json({ msg: "Logged out successfully" });
        } catch (err) {
            handleError(err, res);
        }

        return;
    },
    generateAccessToken: async (req: Request, res: Response) => {
        try {
            const refreshToken = req.cookies.refreshtoken;
            if (!refreshToken)
                return res.status(400).json({ err: "Unauthenticated" });

            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                async (
                    err: VerifyErrors | null,
                    result: JwtPayload | undefined
                ) => {
                    if (err) {
                        logger.error(err);
                        return res.status(400).json({ err: "Unauthenticated" });
                    }

                    const user = await Users.findById(result?.id)
                        .select("-password")
                        .populate("followers following", "-password");

                    if (!user)
                        return res
                            .status(400)
                            .json({ err: "User does not exist" });

                    const accessToken = createAccessToken({ id: result?.id });
                    return res.json({ accessToken, user });
                }
            );
        } catch (err) {
            handleError(err, res);
        }

        // Typescript being annoying
        return;
    }
};

const createAccessToken = (id: unknown) => {
    return jwt.sign(id as string, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    });
};

const createRefreshToken = (id: unknown) => {
    return jwt.sign(id as string, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d"
    });
};

export default authController;
