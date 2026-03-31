import http from "./http";

export const logoutApi = async () => {
    const res = await http.post("/logout");
    return res.data;
};