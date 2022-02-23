import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import PageRenderer from "./router/PageRenderer";
import PrivateRoute from "./router/PrivateRoute";

import Login from "./pages/login";
import Home from "./pages/home";
import Register from "./pages/register";

import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/home/status/StatusModal";

import { GLOBALTYPES, useAppSelector } from "./redux/types/global";
import { refreshToken } from "./redux/actions/authActions";
import { getPosts } from "./redux/actions/postActions";

function App() {
    const { auth, status, modal } = useAppSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshToken());

        const darkMode = JSON.parse(localStorage.getItem("darkmode")!);
        if (darkMode) document.getElementById("theme")?.click();

        dispatch({
            type: GLOBALTYPES.THEME,
            payload: darkMode
        });

        if (auth.token) dispatch(getPosts(auth.token));
    }, [dispatch, auth.token]);

    return (
        <Router>
            <Alert />

            <input type="checkbox" id="theme" />
            <div className={`App ${(status || modal) && "mode"}`}>
                <div className="main">
                    {auth.token && <Header />}
                    {status && <StatusModal />}

                    <Route path="/" element={auth.token ? Home : Login} />
                    <Route path="/register" element={Register} />

                    <PrivateRoute
                        exact
                        path="/:page/:id"
                        component={PageRenderer}
                    />
                    <PrivateRoute
                        exact
                        path="/:page"
                        component={PageRenderer}
                    />
                </div>
            </div>
        </Router>
    );
}

export default App;
