export const editData = (data: any[], id: string, post: any) => {
    return data.map((item) => (item._id === id ? post : item));
};

export const deleteData = (data: any[], id: string) => {
    return data.filter((item) => item._id !== id);
};
