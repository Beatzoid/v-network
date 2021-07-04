import { INotify, INotifyType } from "../types/notify";

const notifiyReducer = (state: INotify = {}, action: INotifyType) => {
    switch (action.type) {
        case "NOTIFY":
            return action.payload;
        default:
            return state;
    }
};

export default notifiyReducer;
