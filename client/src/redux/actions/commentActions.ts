import { Dispatch } from "redux";
import { postDataAPI } from "../../utils/fetchData";

import { IAlertType } from "../types/alert";
import { IAuth } from "../types/auth";
import { GLOBALTYPES } from "../types/global";
import { IComment, IPost, IPostType } from "../types/post";

export const createComment =
    (post: IPost, newComment: IComment, auth: IAuth) =>
    async (dispatch: Dispatch<IAlertType | IPostType>) => {
        const newPost = { ...post, comments: [...post.comments, newComment] };

        dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost });

        try {
            const data = { ...newComment, postId: post._id };
            const res = await postDataAPI("comment", data, auth.token);
            console.log(res);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.err }
            });
        }
    };
