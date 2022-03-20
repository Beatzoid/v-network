import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const firstLogin = localStorage.getItem("firstLogin");

    return firstLogin ? (
        children
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default PrivateRoute;
