import { combineReducers } from "redux";

import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import themeReducer from "./themeReducer";

export default combineReducers({
    auth: authReducer,
    alert: alertReducer,
    theme: themeReducer
});
