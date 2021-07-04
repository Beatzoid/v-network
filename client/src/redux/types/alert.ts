import { GLOBALTYPES } from "./global";

export interface IAlertType {
    type: typeof GLOBALTYPES.ALERT;
    payload: IAlert;
}

export interface IAlert {
    loading?: boolean;
    error?: any;
    success?: string;
    fullname?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmpassword?: string;
}
