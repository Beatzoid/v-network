import { useState } from "react";

import Carousel from "../../Carousel";

import { IPost } from "../../../redux/types/post";

interface CardBodyProps {
    post: IPost;
}

const CardBody = ({ post }: CardBodyProps) => {
    const [readMore, setReadMore] = useState(false);

    return (
        <div className="card_body">
            <div className="card_body-content">
                <span>
                    {post.content.length < 60
                        ? post.content
                        : readMore
                        ? post.content + " "
                        : post.content.slice(0, 60) + "....."}
                </span>
                {post.content.length > 60 && (
                    <span
                        className="readMore"
                        onClick={() => setReadMore(!readMore)}
                    >
                        {readMore ? "Hide Content" : "Read more"}
                    </span>
                )}
            </div>

            {post.images.length > 0 && (
                <Carousel images={post.images} id={post._id} />
            )}
        </div>
    );
};

export default CardBody;
