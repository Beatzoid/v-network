import { GLOBALTYPES } from "../types/global";
import { IAlert, IAlertType } from "../types/alert";

const alertReducer = (state: IAlert = {}, action: IAlertType) => {
    switch (action.type) {
        case GLOBALTYPES.ALERT:
            return action.payload;
        default:
            return state;
    }
};

export default alertReducer;
