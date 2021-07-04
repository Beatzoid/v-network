import { Dispatch } from "redux";

import { IAuthType, IUserLogin } from "../types/auth";
import { INotifyType } from "../types/notify";

import { postDataAPI } from "../../utils/fetchData";

export const login =
    (data: IUserLogin) =>
    async (dispatch: Dispatch<INotifyType | IAuthType>) => {
        try {
            dispatch({ type: "NOTIFY", payload: { loading: true } });
            const res = await postDataAPI("login", data);
            localStorage.setItem("firstLogin", "true");

            dispatch({
                type: "AUTH",
                payload: { token: res.data.accessToken, user: res.data.user }
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: "NOTIFY",
                payload: { error: err.response.data.msg }
            });
        }
    };
