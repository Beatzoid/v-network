import { IComment, IPost } from "../../../redux/types/post";
import CommentCard from "./CommentCard";

interface CommentDisplayProps {
    comment: IComment;
    post: IPost;
}

const CommentDisplay = ({ comment, post }: CommentDisplayProps) => {
    return (
        <div className="comment_display">
            <CommentCard comment={comment} post={post}></CommentCard>
        </div>
    );
};

export default CommentDisplay;
