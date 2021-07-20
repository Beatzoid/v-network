import { ObjectId } from "mongoose";

export interface User {
    fullname: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
    gender: string;
    story: string;
    website: string;
    followers: ObjectId[];
    following: ObjectId[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _doc: any;
}

declare module "express" {
    export interface Request {
        user: User;
    }
}

declare module "express-serve-static-core" {
    export interface Request {
        user: User;
    }
}
