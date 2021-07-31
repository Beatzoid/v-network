import { Dispatch } from "redux";
import { patchDataAPI, postDataAPI } from "../../utils/fetchData";

import { IAlertType } from "../types/alert";
import { IAuth } from "../types/auth";
import { GLOBALTYPES } from "../types/global";
import { IComment, IPost, IPostType } from "../types/post";
import { deleteData, editData } from "../utils/modifyData";

export const createComment =
    (post: IPost, newComment: IComment, auth: IAuth) =>
    async (dispatch: Dispatch<IAlertType | IPostType>) => {
        const newPost = { ...post, comments: [...post.comments, newComment] };

        dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost });

        try {
            const data = { ...newComment, postId: post._id };
            const res = await postDataAPI("comment", data, auth.token);

            const newData = { ...res.data.newComment, user: auth.user! };
            const newPost = { ...post, comments: [...post.comments, newData] };
            dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost });
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.err }
            });
        }
    };

export const updateComment =
    (comment: IComment, post: IPost, content: string, auth: IAuth) =>
    async (dispatch: Dispatch<IAlertType | IPostType>) => {
        const newComments = editData(post.comments, comment._id!, {
            ...comment,
            content
        });
        const newPost = { ...post, comments: newComments };

        dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost });
        try {
            await patchDataAPI(
                `comment/${comment._id}`,
                { content },
                auth.token
            );
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.err }
            });
        }
    };

export const likeComment =
    (comment: IComment, post: IPost, auth: IAuth) =>
    async (dispatch: Dispatch<IAlertType | IPostType>) => {
        const newComment = {
            ...comment,
            likes: [...comment.likes, auth.user!]
        };
        const newComments = editData(post.comments, comment._id!, newComment);
        const newPost = { ...post, comments: newComments };

        dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost });

        try {
            await patchDataAPI(`comment/${comment._id}/like`, null, auth.token);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.err }
            });
        }
    };

export const unlikeComment =
    (comment: IComment, post: IPost, auth: IAuth) =>
    async (dispatch: Dispatch<IAlertType | IPostType>) => {
        const newComment = {
            ...comment,
            likes: deleteData(comment.likes, auth.user?._id!)
        };
        const newComments = editData(post.comments, comment._id!, newComment);
        const newPost = { ...post, comments: newComments };

        dispatch({ type: GLOBALTYPES.UPDATE_POST, payload: newPost });

        try {
            await patchDataAPI(
                `comment/${comment._id}/unlike`,
                null,
                auth.token
            );
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.err }
            });
        }
    };
