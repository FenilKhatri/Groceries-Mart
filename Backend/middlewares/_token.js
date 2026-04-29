import jwt from "jsonwebtoken";

export const readBearerToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  return authHeader.split(" ")[1]?.trim() || null;
};

export const readCookieToken = (req) => {
  return req.cookies?.token || null;
};

export const readAuthToken = (req) => {
  return readCookieToken(req) || readBearerToken(req);
};

export const verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);
