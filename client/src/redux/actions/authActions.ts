import { Dispatch } from "redux";

import { IAuthType, IUserLogin } from "../types/auth";
import { INotifyType } from "../types/notify";

import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../types/global";

export const login =
    (data: IUserLogin) =>
    async (dispatch: Dispatch<INotifyType | IAuthType>) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
            const res = await postDataAPI("login", data);
            localStorage.setItem("firstLogin", "true");

            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: { token: res.data.accessToken, user: res.data.user }
            });
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: res.data.message }
            });
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg }
            });
        }
    };

export const refreshToken =
    () => async (dispatch: Dispatch<INotifyType | IAuthType>) => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            try {
                const res = await postDataAPI("refresh_token");
                dispatch({
                    type: GLOBALTYPES.AUTH,
                    payload: {
                        token: res.data.accessToken,
                        user: res.data.user
                    }
                });

                dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
            } catch (err) {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: err.response.data.msg }
                });
            }
        }
    };
