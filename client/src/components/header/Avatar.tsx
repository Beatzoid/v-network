import { useAppSelector } from "../../redux/types/global";

const Avatar = ({
    src,
    size
}: {
    src: string;
    size: "small-avatar" | "medium-avatar" | "big-avatar" | "huge-avatar";
}) => {
    const { theme } = useAppSelector((state) => state);

    return (
        <img
            src={src}
            alt="avatar"
            className={`avatar ${size}`}
            style={{
                filter: `${theme ? "invert(1)" : "invert(0)"}`
            }}
        />
    );
};

export default Avatar;
