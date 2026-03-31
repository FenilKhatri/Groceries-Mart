import User from "../models/userModel.js";
import Vendor from "../models/vendorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Herlpers
const sendResponse = (res, statusCode, message, data = null, error = null) => {
  const response = { message };

  if (data !== null) response.data = data;
  if (error !== null) response.error = error;

  return res.status(statusCode).json(response);
};

const asyncHandler = (fn) => async (req, res) => {
  try {
    return await fn(req, res);
  } catch (error) {
    return sendResponse(res, 500, "Server error!", null, error.message);
  }
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const normalizeEmail = (email) =>
  String(email || "")
    .trim()
    .toLowerCase();
const normalizePhone = (phone) => String(phone || "").trim();
const normalizeText = (value) => String(value || "").trim();

const buildToken = (account) =>
  jwt.sign(
    {
      id: account._id,
      role: account.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" },
  );

const emailRegex = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.+_-]+\.[A-Za-z]{2,}$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex =
  /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(){}[\].+\-]).{6,}$/;

const validateRegisterInput = ({ name, email, phone, password }) => {
  if (!name || !email || !phone || !password) {
    return "All fields are required!";
  }

  if (!emailRegex.test(email)) {
    return "Invalid Email!";
  }

  if (!phoneRegex.test(phone)) {
    return "Invalid Phone!";
  }

  if (!passwordRegex.test(password)) {
    return "Password needs first character uppercase, plus lowercase, number, special character, and minimum 6 characters!";
  }

  return null;
};

// Me
const me = asyncHandler(async (req, res) => {
  const id = req.user?.id || req.user?._id || req.vendor?.id || req.vendor?._id;

  if (!id) {
    return sendResponse(res, 400, "Account id is required!");
  }

  if (!isValidObjectId(id)) {
    return sendResponse(res, 400, "Invalid account id!");
  }

  let account = await User.findById(id).select("-password");

  if (!account) {
    account = await Vendor.findById(id).select("-password");
  }

  if (!account) {
    return sendResponse(res, 404, "Account not found!");
  }

  return sendResponse(res, 200, "Account fetched successfully!", {
    account,
    accountType: account.role,
  });
});

// Register
const userRegister = asyncHandler(async (req, res) => {
  const name = normalizeText(req.body?.name);
  const email = normalizeEmail(req.body?.email);
  const phone = normalizePhone(req.body?.phone);
  const password = String(req.body?.password || "");

  const validationError = validateRegisterInput({
    name,
    email,
    phone,
    password,
  });

  if (validationError) {
    return sendResponse(res, 400, validationError);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return sendResponse(res, 400, "User already exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: "user",
  });

  const token = buildToken(newUser);
  return sendResponse(res, 201, "User registered successfully!", {
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
    },
    token,
  });
});

// Login
const userLogin = asyncHandler(async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || "");

  if (!email || !password) {
    return sendResponse(res, 400, "All fields are required!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return sendResponse(res, 400, "Invalid email or password!");
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    return sendResponse(res, 400, "Invalid email or password!");
  }

  const token = buildToken(user);
  const isProd = process.env.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };

  res.cookie("token", token, cookieOptions);

  return sendResponse(res, 200, "Logged in successfully!", {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});

export default {
  me,
  userRegister,
  userLogin,
};
