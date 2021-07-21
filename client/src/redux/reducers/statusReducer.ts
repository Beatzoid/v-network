import { GLOBALTYPES } from "../types/global";
import { IPostType } from "../types/post";

const statusReducer = (state = false, action: IPostType) => {
    switch (action.type) {
        case GLOBALTYPES.STATUS:
            return action.payload;
        default:
            return state;
    }
};

export default statusReducer;
