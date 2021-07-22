import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IPost } from "../../../redux/types/post";
import { likePost, unlikePost } from "../../../redux/actions/postActions";
import { useAppSelector } from "../../../redux/types/global";

import LikeButton from "../../LikeButton";

import Send from "../../../images/send.svg";

interface CardFooterProps {
    post: IPost;
}

const CardFooter = ({ post }: CardFooterProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [loadingLike, setLoadingLike] = useState(false);

    const { auth } = useAppSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (post.likes.find((like) => (like as any) === auth.user?._id))
            setIsLiked(true);
    }, [auth.user?._id, post]);

    const handleLike = async () => {
        if (loadingLike) return;

        setIsLiked(true);
        setLoadingLike(true);
        await dispatch(likePost({ post, auth }));
        setLoadingLike(false);
    };

    const handleUnlike = async () => {
        if (loadingLike) return;

        setIsLiked(false);

        setLoadingLike(true);
        await dispatch(unlikePost({ post, auth }));
        setLoadingLike(false);
    };

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    {loadingLike ? (
                        <FontAwesomeIcon
                            icon={["fas", "sync"]}
                            className="fa-spin"
                        />
                    ) : (
                        <LikeButton
                            isLiked={isLiked}
                            handleLike={handleLike}
                            handleUnlike={handleUnlike}
                        />
                    )}

                    <Link to={`/post/${post._id}`} className="text-dark">
                        <FontAwesomeIcon icon={["far", "comment"]} />
                    </Link>

                    <img src={Send} alt="Send" />
                </div>

                <FontAwesomeIcon icon={["far", "bookmark"]} />
            </div>

            <div className="d-flex justify-content-between">
                <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
                    {post.likes.length > 1 || post.likes.length === 0
                        ? `${post.likes.length} likes`
                        : `${post.likes.length} like`}
                </h6>
                <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
                    {post.comments.length} comments
                </h6>
            </div>
        </div>
    );
};

export default CardFooter;
