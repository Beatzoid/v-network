import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { IUser } from "../../redux/types/auth";
import { GLOBALTYPES, useAppSelector } from "../../redux/types/global";
import { getProfileUsers } from "../../redux/actions/profileActions";

import Avatar from "../header/Avatar";
import EditProfile from "./EditProfile";
import FollowButton from "../FollowButton";
import Followers from "./Followers";
import Following from "./Following";

const Info = () => {
    const { id } = useParams<{ id: string }>();
    const { auth, profile } = useAppSelector((state) => state);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState<IUser[]>([]);
    const [onEdit, setOnEdit] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    useEffect(() => {
        if (id === auth.user?._id) {
            setUserData([auth.user as IUser]);
        } else {
            // @ts-ignore
            dispatch(getProfileUsers({ users: profile.users, id, auth }));
            const newData = profile.users.filter((user) => user._id === id);
            setUserData(newData);
        }
    }, [id, auth, dispatch, profile.users]);

    useEffect(() => {
        if (showFollowers || showFollowing || onEdit) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true });
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false });
        }
    }, [showFollowers, showFollowing, onEdit, dispatch]);

    return (
        <div className="info">
            {userData.map((user) => (
                <div className="info_container" key={user._id}>
                    <Avatar src={user.avatar} size="huge-avatar" />

                    <div className="info_content">
                        <div className="info_content_title">
                            <h2>{user.username}</h2>
                            {user._id === auth.user?._id ? (
                                <button
                                    className="btn btn-outline-info"
                                    onClick={() => setOnEdit(true)}
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <FollowButton user={user} />
                            )}
                        </div>

                        <div className="follow_btn">
                            <span
                                className="me-4"
                                onClick={() => setShowFollowers(true)}
                            >
                                {user.followers.length} Followers
                            </span>
                            <span
                                className="ms-4"
                                onClick={() => setShowFollowing(true)}
                            >
                                {user.following.length} Following
                            </span>
                        </div>

                        <div className="mb-2">
                            <a
                                href={user.website}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {user.website}
                            </a>
                        </div>
                        <p>{user.story}</p>
                    </div>

                    {onEdit && <EditProfile setOnEdit={setOnEdit} />}

                    {showFollowers && (
                        <Followers
                            users={user.followers}
                            setShowFollowers={setShowFollowers}
                        />
                    )}
                    {showFollowing && (
                        <Following
                            users={user.following}
                            setShowFollowing={setShowFollowing}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Info;
