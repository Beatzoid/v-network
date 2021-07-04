export const NOTIFY = "NOTIFY";

export interface INotifyType {
    type: typeof NOTIFY;
    payload: INotify;
}

export interface INotify {
    loading?: boolean;
    error?: string;
    success?: string;
    token?: string;
    user?: string;
}
