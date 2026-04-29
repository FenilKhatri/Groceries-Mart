import http from "../../shared/api/http";
import { API_ENDPOINTS } from "../../utils/constants";

// Profile
export const vendorProfile = async (id) => {
  const res = await http.get(API_ENDPOINTS.VENDORS.PROFILE(id));
  return res.data;
}

export const updateProfile = async ({ name, email, phone }, id) => {
  const res = await http.put(API_ENDPOINTS.VENDORS.UPDATE_PROFILE(id), { name, email, phone });
  return res.data;
}

export const deleteProfile = async (id) => {
  const res = await http.delete(API_ENDPOINTS.VENDORS.DELETE_PROFILE(id));
  return res.data;
}

export const updatePassword = async (id, { password }) => {
  const res = await http.patch(API_ENDPOINTS.VENDORS.UPDATE_PASSWORD(id), { password });
  return res.data;
}

// Shop
export const uploadVendorShop = async (formData, id) => {
  const res = await http.post(API_ENDPOINTS.VENDORS.UPLOAD_SHOP(id), formData);
  return res.data;
};

export const getMyShop = async (id) => {
  const res = await http.get(API_ENDPOINTS.VENDORS.GET_MY_SHOP(id));
  return res.data;
};

export const getShopCategories = async (vendorId) => {
  const res = await http.get(API_ENDPOINTS.VENDORS.GET_SHOP_CATEGORIES(vendorId));
  return res.data;
};

// Products
export const vendorAddProduct = async (formData, id) => {
  const res = await http.post(API_ENDPOINTS.VENDORS.ADD_PRODUCT(id), formData);
  return res.data;
};

export const vendorProducts = async (vendorId) => {
  const res = await http.get(API_ENDPOINTS.VENDORS.PRODUCTS(vendorId));
  return res.data;
}

export const getProductDetails = async (vendorId, productId) => {
  const res = await http.get(API_ENDPOINTS.VENDORS.GET_PRODUCTDETAILS(vendorId, productId));
  return res.data;
}

export const updateProductDetails = async (vendorId, productId, data) => {
  const res = await http.patch(API_ENDPOINTS.VENDORS.UPDATE_PRODUCT(vendorId, productId), data, { headers: { "Content-Type": "application/json" }, });
  return res.data;
}