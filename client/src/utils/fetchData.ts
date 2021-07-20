import axios from "axios";

export const getDataAPI = async (url: string, token: string) => {
    const res = await axios.get(`/api/${url}`, {
        headers: {
            Authentication: token
        }
    });
    return res;
};

export const postDataAPI = async (url: string, data?: any, token?: string) => {
    const res = await axios.post(`/api/${url}`, data ?? undefined, {
        withCredentials: true,
        headers: token
            ? {
                  Authentication: token
              }
            : undefined
    });
    return res;
};

export const putDataAPI = async (url: string, data: any, token: string) => {
    const res = await axios.put(`/api/${url}`, data, {
        headers: {
            Authentication: token
        }
    });
    return res;
};

export const patchDataAPI = async (url: string, data: any, token?: string) => {
    const res = await axios.patch(
        `/api/${url}`,
        data,
        token
            ? {
                  headers: {
                      Authentication: token
                  }
              }
            : undefined
    );
    return res;
};

export const deleteDataAPI = async (url: string, token: string) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: {
            Authentication: token
        }
    });
    return res;
};
