import http from "../../shared/api/http";
import { API_ENDPOINTS } from "../../utils/constants";

// Vendors
export const getVendors = async () => {
  const res = await http.get(API_ENDPOINTS.ADMIN.VENDORS);
  return res.data?.data;
};

export const approveVendorRequest = async (id) => {
  const res = await http.patch(API_ENDPOINTS.ADMIN.APPROVE_VENDOR_REQUEST(id));
  return res.data;
};

export const rejectVendorRequest = async (id) => {
  const res = await http.patch(API_ENDPOINTS.ADMIN.REJECT_VENDOR_REQUEST(id));
  return res.data;
};

export const deleteVendorRequest = async (id) => {
  const res = await http.patch(API_ENDPOINTS.ADMIN.DELETE_VENDOR_REQUEST(id));
  return res.data;
};

// Shops
export const getShops = async () => {
  const res = await http.get(API_ENDPOINTS.ADMIN.GET_SHOPS);
  return res.data?.data;
};

export const getShopById = async (id) => {
  const res = await http.get(API_ENDPOINTS.ADMIN.GET_SHOP(id));
  return res.data?.data;
};

export const approveShop = async (id) => {
  const res = await http.patch(API_ENDPOINTS.ADMIN.APPROVE_SHOP(id));
  return res.data;
};

export const rejectShop = async (id) => {
  const res = await http.patch(API_ENDPOINTS.ADMIN.REJECT_SHOP(id));
  return res.data;
};

export const deleteShop = async (id) => {
  const res = await http.delete(API_ENDPOINTS.ADMIN.DELETE_SHOP(id));
  return res.data;
};

export const cancelShop = async (id) => {
  const res = await http.patch(API_ENDPOINTS.ADMIN.CANCEL_SHOP(id));
  return res.data;
};

export const shopProducts = async (id) => {
  const res = await http.get(API_ENDPOINTS.ADMIN.GET_SHOP_PRODUCTS(id));
  return res.data;
}

// Users
export const getUsers = async () => {
  const res = await http.get(API_ENDPOINTS.ADMIN.USERS);
  return res.data?.data;
};

// Orders
export const getOrders = async () => {
  const res = await http.get(API_ENDPOINTS.ADMIN.ORDERS);
  return res.data?.data;
};

export const getOrderDetails = async (id) => {
  const res = await http.get(API_ENDPOINTS.ADMIN.GET_ORDER(id));
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await http.get(API_ENDPOINTS.ADMIN.GET_ORDER(id));
  return res.data;
};

export const updateStatus = async (id, orderStatus) => {
  const res = await http.put(API_ENDPOINTS.ADMIN.UPDATE_STATUS(id), orderStatus);
  return res.data;
};

// Profile
export const getProfile = async() => {
  const res = await http.get(API_ENDPOINTS.ADMIN.GET_PROFILE);
  return res?.data;
};

export const updateProfile = async({ name, email, phone }) => {
  const res = await http.patch(API_ENDPOINTS.ADMIN.UPDATE_PROFILE, { name, email, phone });
  return res.data;
}

// Delete Vendor
export const deleteVendor = async (id) => {
  const res = await http.delete(API_ENDPOINTS.ADMIN.DELETE_VENDOR(id), { data: { id } });
  return res.data;
}

// Delete User
export const deleteUser = async (id) => {
  const res = await http.delete(API_ENDPOINTS.ADMIN.DELETE_USER(id), { data: { id } });
  return res.data;
}

// Contacts
export const getContacts = async () => {
  const res = await http.get(API_ENDPOINTS.ADMIN.CONTACTS);
  return res.data;
}

export const getContactDetails = async (id) => {
  const res = await http.get(API_ENDPOINTS.ADMIN.GET_CONTACT_DETAILS(id));
  return res.data;
};

export const getDashboardData = async () => {
  const res = await http.get(API_ENDPOINTS.ADMIN.DASHBOARD);
  return res.data;
};