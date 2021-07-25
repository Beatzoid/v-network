import { useAppSelector } from "../../redux/types/global";
import PostCard from "../PostCard";

const Posts = () => {
    const { homePosts } = useAppSelector((state) => state);

    return (
        <div className="posts">
            {homePosts.posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}
        </div>
    );
};

export default Posts;
