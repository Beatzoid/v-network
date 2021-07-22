import { IPost } from "../../../redux/types/post";

interface CardBodyProps {
    post: IPost;
}

const CardBody = ({ post }: CardBodyProps) => {
    return (
        <div>
            <h2>Card Body</h2>
        </div>
    );
};

export default CardBody;
