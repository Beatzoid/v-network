import { Dispatch } from "react";
import { Link } from "react-router-dom";

import { IUser } from "../redux/types/auth";
import Avatar from "./header/Avatar";

interface UserCardProps {
    user: IUser;
    border?: string;
    handleClose?: () => void;
    setShowFollowers?: Dispatch<React.SetStateAction<boolean>>;
    setShowFollowing?: Dispatch<React.SetStateAction<boolean>>;
    children?: any;
}

const UserCard = ({
    user,
    border,
    handleClose,
    children,
    setShowFollowers,
    setShowFollowing
}: UserCardProps) => {
    const handleCloseAll = () => {
        if (handleClose) handleClose();
        if (setShowFollowers) setShowFollowers(false);
        if (setShowFollowing) setShowFollowing(false);
    };

    return (
        <div
            className={`d-flex p-2 align-items-center justify-content-between ${border}`}
        >
            <div>
                <Link
                    to={`/profile/${user._id}`}
                    onClick={handleCloseAll}
                    className="d-flex align-items-center"
                >
                    <Avatar src={user.avatar} size="big-avatar" />

                    <div
                        className="ms-2"
                        style={{ transform: "translateY(-2px)" }}
                    >
                        <span className="d-block">{user.username}</span>
                        <small style={{ opacity: 0.7 }}>{user.fullname}</small>
                    </div>
                </Link>
            </div>

            {children}
        </div>
    );
};

export default UserCard;
