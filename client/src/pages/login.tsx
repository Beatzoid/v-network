import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../redux/actions/authActions";
import { useAppSelector } from "../redux/types/global";

const Login = () => {
    const { auth } = useAppSelector((state) => state);
    const initialState = { email: "", password: "" };
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;
    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.token) history.push("/");
    }, [auth.token, history]);

    const handleChangeInput = (e: any) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(login(userData));
    };

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="mb-4 text-uppercase text-center">V-Network</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        onChange={handleChangeInput}
                        value={email}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>

                    <div className="pass">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            onChange={handleChangeInput}
                            value={password}
                        />
                        <small onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </small>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-dark w-100"
                    disabled={email && password ? false : true}
                >
                    Login
                </button>

                <p className="my-3">
                    Don't have an account? Signup{" "}
                    <Link to="/register">here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
