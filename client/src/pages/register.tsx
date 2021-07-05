import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { register } from "../redux/actions/authActions";
import { useAppSelector } from "../redux/types/global";

const Register = () => {
    const { auth, alert } = useAppSelector((state) => state);
    const history = useHistory();
    const dispatch = useDispatch();

    const initialState = {
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        gender: "male"
    };
    const [userData, setUserData] = useState(initialState);
    const { fullname, username, email, password, confirmpassword } = userData;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (auth.token) history.push("/");
    }, [auth.token, history]);

    const handleChangeInput = (e: any) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(register(userData));
    };

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="mb-4 text-uppercase text-center">
                    MERN Social Media
                </h3>

                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">
                        Full Name
                    </label>
                    <input
                        name="fullname"
                        type="text"
                        className="form-control"
                        id="fullname"
                        onChange={handleChangeInput}
                        value={fullname}
                        style={{
                            background: `${alert.fullname ? "#fd2d6a14" : ""}`
                        }}
                    />

                    <div id="emailHelp" className="form-text text-danger">
                        {alert.fullname}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        name="username"
                        type="text"
                        className="form-control"
                        id="username"
                        onChange={handleChangeInput}
                        value={username.toLowerCase().replace(/ /g, "")}
                        style={{
                            background: `${alert.username ? "#fd2d6a14" : ""}`
                        }}
                    />

                    <div id="emailHelp" className="form-text text-danger">
                        {alert.username}
                    </div>
                </div>

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
                        style={{
                            background: `${alert.email ? "#fd2d6a14" : ""}`
                        }}
                    />

                    <div
                        id="emailHelp"
                        className={`form-text ${alert.email && "text-danger"}`}
                    >
                        {alert.email
                            ? alert.email
                            : "We'll never share your email with anyone else"}
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
                            style={{
                                background: `${
                                    alert.password ? "#fd2d6a14" : ""
                                }`
                            }}
                        />
                        <small onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </small>

                        <div id="emailHelp" className="form-text text-danger">
                            {alert.password}
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">
                        Confirm Password
                    </label>

                    <div className="pass">
                        <input
                            name="confirmpassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control"
                            id="confirmpassword"
                            onChange={handleChangeInput}
                            value={confirmpassword}
                            style={{
                                background: `${
                                    alert.confirmpassword ? "#fd2d6a14" : ""
                                }`
                            }}
                        />
                        <small
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </small>

                        <div id="emailHelp" className="form-text text-danger">
                            {alert.confirmpassword}
                        </div>
                    </div>
                </div>

                <div className="row row-cols-3 justify-content-between mx-0 mb-3">
                    <label htmlFor="male">
                        Male:{" "}
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            defaultChecked
                            onChange={handleChangeInput}
                        />
                    </label>

                    <label htmlFor="female">
                        Female:{" "}
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            onChange={handleChangeInput}
                        />
                    </label>

                    <label htmlFor="other">
                        Other:{" "}
                        <input
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            onChange={handleChangeInput}
                        />
                    </label>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                    Register
                </button>

                <p className="my-3">
                    Already have an account? Login{" "}
                    <Link to="/">here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
