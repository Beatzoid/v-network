import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { IUser } from "../../redux/types/auth";
import { GLOBALTYPES, useAppSelector } from "../../redux/types/global";
import { getDataAPI } from "../../utils/fetchData";

import UserCard from "../UserCard";

const Search = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<IUser[]>([]);

    const { auth } = useAppSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (search) {
            getDataAPI(`search?username=${search}`, auth.token!)
                .then((res) => setUsers(res.data.users))
                .catch((err) => {
                    dispatch({
                        type: GLOBALTYPES.ALERT,
                        payload: { error: err.response.data.msg }
                    });
                });
        } else {
            setUsers([]);
        }
    }, [search, auth.token, dispatch]);

    const handleClose = () => {
        setSearch("");
        setUsers([]);
    };

    return (
        <form className="search_form">
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
                <span>Search</span>
            </div>

            <div
                className="close_search"
                onClick={handleClose}
                style={{ opacity: users.length === 0 ? 0 : 1 }}
            >
                ×
            </div>

            <div className="users">
                {search &&
                    users.map((user) => (
                        <Link
                            key={user._id}
                            to={`/profile/${user._id}`}
                            onClick={handleClose}
                        >
                            <UserCard user={user} border="border" />
                        </Link>
                    ))}
            </div>
        </form>
    );
};

export default Search;
