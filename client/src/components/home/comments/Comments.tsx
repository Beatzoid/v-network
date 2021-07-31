import { useEffect, useState } from "react";
import { IComment, IPost } from "../../../redux/types/post";
import CommentDisplay from "./CommentDisplay";

interface CommentsProps {
    post: IPost;
}

const Comments = ({ post }: CommentsProps) => {
    const [comments, setComments] = useState<IComment[]>([]);
    const [showComments, setShowComments] = useState<IComment[]>([]);

    const [next, setNext] = useState(2);

    useEffect(() => {
        const newComment = post.comments.filter((cm) => !cm.reply);
        setComments(newComment);
        setShowComments(
            newComment
                .slice(newComment.length - next)
                // Sort by newest first and oldest last
                .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        );
    }, [post.comments, next]);

    return (
        <div className="comments">
            {showComments.map((comment) => (
                <CommentDisplay
                    key={comment._id}
                    comment={comment}
                    post={post}
                />
            ))}

            {comments.length - next > 0 ? (
                <div
                    className="p-2 border-top"
                    style={{ cursor: "pointer", color: "crimson" }}
                    onClick={() => setNext(next + 10)}
                >
                    See more comments...
                </div>
            ) : (
                comments.length > 2 && (
                    <div
                        className="p-2 border-top"
                        style={{ cursor: "pointer", color: "crimson" }}
                        onClick={() => setNext(2)}
                    >
                        Hide comments
                    </div>
                )
            )}
        </div>
    );
};

export default Comments;
