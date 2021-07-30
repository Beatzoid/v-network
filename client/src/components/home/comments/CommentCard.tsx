import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IComment, IPost } from "../../../redux/types/post";
import { useAppSelector } from "../../../redux/types/global";

import Avatar from "../../header/Avatar";
import LikeButton from "../../LikeButton";
import CommentMenu from "./CommentMenu";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface CommentCardProps {
    comment: IComment;
    post: IPost;
}

const CommentCard = ({ comment, post }: CommentCardProps) => {
    const [content, setContent] = useState("");
    const [readMore, setReadMore] = useState(false);

    const { auth } = useAppSelector((state) => state);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setContent(comment.content);
    }, [comment]);

    const handleLike = () => {};

    const handleUnlike = () => {};

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? "inherit" : "none"
    } as const;

    return (
        <div className="comment_card mt-3" style={styleCard}>
            <Link
                to={`/profile/${comment.user._id}`}
                className="d-flex text-dark"
                style={{ textDecoration: "none" }}
            >
                <Avatar src={comment.user.avatar} size="small-avatar" />
                <h6 className="mx-1">{comment.user.username}</h6>
            </Link>

            <div className="comment_content">
                <div className="flex-fill">
                    <div>
                        <span>
                            {content.length < 100
                                ? content
                                : readMore
                                ? content + " "
                                : content.slice(0, 100) + "...."}
                        </span>
                        {content.length > 100 && (
                            <span
                                className="readMore"
                                onClick={() => setReadMore(!readMore)}
                            >
                                {readMore ? "Hide Content" : "Read More"}
                            </span>
                        )}
                    </div>

                    <div style={{ cursor: "pointer" }}>
                        <small className="text-muted me-3">
                            {dayjs(comment.createdAt).fromNow()}
                        </small>

                        <small className="fw-bold me-3">
                            {comment.likes.length}
                            {comment.likes.length > 1 ||
                            comment.likes.length === 0
                                ? " likes"
                                : " like"}
                        </small>

                        <small className="fw-bold me-3">Reply</small>
                    </div>
                </div>

                <div
                    className="d-flex align-items-center mx-2"
                    style={{ cursor: "pointer" }}
                >
                    <CommentMenu post={post} comment={comment} auth={auth} />
                    <LikeButton
                        isLiked={isLiked}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike}
                    />
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
