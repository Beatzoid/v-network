import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../redux/types/global";

interface LikeButtonProps {
    isLiked: boolean;
    handleLike: () => void;
    handleUnlike: () => void;
}

const LikeButton = ({ isLiked, handleLike, handleUnlike }: LikeButtonProps) => {
    const { theme } = useAppSelector((state) => state);

    return (
        <>
            {isLiked ? (
                <FontAwesomeIcon
                    onClick={handleUnlike}
                    className="text-danger"
                    icon={["fas", "heart"]}
                    style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
            ) : (
                <FontAwesomeIcon onClick={handleLike} icon={["far", "heart"]} />
            )}
        </>
    );
};

export default LikeButton;
