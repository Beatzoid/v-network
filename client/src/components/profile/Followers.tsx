import { Dispatch } from "react";

import { IUser } from "../../redux/types/auth";
import { useAppSelector } from "../../redux/types/global";
import FollowButton from "../FollowButton";
import UserCard from "../UserCard";

interface FollowersProps {
    users: IUser[];
    setShowFollowers: Dispatch<React.SetStateAction<boolean>>;
}

const Followers = ({ users, setShowFollowers }: FollowersProps) => {
    const { auth } = useAppSelector((state) => state);

    return (
        <div className="follow">
            <div className="follow_box">
                <h5 className="text-center">Followers</h5>
                <hr />

                {users.map((user) => (
                    <UserCard
                        user={user}
                        key={user._id}
                        setShowFollowers={setShowFollowers}
                    >
                        {auth.user?._id !== user._id && (
                            <FollowButton user={user} />
                        )}
                    </UserCard>
                ))}

                <div className="close" onClick={() => setShowFollowers(false)}>
                    &times;
                </div>
            </div>
        </div>
    );
};

export default Followers;
