import { Dispatch } from "react";

import { IUser } from "../../redux/types/auth";
import { useAppSelector } from "../../redux/types/global";
import FollowButton from "../FollowButton";
import UserCard from "../UserCard";

interface FollowersProps {
    users: IUser[];
    setShowFollowing: Dispatch<React.SetStateAction<boolean>>;
}

const Following = ({ users, setShowFollowing }: FollowersProps) => {
    const { auth } = useAppSelector((state) => state);

    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center">Following</h5>
                <hr />

                {users.map((user) => (
                    <UserCard
                        user={user}
                        key={user._id}
                        setShowFollowing={setShowFollowing}
                    >
                        {auth.user?._id !== user._id && (
                            <FollowButton user={user} />
                        )}
                    </UserCard>
                ))}

                <div className="close" onClick={() => setShowFollowing(false)}>
                    &times;
                </div>
            </div>
        </div>
    );
};

export default Following;
