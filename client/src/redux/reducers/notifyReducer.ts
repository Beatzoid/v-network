import { INotify, INotifyType } from "../types";

const notifiyReducer = (state: INotify = {}, action: INotifyType) => {
    switch (action.type) {
        case "NOTIFY":
            return action.payload;
        default:
            return state;
    }
};

export default notifiyReducer;
