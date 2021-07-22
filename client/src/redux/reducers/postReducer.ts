import { GLOBALTYPES } from "../types/global";
import { IPost } from "../types/post";
import { editData } from "../utils/modifyData";

const initialState: {
    loading: boolean;
    posts: IPost[];
    result: number;
    page: number;
} = {
    loading: false,
    posts: [],
    result: 0,
    page: 2
};

const postReducer = (
    state = initialState,
    action: {
        type:
            | typeof GLOBALTYPES.STATUS
            | typeof GLOBALTYPES.CREATE_POST
            | typeof GLOBALTYPES.LOADING_POST
            | typeof GLOBALTYPES.GET_POSTS
            | typeof GLOBALTYPES.UPDATE_POST;
        payload: { result: number; posts: IPost[]; _id: string };
    }
) => {
    switch (action.type) {
        case GLOBALTYPES.CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case GLOBALTYPES.LOADING_POST:
            return {
                ...state,
                loading: action.payload
            };
        case GLOBALTYPES.GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result
            };
        case GLOBALTYPES.UPDATE_POST:
            return {
                ...state,
                posts: editData(state.posts, action.payload._id, action.payload)
            };
        default:
            return state;
    }
};

export default postReducer;
