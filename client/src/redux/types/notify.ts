import { GLOBALTYPES } from "./global";

export interface INotifyType {
    type: typeof GLOBALTYPES.ALERT;
    payload: INotify;
}

export interface INotify {
    loading?: boolean;
    error?: string;
    success?: string;
}
