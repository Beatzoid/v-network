import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { follow, unfollow } from "../redux/actions/profileActions";
import { IUser } from "../redux/types/auth";
import { useAppSelector } from "../redux/types/global";

interface FollowButtonProps {
    user: IUser;
}

const FollowButton = ({ user }: FollowButtonProps) => {
    const [followed, setFollowed] = useState(false);
    const [load, setLoad] = useState(false);

    const dispatch = useDispatch();
    const { auth, profile } = useAppSelector((state) => state);

    useEffect(() => {
        if (auth.user?.following.find((item) => item._id === user._id)) {
            setFollowed(true);
        }
    }, [auth.user?.following, user._id]);

    const handleFollow = async () => {
        if (load) return;

        setFollowed(true);
        setLoad(true);
        await dispatch(follow({ users: profile.users, user, auth }));
        setLoad(false);
    };

    const handleUnfollow = async () => {
        if (load) return;

        setFollowed(false);
        setLoad(true);
        await dispatch(unfollow({ users: profile.users, user, auth }));
        setLoad(false);
    };

    return (
        <>
            {followed ? (
                <button
                    className="btn btn-outline-danger"
                    onClick={handleUnfollow}
                >
                    Unfollow
                </button>
            ) : (
                <button className="btn btn-outline-info" onClick={handleFollow}>
                    Follow
                </button>
            )}
        </>
    );
};

export default FollowButton;
