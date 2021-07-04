export const AUTH = "AUTH";

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
    access_token?: string;
    user?: IUser;
}

export interface IAuthType {
    type: typeof AUTH;
    payload: IAuth;
}

export interface IUserLogin {
    email: string;
    password: string;
}
