export const checkImage = (file: File) => {
    let error = "";
    if (!file) error = "File does not exist";

    // 1 mb
    if (file.size > 1024 * 1024) error = "The largest image size is 1mb";

    if (!file.type.includes("image")) error = "Invalid file format";

    return error;
};
