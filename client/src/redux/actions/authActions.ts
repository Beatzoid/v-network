import { Dispatch } from "redux";

import { IAuthType, INotifyType, IUserLogin } from "../types";
import { postDataAPI } from "../../utils/fetchData";

export const login =
    (data: IUserLogin) =>
    async (dispatch: Dispatch<INotifyType | IAuthType>) => {
        try {
            dispatch({ type: "NOTIFY", payload: { loading: true } });
            const res = await postDataAPI("login", data);
            localStorage.setItem("firstLogin", "true");
            console.log(res);

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
