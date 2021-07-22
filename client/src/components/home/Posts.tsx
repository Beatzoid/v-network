import { useAppSelector } from "../../redux/types/global";

import CardBody from "./postCard/CardBody";
import CardFooter from "./postCard/CardFooter";
import CardHeader from "./postCard/CardHeader";

const Posts = () => {
    const { homePosts } = useAppSelector((state) => state);

    return (
        <div className="posts">
            {homePosts.posts.map((post) => (
                <div key={post._id} className="card my-3">
                    <CardHeader post={post} />
                    <CardBody post={post} />
                    <CardFooter post={post} />
                </div>
            ))}
        </div>
    );
};

export default Posts;
