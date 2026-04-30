import http from "../../shared/api/http";
import { API_ENDPOINTS } from "../../utils/constants";

export const getProducts = async ({
    page = 1,
    limit = 12,
    category,
    vendor,
    search,
} = {}) => {
    const res = await http.get(API_ENDPOINTS.PRODUCTS.GET_ALL, {
        params: {
            page,
            limit,
            ...(category && { category }),
            ...(vendor && { vendor }),
            ...(search && { search }),
        },
    });
    return res.data;
};

export const getProductDetails = async (id) => {
    const res = await http.get(API_ENDPOINTS.PRODUCTS.GET_ONE(id));
    return res.data;
};