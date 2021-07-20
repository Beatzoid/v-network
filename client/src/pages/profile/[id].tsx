import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import { useAppSelector } from "../../redux/types/global";
import LoadIcon from "../../images/loading.gif";

const Profile = () => {
    const { profile } = useAppSelector((state) => state);

    return (
        <div className="profile">
            {profile.loading ? (
                <img
                    className="d-block mx-auto my-4"
                    src={LoadIcon}
                    alt="Loading"
                />
            ) : (
                <Info />
            )}
            <Posts />
        </div>
    );
};

export default Profile;
