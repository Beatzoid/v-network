import { Document, ObjectId } from "mongoose";

export interface User {
    _id: string;
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
    _doc: Document;
}

export interface Post {
    content: string;
    images: string[];
    likes: User[];
    comments: Comment[];
}
export interface Comment {
    something: string;
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
