import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../redux/actions/authActions";

const Login = () => {
    const initialState = { email: "", password: "" };
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

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
                <h3 className="mb-4 text-uppercase text-center">
                    MERN Social Media
                </h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={handleChangeInput}
                        value={email}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Password
                    </label>

                    <div className="pass">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="exampleInputPassword1"
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
                    disabled={!(email && password)}
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
