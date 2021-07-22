import { useAppSelector } from "../redux/types/global";
import { Image } from "../redux/types/post";

const Carousel = ({ images, id }: { images: Image[]; id: string }) => {
    const { theme } = useAppSelector((state) => state);

    const isActive = (index: string) => {
        if (index === "0") return "active";
    };

    return (
        <div
            id={`image${id}`}
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
        >
            {images.length > 1 && (
                <div className="carousel-indicators">
                    {images.map((_, index) => (
                        <button
                            type="button"
                            data-bs-target={`#image${id}`}
                            data-bs-slide-to={index}
                            className={isActive(index + "")}
                            aria-current="true"
                            aria-label={`Slide ${index}`}
                        ></button>
                    ))}
                </div>
            )}

            <div className="carousel-inner">
                {images.map((image, index) => (
                    <div
                        className={`carousel-item ${isActive(index + "")}`}
                        key={index}
                        data-bs-interval="0"
                    >
                        <img
                            src={image.url}
                            className="d-block w-100"
                            alt={image.url}
                            style={{
                                filter: theme ? "invert(1)" : "invert(0)"
                            }}
                        />
                    </div>
                ))}
            </div>

            {images.length > 1 && (
                <>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#image${id}`}
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#image${id}`}
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </>
            )}
        </div>
    );
};

export default Carousel;
