import { GLOBALTYPES } from "../types/global";
import { IProfile, IProfileType } from "../types/profile";

const initialState = {
    loading: false,
    users: [],
    posts: []
};

const profileReducer = (
    state: IProfile = initialState,
    action: IProfileType
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
        default:
            return state;
    }
};

export default profileReducer;
