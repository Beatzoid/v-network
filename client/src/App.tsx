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

import { useAppSelector } from "./redux/types/global";
import { refreshToken } from "./redux/actions/authActions";

function App() {
    const { auth } = useAppSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshToken());
    }, [dispatch]);

    return (
        <Router>
            <Alert />

            <input type="checkbox" id="theme" />
            <div className="App">
                <div className="main">
                    {auth.token && <Header />}
                    <Route
                        exact
                        path="/"
                        component={auth.token ? Home : Login}
                    />
                    <Route exact path="/register" component={Register} />

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
