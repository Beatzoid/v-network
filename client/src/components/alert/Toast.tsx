interface ToastProps {
    msg: { title: string; body: string };
    handleShow: () => any;
    bgColor: string;
}

const Toast = ({ msg, handleShow, bgColor }: ToastProps) => {
    return (
        <div
            className={`toast show position-fixed text-light ${bgColor}`}
            style={{
                top: "5px",
                right: "5px",
                minWidth: "200px",
                zIndex: 50,
                overflow: "auto"
            }}
        >
            <div className={`toast-header text-light ${bgColor}`}>
                <strong className="mr-auto text-light">{msg.title}</strong>
                <button
                    className="btn-close text-light"
                    data-bs-dismiss="toast"
                    onClick={handleShow}
                    style={{
                        outline: "none",
                        marginLeft: "auto",
                        marginRight: "1px"
                    }}
                ></button>
            </div>
            <div className="toast-body">{msg.body}</div>
        </div>
    );
};

export default Toast;
