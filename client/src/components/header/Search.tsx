import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { IUser } from "../../redux/types/auth";
import { GLOBALTYPES, useAppSelector } from "../../redux/types/global";
import { getDataAPI } from "../../utils/fetchData";
import LoadIcon from "../../images/loading.gif";

import UserCard from "../UserCard";

const Search = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<IUser[]>([]);

    const { auth } = useAppSelector((state) => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    const handleClose = () => {
        setSearch("");
        setUsers([]);
    };

    const handleSearch = async (e: any) => {
        e.preventDefault();
        if (!search) return;

        try {
            setLoad(true);
            const res = await getDataAPI(
                `search?username=${search}`,
                auth.token!
            );
            setUsers(res.data.users);
            setLoad(false);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg }
            });
        }
    };

    return (
        <form className="search_form" onSubmit={handleSearch}>
            <input
                type="text"
                id="search"
                name="search"
                onChange={(e) =>
                    setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
                }
                value={search}
            />

            <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
                <span className="material-icons">search</span>
                <span>Enter to Search</span>
            </div>

            <div
                className="close_search"
                onClick={handleClose}
                style={{ opacity: users.length === 0 ? 0 : 1 }}
            >
                ×
            </div>

            <button type="submit" style={{ display: "none" }}>
                Search
            </button>

            {load && (
                <img className="loading" src={LoadIcon} alt="Loading..." />
            )}

            <div className="users">
                {search &&
                    users.map((user) => (
                        <UserCard
                            key={user._id}
                            user={user}
                            border="border"
                            handleClose={handleClose}
                        />
                    ))}
            </div>
        </form>
    );
};

export default Search;
