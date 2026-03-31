import http from "./http";

export const getProducts = async (category, vendor) => {
  const res = await http.get(`/products`, { params: { category, vendor } });
  return res.data;
};

export const getProductDetails = async (id) => {
  const res = await http.get(`/products/${id}`);
  return res.data;
};