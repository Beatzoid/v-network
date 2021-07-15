import { Dispatch } from "redux";

import { getDataAPI } from "../../utils/fetchData";
import { IAlertType } from "../types/alert";
import { IAuth, IUser } from "../types/auth";
import { GLOBALTYPES } from "../types/global";
import { IProfileType } from "../types/profile";

export const getProfileUsers =
    ({ users, id, auth }: { users: IUser[]; id: string; auth: IAuth }) =>
    async (dispatch: Dispatch<IProfileType | IAlertType>) => {
        if (users.every((user) => user._id !== id)) {
            try {
                dispatch({ type: GLOBALTYPES.LOADING, payload: true });
                const res = await getDataAPI(`/user/${id}`, auth.token!);

                dispatch({ type: GLOBALTYPES.GET_USER, payload: res.data });
                dispatch({ type: GLOBALTYPES.LOADING, payload: false });
            } catch (err) {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: err.response.data.err }
                });
            }
        }
    };
