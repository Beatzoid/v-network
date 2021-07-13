import { Link } from "react-router-dom";

import { IUser } from "../redux/types/auth";
import Avatar from "./header/Avatar";

interface UserCardProps {
    user: IUser;
    border: string;
    handleClose?: () => void;
}

const UserCard = ({ user, border, handleClose }: UserCardProps) => {
    return (
        <div className={`d-flex p-2 align-items-center ${border}`}>
            <div>
                <Link
                    to={`/profile/${user._id}`}
                    onClick={handleClose}
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
        </div>
    );
};

export default UserCard;
