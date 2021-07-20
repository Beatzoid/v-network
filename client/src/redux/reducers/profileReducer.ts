import { IFollowType } from "../types/follow";
import { GLOBALTYPES } from "../types/global";
import { IProfile, IProfileType } from "../types/profile";
import { editData } from "../utils/modifyData";

const initialState = {
    loading: false,
    users: [],
    posts: []
};

const profileReducer = (
    state: IProfile = initialState,
    action: IProfileType | IFollowType
) => {
    switch (action.type) {
        case GLOBALTYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case GLOBALTYPES.GET_USER:
            return {
                ...state,
                users: [...state.users, (action.payload as IProfile).user]
            };
        case GLOBALTYPES.FOLLOW:
            return {
                ...state,
                users: editData(state.users, action.payload._id, action.payload)
            };
        case GLOBALTYPES.UNFOLLOW:
            return {
                ...state,
                users: editData(state.users, action.payload._id, action.payload)
            };
        default:
            return state;
    }
};

export default profileReducer;
