import http from "../../shared/api/http";
import { API_ENDPOINTS } from "../../utils/constants";

// User Register
export const userRegister = async (payload) => {
    const res = await http.post(API_ENDPOINTS.AUTH.REGISTER, payload);
    return res.data;
};

// User Login
export const userLogin = async (payload) => {
    const res = await http.post(API_ENDPOINTS.AUTH.LOGIN, payload);
    return res?.data?.data;
};

// Vendor Register
export const registerVendor = async (payload) => {
    const res = await http.post(API_ENDPOINTS.AUTH.VENDOR_REGISTER, payload);
    return res.data;
};

// Vendor Login
export const loginVendor = async (payload) => {
    const res = await http.post(API_ENDPOINTS.AUTH.VENDOR_LOGIN, payload);
    return res.data.data;
};

// getMe
export const getMe = async () => {
    const res = await http.get(API_ENDPOINTS.AUTH.ME);
    return res.data;
};

// Logout
export const logoutApi = async () => {
    const res = await http.post(API_ENDPOINTS.AUTH.LOGOUT);
    return res.data;
};