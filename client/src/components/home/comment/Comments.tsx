import { IPost } from "../../../redux/types/post";

interface CommentsProps {
    post: IPost;
}

const Comments = ({ post }: CommentsProps) => {
    return (
        <div>
            <h2>Comments</h2>
        </div>
    );
};

export default Comments;
