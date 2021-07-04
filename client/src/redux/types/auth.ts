import { GLOBALTYPES } from "./global";

export interface IUser {
    avatar: string;
    createdAt: string;
    name: string;
    role: string;
    type: string;
    updatedAt: string;
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
