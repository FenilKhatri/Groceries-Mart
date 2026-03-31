import http from "./http";

// Auth
export const vendorRegister = async (payload) => {
  const res = await http.post("/vendors/register", payload);
  return res.data;
};

export const vendorLogin = async (payload) => {
  const res = await http.post("/vendors/login", payload);
  return res.data.data;
};

// Profile
export const vendorProfile = async (id) => {
  const res = await http.get(`/vendors/${id}/profile`);
  return res.data;
}

export const updateProfile = async ({ name, email, phone }, id) => {
  const res = await http.put(`/vendors/${id}/update-profile`, { name, email, phone });
  return res.data;
}

export const deleteProfile = async(id) => {
  const res = await http.delete(`/vendors/${id}/delete-profile`);
  return res.data;
} 

export const updatePassword = async(id, { password }) => {
  const res = await http.patch(`/vendors/${id}/update-password`, { password });
  return res.data;
}

// Shop
export const uploadVendorShop = async (formData, id) => {
  const res = await http.post(`/vendors/${id}/upload/vendorShop`, formData);
  return res.data;
};

export const getMyShop = async (id) => {
  const res = await http.get(`/vendors/${id}/my-shop`);
  return res.data;
};

export const getShopCategories = async (vendorId) => {
  const res = await http.get(`/vendors/${vendorId}/shop/categories`);
  return res.data;
};

// Products
export const vendorAddProduct = async (formData, id) => {
  const res = await http.post(`/vendors/${id}/add-products`, formData);
  return res.data;
};

export const vendorProducts = async (vendorId) => {
  const res = await http.get(`/vendors/${vendorId}/products`);
  return res.data;
}

export const getProductDetails = async (vendorId, productId) => {
  const res = await http.get(`/vendors/${vendorId}/product/${productId}`);
  return res.data;
}

export const updateProductDetails = async (vendorId, productId, data) => {
  const res = await http.patch(`/vendors/${vendorId}/product/${productId}`, data, { headers: { "Content-Type": "application/json" }, });
  return res.data;
}