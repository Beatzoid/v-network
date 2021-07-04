import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import PageRenderer from "./PageRenderer";
import Login from "./pages/login";
import Home from "./pages/home";

import Alert from "./components/alert/Alert";

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
                    <Route
                        exact
                        path="/"
                        component={auth.token ? Home : Login}
                    />
                    <Route path="/:page" component={PageRenderer} />
                    <Route path="/:page/:id" component={PageRenderer} />
                </div>
            </div>
        </Router>
    );
}

export default App;
