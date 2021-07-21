import { GLOBALTYPES } from "../types/global";
import { IPost, IPostType } from "../types/post";

const initialState: { posts: IPost[] } = {
    posts: []
};

const postReducer = (state = initialState, action: IPostType) => {
    switch (action.type) {
        case GLOBALTYPES.CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        default:
            return state;
    }
};

export default postReducer;
