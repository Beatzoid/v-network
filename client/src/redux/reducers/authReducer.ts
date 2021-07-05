import { IAuth, IAuthType } from "../types/auth";
import { GLOBALTYPES } from "../types/global";

const authReducer = (state: IAuth = {}, action: IAuthType) => {
    switch (action.type) {
        case GLOBALTYPES.AUTH:
            return action.payload;
        default:
            return state;
    }
};

export default authReducer;
