import { GLOBALTYPES } from "../types/global";

const themeReducer = (state = false, action: any) => {
    switch (action.type) {
        case GLOBALTYPES.THEME:
            console.log("Theme Reducer: ", action.payload);
            localStorage.setItem("darkmode", `${action.payload}`);
            return action.payload;
        default:
            return state;
    }
};

export default themeReducer;
