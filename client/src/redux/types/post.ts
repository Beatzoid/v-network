import { IUser } from "./auth";
import { GLOBALTYPES } from "./global";

export interface IPostType {
    type: typeof GLOBALTYPES.STATUS | typeof GLOBALTYPES.CREATE_POST;
    payload: IPost;
}

export interface Image {
    public_id: string;
    url: string;
}

export interface IPost {
    content: string;
    images: Image[];
    likes: IUser[];
    // TODO: Replace this with a real type
    comments: any[];
    user: IUser;
}
