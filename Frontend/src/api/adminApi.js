import http from "./http";

// Vendors
export const getVendors = async () => {
  const res = await http.get("/admin/vendors");
  return res.data?.data;
};

export const approveVendorRequest = async (id) => {
  const res = await http.patch(`/admin/vendors/${id}/approve`);
  return res.data;
};

export const rejectVendorRequest = async (id) => {
  const res = await http.patch(`/admin/vendors/${id}/reject`);
  return res.data;
};

export const deleteVendorRequest = async (id) => {
  const res = await http.patch(`/admin/vendors/${id}/delete`);
  return res.data;
};

// Products
export const getProducts = async () => {
  const res = await http.get("/admin/products");
  return res.data;
}

// Shops
export const getShops = async () => {
  const res = await http.get("/admin/shops");
  return res.data?.data;
};

export const getShopById = async (id) => {
  const res = await http.get(`/admin/shops/${id}`);
  return res.data?.data;
};

export const approveShop = async (id) => {
  const res = await http.patch(`/admin/shops/${id}/approve`);
  return res.data;
};

export const rejectShop = async (id) => {
  const res = await http.patch(`/admin/shops/${id}/reject`);
  return res.data;
};

export const deleteShop = async (id) => {
  const res = await http.delete(`/admin/shops/${id}/delete`);
  return res.data;
};

export const cancelShop = async (id) => {
  const res = await http.patch(`/admin/shops/${id}/cancel`);
  return res.data;
};

export const shopProducts = async (id) => {
  const res = await http.get(`admin/shops/${id}/products`);
  return res.data;
}

// Users
export const getUsers = async () => {
  const res = await http.get("/admin/users");
  return res.data?.data;
};

// Orders
export const getOrders = async () => {
  const res = await http.get("/admin/orders");
  return res.data?.data;
};

export const getOrderDetails = async (id) => {
  const res = await http.get(`/admin/orders/${id}`);
  return res.data;
};

export const updateStatus = async (id, orderStatus) => {
  const res = await http.put(`/admin/orders/${id}/update-status`, orderStatus);
  return res.data;
};

// Profile
export const getProfile = async() => {
  const res = await http.get("/users/profile");
  return res.data;
};

export const updateProfile = async({ name, email, phone }) => {
  const res = await http.patch("/admin/update-profile", { name, email, phone });
  return res.data;
}

// Delete Vendor
export const deleteVendor = async (id) => {
  const res = await http.delete("/admin/vendors/delete-profile", { data: { id } });
  return res.data;
}

// Delete User
export const deleteUser = async (id) => {
  const res = await http.delete("/admin/users/delete-profile", { data: { id } });
  return res.data;
}

// Contacts
export const getContacts = async () => {
  const res = await http.get("/admin/contacts");
  return res.data;
}

export const getContactDetails = async (id) => {
  const res = await http.get(`/admin/contact/${id}`);
  return res.data;
}