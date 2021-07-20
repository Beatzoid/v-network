import { IUser } from "./auth";
import { GLOBALTYPES } from "./global";

export interface IFollowType {
    type: typeof GLOBALTYPES.FOLLOW | typeof GLOBALTYPES.UNFOLLOW;
    payload: IUser;
}
