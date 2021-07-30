import { IPost } from "../../../redux/types/post";
import CommentDisplay from "./CommentDisplay";

interface CommentsProps {
    post: IPost;
}

const Comments = ({ post }: CommentsProps) => {
    return (
        <div className="comments">
            {post.comments.map((comment) => (
                <CommentDisplay
                    key={comment._id}
                    comment={comment}
                    post={post}
                />
            ))}
        </div>
    );
};

export default Comments;
