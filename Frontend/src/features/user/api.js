import http from "../../shared/api/http";
import { API_ENDPOINTS } from "../../utils/constants.js";

// User cart
export const userCart = async () => {
  const res = await http.get(API_ENDPOINTS.USERS.CART.GET);
  return res.data;
};

// User addToCart
export const addToCart = async ({ productId, quantity = 1 }) => {
  const res = await http.post(API_ENDPOINTS.USERS.CART.ADD, { productId, quantity });
  return res.data;
};

// Update quantity
export const updateQuantity = async ({ productId, quantity = 1 }) => {
  const res = await http.patch(API_ENDPOINTS.USERS.CART.UPDATE_QUANTITY, {
    productId,
    quantity,
  });
  return res.data;
};

// Remove item
export const removeItem = async ({ productId }) => {
  const res = await http.patch(API_ENDPOINTS.USERS.CART.REMOVE_ITEM, { productId });
  return res.data;
};

// Delete cart
export const deleteCart = async () => {
  const res = await http.delete(API_ENDPOINTS.USERS.CART.DELETE_CART);
  return res.data;
};

// Profile
export const userProfile = async () => {
  const res = await http.get(API_ENDPOINTS.USERS.PROFILE);
  return res.data;
};

// Update Profile
export const updateProfile = async ({ name, email, phone }) => {
  const res = await http.put(API_ENDPOINTS.USERS.PROFILE, { name, email, phone });
  return res.data;
}

// Delete Profile
export const deleteProfile = async () => {
  const res = await http.delete(API_ENDPOINTS.USERS.PROFILE);
  return res.data;
}

export const updatePassword = async ({ password }) => {
  const res = await http.patch(API_ENDPOINTS.USERS.UPDATE_PASSWORD, { password });
  return res.data;
}

// Orders
export const allOrders = async () => {
  const res = await http.get(API_ENDPOINTS.USERS.ORDERS);
  return res.data.data;
};

// Invoice
export const downloadInvoice = async (id) => {
  const res = await http.get(API_ENDPOINTS.USERS.INVOICE(id), {
    responseType: "blob",
  });
  return res.data;
};

// Subscriber
export const subscribe = async ({ email }) => {
  const res = await http.post(API_ENDPOINTS.USERS.SUBSCRIBE, { email });
  return res.data;
}

// Contact
export const contact = async ({ name, email, subject, message }) => {
  const res = await http.post(API_ENDPOINTS.USERS.CONTACT, { name, email, subject, message });
  return res.data;
}