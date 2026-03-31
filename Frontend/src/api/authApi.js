import http from "./http";

export const getMe = async () => {
  const res = await http.get("/auth/me");
  return res.data;
};