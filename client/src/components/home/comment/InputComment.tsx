import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { createComment } from "../../../redux/actions/commentActions";
import { useAppSelector } from "../../../redux/types/global";
import { IPost } from "../../../redux/types/post";

interface InputCommentProps {
    post: IPost;
    children?: any;
}

const InputComment = ({ post, children }: InputCommentProps) => {
    const { auth } = useAppSelector((state) => state);
    const dispatch = useDispatch();

    const [content, setContent] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!content.trim()) return;
        setContent("");

        const newComment = {
            content,
            likes: [],
            user: auth.user!,
            createdAt: new Date().toISOString()
        };

        dispatch(createComment(post, newComment, auth));
    };

    return (
        <form className="card-footer comment_input" onSubmit={handleSubmit}>
            {children}
            <input
                type="text"
                placeholder="Add your comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button type="submit" className="postBtn">
                Post
            </button>
        </form>
    );
};

export default InputComment;
