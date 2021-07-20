import { GLOBALTYPES } from "../types/global";

const themeReducer = (state = false, action: any) => {
    switch (action.type) {
        case GLOBALTYPES.THEME:
            localStorage.setItem("darkmode", JSON.stringify(action.payload));
            return action.payload;
        default:
            return state;
    }
};

export default themeReducer;
