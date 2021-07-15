import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { IAuth, IUser } from "../../redux/types/auth";
import { useAppSelector } from "../../redux/types/global";
import { getProfileUsers } from "../../redux/actions/profileActions";

import Avatar from "../header/Avatar";
import { IProfile } from "../../redux/types/profile";

const Info = () => {
    const { id } = useParams<{ id: string }>();
    const { auth, profile }: { auth: IAuth; profile: IProfile } =
        useAppSelector((state) => state);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState<IUser[]>([]);

    useEffect(() => {
        if (id === auth.user?._id) {
            setUserData([auth.user]);
        } else {
            dispatch(getProfileUsers({ users: profile.users, id, auth }));
            const newData = profile.users.filter((user) => user._id === id);
            setUserData(newData);
        }
    }, [id, auth, dispatch, profile.users]);

    return (
        <div className="info">
            {userData.map((user) => (
                <div className="info_container" key={user._id}>
                    <Avatar src={user.avatar} size="huge-avatar" />

                    <div className="info_content">
                        <div className="info_content_title">
                            <h2>{user.username}</h2>
                            <button className="btn btn-outline-info">
                                Edit Profile
                            </button>
                        </div>

                        <div className="follow_btn">
                            <span className="me-4">
                                {user.followers.length} Followers
                            </span>
                            <span className="ms-4">
                                {user.following.length} Following
                            </span>
                        </div>

                        <h6>
                            {user.fullname} {user.mobile}
                        </h6>
                        <p className="m-0">{user.address}</p>
                        <h6>{user.email}</h6>
                        <a href={user.website} target="_blank" rel="noreferrer">
                            {user.website}
                        </a>
                        <p>{user.story}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Info;
