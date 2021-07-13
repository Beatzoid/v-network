import { IUser } from "../redux/types/auth";
import Avatar from "./header/Avatar";

const UserCard = ({ user, border }: { user: IUser; border: string }) => {
    return (
        <div className={`d-flex p-2 align-items-center ${border}`}>
            <Avatar src={user.avatar} size="big-avatar" />
            <div className="ms-2" style={{ transform: "translateY(-2px)" }}>
                <span className="d-block">{user.username}</span>
                <small style={{ opacity: 0.7 }}>{user.fullname}</small>
            </div>
        </div>
    );
};

export default UserCard;
