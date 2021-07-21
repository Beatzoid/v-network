import { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { createPost } from "../../../redux/actions/postActions";
import { GLOBALTYPES, useAppSelector } from "../../../redux/types/global";

const StatusModal = () => {
    const { auth, theme } = useAppSelector((state) => state);
    const dispatch = useDispatch();

    const [content, setContent] = useState("");
    const [images, setImages] = useState<any[]>([]);

    const [stream, setStream] = useState(false);
    const videoRef = useRef<any>();
    const canvasRef = useRef<any>();
    const [tracks, setTracks] = useState<MediaStreamTrack>();

    const handleChangeImages = (e: any) => {
        const files = [...e.target.files!];
        console.log(files);
        let err = "";
        let newImages: any[] = [];

        files.forEach((file) => {
            if (!file) return (err = "Please select a file");

            if (!file.type.includes("image"))
                return (err = "Please select a valid image");

            return newImages.push(file);
        });

        if (err)
            dispatch({ types: GLOBALTYPES.ALERT, payload: { error: err } });

        setImages([...images, ...newImages]);
    };

    const deleteImages = (index: number) => {
        const newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr);
    };

    const handleStream = () => {
        setStream(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((mediaStream) => {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();

                    const tracks = mediaStream.getTracks();
                    setTracks(tracks[0]);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleStopStream = () => {
        tracks?.stop();
        setStream(false);
    };

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        canvasRef.current.setAttribute("width", width);
        canvasRef.current.setAttribute("height", height);

        const ctx = canvasRef.current.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        let URL = canvasRef.current.toDataURL();
        setImages([...images, { camera: URL }]);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (images.length === 0)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Please add at least one photo" }
            });

        dispatch(createPost({ content, images, auth }));

        setContent("");
        setImages([]);
        if (tracks) tracks.stop();
        dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    };

    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">Create Post</h5>
                    <span
                        onClick={() =>
                            dispatch({
                                type: GLOBALTYPES.STATUS,
                                payload: false
                            })
                        }
                    >
                        &times;
                    </span>
                </div>

                <div className="status_body">
                    <textarea
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`${auth.user?.username}, what are you thinking?`}
                    />

                    <div className="show_images">
                        {images.map((image, index) => (
                            <div key={index} id="file_img">
                                <img
                                    src={
                                        image.camera
                                            ? image.camera
                                            : URL.createObjectURL(image)
                                    }
                                    alt="images"
                                    className="img-thumbnail"
                                    style={{
                                        filter: theme
                                            ? "invert(1)"
                                            : "invert(0)"
                                    }}
                                />
                                <span onClick={() => deleteImages(index)}>
                                    &times;
                                </span>
                            </div>
                        ))}
                    </div>

                    {stream && (
                        <div className="stream position-relative">
                            <video
                                autoPlay
                                muted
                                ref={videoRef}
                                width="100%"
                                height="100%"
                                style={{
                                    filter: theme ? "invert(1)" : "invert(0)"
                                }}
                            />

                            <span onClick={handleStopStream}>&times;</span>
                            <canvas
                                ref={canvasRef}
                                style={{ display: "none" }}
                            />
                        </div>
                    )}

                    <div className="input_images">
                        {stream ? (
                            <div onClick={handleCapture}>
                                <i className="fas fa-camera" />
                            </div>
                        ) : (
                            <>
                                <div onClick={handleStream}>
                                    <i className="fas fa-camera" />
                                </div>
                                <div className="file_upload">
                                    <i className="fas fa-image" />
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleChangeImages}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="status_footer">
                    <button className="btn btn-info w-100" type="submit">
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StatusModal;
