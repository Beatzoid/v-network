import { Navigate, Route } from "react-router-dom";

const PrivateRoute = (props: any) => {
    const firstLogin = localStorage.getItem("firstLogin");

    return firstLogin ? <Route {...props} /> : <Navigate to="/" />;
};

export default PrivateRoute;
