import { IUser } from "./auth";
import { GLOBALTYPES } from "./global";

export interface IPostType {
    type:
        | typeof GLOBALTYPES.STATUS
        | typeof GLOBALTYPES.CREATE_POST
        | typeof GLOBALTYPES.LOADING_POST
        | typeof GLOBALTYPES.GET_POSTS
        | typeof GLOBALTYPES.UPDATE_POST;
    payload: { posts: IPost[] } | IPost | boolean;
}

export interface Image {
    public_id: string;
    url: string;
}

export interface IComment {
    _id?: string;
    content: string;
    createdAt: string;
    user: IUser;
    likes: IUser[];
    reply?: IComment[];
}

export interface IPost {
    _id: string;
    content: string;
    images: Image[];
    likes: IUser[];
    comments: IComment[];
    user: IUser;
    createdAt: string;
}
