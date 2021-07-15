import { IUser } from "./auth";
import { GLOBALTYPES } from "./global";

export interface IProfile {
    users: IUser[];
    user?: IUser;
    loading: boolean;
}

export interface IProfileType {
    type: typeof GLOBALTYPES.LOADING | typeof GLOBALTYPES.GET_USER;
    payload: boolean | IProfile;
}
