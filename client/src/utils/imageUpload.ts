export const checkImage = (file: File) => {
    let error = "";
    if (!file) error = "File does not exist";

    // 1 mb
    if (file.size > 1024 * 1024) error = "The largest image size is 1mb";

    if (!file.type.includes("image")) error = "Invalid file format";

    return error;
};

export const imageUpload = async (images: Array<string | File>) => {
    let imgArr = [];
    for (const item of images) {
        const formData = new FormData();
        formData.append("file", item);
        formData.append("upload_preset", "v-network");
        formData.append("cloud_name", "beatzoid");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/beatzoid/image/upload",
            { method: "POST", body: formData }
        );

        const data = await res.json();
        imgArr.push({ public_id: data.public_id, url: data.secure_url });
    }

    return imgArr;
};
