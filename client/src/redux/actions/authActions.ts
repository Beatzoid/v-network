import { Dispatch } from "redux";

import { IAuthType, IUserLogin, IUserRegister } from "../types/auth";
import { IAlertType } from "../types/alert";

import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../types/global";
import { validateRegister } from "../../utils/validators";

export const login =
    (data: IUserLogin) =>
    async (dispatch: Dispatch<IAlertType | IAuthType>) => {
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
        } catch (err: any) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.err }
            });
        }
    };

export const refreshToken =
    () => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
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
            } catch (err: any) {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: err.response.data.err }
                });
            }
        }
    };

export const register =
    (data: IUserRegister) =>
    async (dispatch: Dispatch<IAuthType | IAlertType>) => {
        const errors = validateRegister(data);
        if (errors.errorLength > 0)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: errors.errors
            });

        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            const res = await postDataAPI("register", data);
            localStorage.setItem("firstLogin", "true");

            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: { token: res.data.accessToken, user: res.data.user }
            });
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: res.data.message }
            });
        } catch (err: any) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.err }
            });
        }
    };

export const logout =
    () => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
        try {
            localStorage.removeItem("firstLogin");
            await postDataAPI("logout");
            window.location.href = "/";
        } catch (err: any) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.err }
            });
        }
    };
