import { IAuth } from "../../../redux/types/auth";
import { IComment, IPost } from "../../../redux/types/post";

interface CommentMenuProps {
    post: IPost;
    comment: IComment;
    auth: IAuth;
}

const CommentMenu = ({ post, comment, auth }: CommentMenuProps) => {
    const MenuItem = () => {
        return (
            <>
                <div className="dropdown-item">
                    <span className="material-icons">create</span> Edit
                </div>
                <div className="dropdown-item">
                    <span className="material-icons">delete_outline</span>{" "}
                    Delete
                </div>
            </>
        );
    };

    return (
        <div className="menu">
            {(post.user._id === auth.user?._id ||
                comment.user._id === auth.user?._id) && (
                <div className="nav-item dropdown">
                    <span
                        className="material-icons"
                        id="moreLink"
                        data-bs-toggle="dropdown"
                    >
                        more_vert
                    </span>

                    <div className="dropdown-menu" aria-labelledby="moreLink">
                        {post.user._id === auth.user?._id ? (
                            comment.user._id === auth.user?._id ? (
                                MenuItem()
                            ) : (
                                <div className="dropdown-item">
                                    <span className="material-icons">
                                        delete_outline
                                    </span>{" "}
                                    Delete
                                </div>
                            )
                        ) : (
                            comment.user._id === auth.user._id && MenuItem()
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentMenu;
