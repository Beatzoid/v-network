import Posts from "../components/home/Posts";
import Status from "../components/home/status/Status";

import { useAppSelector } from "../redux/types/global";

import LoadIcon from "../images/loading.gif";

const Home = () => {
    const { homePosts } = useAppSelector((state) => state);

    return (
        <div className="home row mx-0">
            <div className="col-md-8">
                <Status />

                {homePosts.loading ? (
                    <img
                        src={LoadIcon}
                        alt="loading..."
                        className="d-block mx-auto"
                    />
                ) : homePosts.result === 0 ? (
                    <h2>
                        No posts, go follow someone to see their posts here!
                    </h2>
                ) : (
                    <Posts />
                )}

                <Posts />
            </div>
            <div className="col-md-4"></div>
        </div>
    );
};

export default Home;
