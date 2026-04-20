import http from "./http";

export const getProducts = async ({ page = 1, limit = 12, category, vendor }) => {
  const res = await http.get(`/products`, {
    params: {
      page,
      limit,
      category,
      vendor,
    },
  });

  return res.data;
};

export const getProductDetails = async (id) => {
  const res = await http.get(`/products/${id}`);
  return res.data;
};