import http from "./http";

// Register
export const userRegister = async (payload) => {
  const res = await http.post("/users/register", payload);
  return res.data;
};

// Login
export const userLogin = async (payload) => {
  const res = await http.post("/users/login", payload);
  return res?.data?.data;
};