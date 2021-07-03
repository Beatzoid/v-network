import { combineReducers } from "redux";

import authReducer from "./authReducer";
import notifiyReducer from "./notifyReducer";

export default combineReducers({
    auth: authReducer,
    notify: notifiyReducer
});
