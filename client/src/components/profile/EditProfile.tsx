import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useEffect,
    useState
} from "react";

import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IUser } from "../../redux/types/auth";
import { GLOBALTYPES, useAppSelector } from "../../redux/types/global";
import { updateUserProfile } from "../../redux/actions/profileActions";

import { checkImage } from "../../utils/imageUpload";

interface EditProfileProps {
    setOnEdit: Dispatch<SetStateAction<boolean>>;
}

const EditProfile = ({ setOnEdit }: EditProfileProps) => {
    const { auth, theme } = useAppSelector((state) => state);
    const dispatch = useDispatch();

    const initialState = {
        fullname: "",
        website: "",
        story: "",
        gender: ""
    };
    const [userData, setUserData] = useState<typeof initialState | IUser>(
        initialState
    );
    const { fullname, website, story, gender } = userData;

    const [avatar, setAvatar] = useState<string | File>("");

    const changeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0];

        const error = checkImage(file);
        if (error)
            return dispatch({ type: GLOBALTYPES.ALERT, payload: { error } });

        setAvatar(file);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUserProfile({ userData, avatar, auth }));
    };

    useEffect(() => {
        setUserData(auth.user!);
    }, [auth.user]);

    return (
        <div className="edit_profile">
            <button
                className="btn btn-danger btn_close"
                onClick={() => setOnEdit(false)}
            >
                Close
            </button>

            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img
                        src={
                            avatar
                                ? URL.createObjectURL(avatar as File)
                                : auth.user?.avatar
                        }
                        style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                        alt="Avatar"
                    />
                    <span>
                        <FontAwesomeIcon icon={["fas", "camera"]} />
                        <p>Change</p>
                        <input
                            type="file"
                            name="file"
                            id="file_up"
                            accept="image/*"
                            onChange={changeAvatar}
                        />
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative">
                        <input
                            type="text"
                            maxLength={25}
                            className="form-control"
                            name="fullname"
                            id="fullname"
                            value={fullname}
                            onChange={handleInputChange}
                        />
                        <small
                            className="text-danger position-absolute"
                            style={{
                                top: "50%",
                                right: "5px",
                                transform: "translateY(-50%)"
                            }}
                        >
                            {fullname.length}/25
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <input
                            type="text"
                            name="website"
                            value={website}
                            className="form-control"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="story">Story</label>
                        <textarea
                            name="story"
                            maxLength={200}
                            cols={30}
                            rows={4}
                            style={{ resize: "none" }}
                            value={story}
                            className="form-control"
                            onChange={handleInputChange}
                        />

                        <small className="text-danger d-block text-end">
                            {story.length}/200
                        </small>
                    </div>

                    <label htmlFor="gender">Gender</label>
                    <div className="input-group-prepend px-0 mb-4">
                        <select
                            name="gender"
                            id="gender"
                            value={gender}
                            className="custom-select text-captialize"
                            onChange={handleInputChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <button className="btn btn-info w-100" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
