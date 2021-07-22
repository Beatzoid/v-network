import { GLOBALTYPES } from "../types/global";
import { IPost } from "../types/post";

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
            | typeof GLOBALTYPES.GET_POSTS;
        payload: { result: number; posts: IPost[] };
    }
) => {
    switch (action.type) {
        case GLOBALTYPES.CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
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
        default:
            return state;
    }
};

export default postReducer;
