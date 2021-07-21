import Avatar from "../../header/Avatar";

import { GLOBALTYPES, useAppSelector } from "../../../redux/types/global";
import { useDispatch } from "react-redux";

const Status = () => {
    const { auth } = useAppSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div className="status my-3 d-flex">
            <Avatar src={auth.user?.avatar!} size="big-avatar" />

            <button
                className="statusBtn flex-fill"
                onClick={() =>
                    dispatch({ type: GLOBALTYPES.STATUS, payload: true })
                }
            >
                {auth.user?.username}, what are you thinking?
            </button>
        </div>
    );
};

export default Status;
