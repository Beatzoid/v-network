import { useAppSelector } from "../redux/types/global";

const Avatar = ({ src }: { src: string }) => {
    const { theme } = useAppSelector((state) => state);

    return (
        <img
            src={src}
            alt="avatar"
            className="avatar"
            style={{
                filter: `${theme ? "invert(1)" : "invert(0)"}`
            }}
        />
    );
};

export default Avatar;
