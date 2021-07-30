import { IPost } from "../redux/types/post";
import Comments from "./home/comments/Comments";
import InputComment from "./home/comments/InputComment";

import CardBody from "./home/postCard/CardBody";
import CardFooter from "./home/postCard/CardFooter";
import CardHeader from "./home/postCard/CardHeader";

interface PostCardProps {
    post: IPost;
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <div>
            <div className="card my-3">
                <CardHeader post={post} />
                <CardBody post={post} />
                <CardFooter post={post} />

                <Comments post={post} />
                <InputComment post={post} />
            </div>
        </div>
    );
};

export default PostCard;
