import http from "../../shared/api/http";
import { API_ENDPOINTS } from "@/utils/constants";

// Create order
export const createRazorPayOrder = async () => {
    const res = await http.post(API_ENDPOINTS.PAYMENT.CREATE_ORDER);
    return res.data;
}

// Create order
export const verifyRazorPayOrder = async (payload) => {
    const res = await http.post(API_ENDPOINTS.PAYMENT.VERIFY, payload);
    return res.data;
}