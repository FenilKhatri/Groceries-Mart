import http from "./http"

// Create order
export const createRazorPayOrder = async () => {
    const res = await http.post("/users/payments/create-order");
    return res.data;
}

// Create order
export const verifyRazorPayOrder = async (payload) => {
    const res = await http.post("/users/payments/verify-order", payload);
    return res.data;
}