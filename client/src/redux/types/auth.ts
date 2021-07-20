import { GLOBALTYPES } from "./global";

export interface IUser {
    avatar: string;
    email: string;
    createdAt: string;
    username: string;
    fullname: string;
    gender: string;
    followers: IUser[];
    following: IUser[];
    role: string;
    type: string;
    updatedAt: string;
    website: string;
    story: string;
    _id: string;
}

export interface IAuth {
    msg?: string;
    token?: string;
    user?: IUser;
}

export interface IAuthType {
    type: typeof GLOBALTYPES.AUTH;
    payload: IAuth;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
    gender: string;
}
