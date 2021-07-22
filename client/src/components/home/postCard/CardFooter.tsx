import { IPost } from "../../../redux/types/post";

interface CardFooterProps {
    post: IPost;
}

const CardFooter = ({ post }: CardFooterProps) => {
    return (
        <div>
            <h2>Card Footer</h2>
        </div>
    );
};

export default CardFooter;
