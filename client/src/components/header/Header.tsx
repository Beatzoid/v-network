import { Link } from "react-router-dom";

import Menu from "./Menu";
import Search from "./Search";

const Header = () => {
    return (
        <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
                <div className="container-fluid">
                    <Link
                        style={{ textDecoration: "none" }}
                        to="/"
                        className="logo"
                    >
                        <h1 className="navbar-brand text-uppercase p-0 m-0">
                            V-Network
                        </h1>
                    </Link>

                    <Search />

                    <Menu />
                </div>
            </nav>
        </div>
    );
};

export default Header;
