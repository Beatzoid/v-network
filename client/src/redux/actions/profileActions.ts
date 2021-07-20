import { Dispatch } from "redux";

import { IAlertType } from "../types/alert";
import { IAuth, IAuthType, IUser } from "../types/auth";
import { GLOBALTYPES } from "../types/global";
import { IProfileType } from "../types/profile";
import { IFollowType } from "../types/follow";

import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { deleteData } from "../utils/modifyData";

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

export const updateUserProfile =
    ({
        userData,
        avatar,
        auth
    }: {
        userData: IUser | Record<string, string>;
        avatar: string | File;
        auth: IAuth;
    }) =>
    async (dispatch: Dispatch<IAuthType | IAlertType>) => {
        if (!userData.fullname)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Fullname is required" }
            });

        if (userData.fullname.length > 25)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Fullname is too long" }
            });

        if (userData.story.length > 200)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Story is too long" }
            });

        try {
            let media: any;
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            if (avatar) media = await imageUpload([avatar]);

            await patchDataAPI(
                "user",
                {
                    ...userData,
                    avatar: avatar ? media![0].url : auth.user?.avatar
                },
                auth.token
            );

            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    ...auth,
                    // @ts-ignore
                    user: {
                        ...auth.user,
                        ...userData,
                        avatar: avatar ? media![0].url : auth.user?.avatar
                    }
                }
            });

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.err }
            });
        }
    };

export const follow =
    ({ users, user, auth }: { users: IUser[]; user: IUser; auth: IAuth }) =>
    async (dispatch: Dispatch<IFollowType | IAuthType>) => {
        let newUser = { ...user, followers: [...user.followers, auth.user!] };

        dispatch({ type: GLOBALTYPES.FOLLOW, payload: newUser });

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user!,
                    following: [...auth.user!.following, user]
                }
            }
        });
    };

export const unfollow =
    ({ users, user, auth }: { users: IUser[]; user: IUser; auth: IAuth }) =>
    async (dispatch: Dispatch<IFollowType | IAuthType>) => {
        let newUser = {
            ...user,
            followers: deleteData(user.followers, auth.user?._id!)
        };

        dispatch({ type: GLOBALTYPES.UNFOLLOW, payload: newUser });

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user!,
                    following: deleteData(auth.user?.following!, newUser._id)
                }
            }
        });
    };
