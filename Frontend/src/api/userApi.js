import http from "./http";

// User cart
export const userCart = async () => {
  const res = await http.get("/users/cart");
  return res.data;
};

// User addToCart
export const addToCart = async ({ productId, quantity = 1 }) => {
  const res = await http.post(`/users/cart/add`, { productId, quantity });
  return res.data;
};

// Update quantity
export const updateQuantity = async ({ productId, quantity = 1 }) => {
  const res = await http.patch("/users/cart/update-quantity", {
    productId,
    quantity,
  });
  return res.data;
};

// Remove item
export const removeItem = async ({productId}) => {
  const res = await http.patch("/users/cart/remove-item", {productId});
  return res.data;
};

// Delete cart
export const deleteCart = async() => {
    const res = await http.delete("/users/cart/delete-cart");
    return res.data;
};

// Profile
export const userProfile = async() => {
  const res = await http.get("/users/profile");
  return res.data;
};

// Update Profile
export const updateProfile = async({ name, email, phone }) => {
  const res = await http.put("/users/update-profile", { name, email, phone });
  return res.data;
}

// Delete Profile
export const deleteProfile = async () => {
  const res = await http.delete("/users/delete-profile");
  return res.data;
}

export const updatePassword = async({ password }) => {
  const res = await http.patch("/users/update-password", { password });
  return res.data;
}

// Orders
export const allOrders = async() => {
  const res = await http.get("/users/orders");
  return res.data.data;
};

// Invoice
export const downloadInvoice = async(id) => {
  const res = await http.get(`/users/orders/invoice/${id}`, {
    responseType: "blob",
  });
  return res.data;
}

// Subscriber
export const subscribe = async({ email }) => {
  const res = await http.post("/subscribe", { email });
  return res.data;
}

// Contact
export const contact = async ({ name, email, subject, message }) => {
  const res = await http.post("/contact", { name, email, subject, message });
  return res.data;
}