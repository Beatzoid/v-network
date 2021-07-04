import { useDispatch } from "react-redux";
import { GLOBALTYPES, useAppSelector } from "../../redux/types/global";

import Loading from "./Loading";
import Toast from "./Toast";

const Alert = () => {
    const { alert } = useAppSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div>
            {alert.loading && <Loading />}

            {alert.error && (
                <Toast
                    msg={{ title: "Error", body: alert.error }}
                    handleShow={() => {
                        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
                    }}
                    bgColor="bg-danger"
                />
            )}

            {alert.success && (
                <Toast
                    msg={{ title: "Success", body: alert.success }}
                    handleShow={() => {
                        dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
                    }}
                    bgColor="bg-success"
                />
            )}
        </div>
    );
};

export default Alert;
