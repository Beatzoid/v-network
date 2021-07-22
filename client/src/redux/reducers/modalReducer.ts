import { GLOBALTYPES } from "../types/global";

const modalReducer = (state = false, action: any) => {
    switch (action.type) {
        case GLOBALTYPES.MODAL:
            return action.payload;
        default:
            return state;
    }
};

export default modalReducer;
