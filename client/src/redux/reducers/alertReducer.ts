import { GLOBALTYPES } from "../types/global";
import { INotify, INotifyType } from "../types/notify";

const alertReducer = (state: INotify = {}, action: INotifyType) => {
    switch (action.type) {
        case GLOBALTYPES.ALERT:
            return action.payload;
        default:
            return state;
    }
};

export default alertReducer;
