import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import bcrypt from "bcryptjs";

// Common controller helpers
const assertObjectId = (id, name = "id") => {
  if (!id) {
    const err = new Error(`${name} required!`);
    err.status = 400;
    throw err;
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error(`Invalid ${name}!`);
    err.status = 400;
    throw err;
  }
};

const getUserIdOrThrow = (req) => {
  const userId = req.user?.id;
  if (!userId) {
    const err = new Error("Unauthorized!");
    err.status = 401;
    throw err;
  }
  assertObjectId(userId, "userId");
  return userId;
};

const ensureUserExists = async (userId) => {
  const user = await User.findById(userId).select("_id");
  if (!user) {
    const err = new Error("User not found!");
    err.status = 404;
    throw err;
  }
  return user;
};

const getProductOrThrow = async (productId) => {
  assertObjectId(productId, "productId");
  const product = await Product.findById(productId);
  if (!product) {
    const err = new Error("Product not found!");
    err.status = 404;
    throw err;
  }
  return product;
};

const getCartOrCreate = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = new Cart({ user: userId, items: [], totalAmount: 0 });
  return cart;
};

const getCartOrThrow = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart || !cart.items || cart.items.length === 0) {
    const err = new Error("Cart is empty!");
    err.status = 400;
    throw err;
  }
  return cart;
};

const recalcCart = (cart) => {
  cart.totalAmount = cart.items.reduce(
    (sum, it) => sum + Number(it.price) * Number(it.quantity),
    0,
  );
  return cart;
};

const findItemIndex = (cart, productId) =>
  cart.items.findIndex((it) => String(it.product) === String(productId));

// Async controller
const asyncHandler = (fn) => (req, res) =>
  Promise.resolve(fn(req, res)).catch((err) => {
    const status = err.status || 500;
    res.status(status).json({
      message: err.message || "Internal Server Error!",
      ...(status === 500 ? { error: err?.message } : {}),
    });
  });

// User cart
const userCart = asyncHandler(async (req, res) => {
  const userId = getUserIdOrThrow(req);
  await ensureUserExists(userId);

  const cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    select: "name price unit brand thumbnail images stock",
  });
  if (!cart || cart.items.length === 0) {
    return res.status(200).json({ message: "Your cart is empty!", cart: [] });
  }

  return res.status(200).json({ message: "Cart fetched successfully!", cart });
});

// Add to cart
const addToCart = asyncHandler(async (req, res) => {
  const userId = getUserIdOrThrow(req);
  await ensureUserExists(userId);

  const { productId, quantity } = req.body || {};
  const qty = Number(quantity);
  if (!Number.isInteger(qty) || qty < 1) {
    return res.status(400).json({ message: "Quantity must be >= 1!" });
  }

  const product = await getProductOrThrow(productId);
  const cart = await getCartOrCreate(userId);
  const idx = findItemIndex(cart, productId);

  if (idx !== -1) {
    const newQty = cart.items[idx].quantity + qty;
    if (newQty > product.stock)
      return res
        .status(400)
        .json({ message: "Requested quantity exceeds stock!" });
    cart.items[idx].quantity = newQty;
  } else {
    if (qty > product.stock)
      return res
        .status(400)
        .json({ message: "Requested quantity exceeds stock!" });
    cart.items.push({
      product: productId,
      quantity: qty,
      price: product.price,
    });
  }

  recalcCart(cart);
  await cart.save();

  return res.status(200).json({ message: "Cart updated!", cart });
});

// Update quantity
const updateQuantity = asyncHandler(async (req, res) => {
  const userId = getUserIdOrThrow(req);
  await ensureUserExists(userId);

  const { productId, quantity } = req.body || {};
  const newQty = Number(quantity);

  if (!Number.isInteger(newQty)) {
    return res.status(400).json({ message: "Invalid quantity!" });
  }

  const product = await getProductOrThrow(productId);
  const cart = await getCartOrThrow(userId);

  const idx = findItemIndex(cart, productId);
  if (idx === -1)
    return res.status(404).json({ message: "Item not found!" });

  if (newQty <= 0) {
    cart.items.splice(idx, 1);
  } else {
    if (newQty > product.stock) {
      return res.status(400).json({ message: "Stock limit exceeded!" });
    }
    cart.items[idx].quantity = newQty;
    cart.items[idx].price = product.price;
  }

  recalcCart(cart);
  await cart.save();

  return res.status(200).json({ message: "Cart updated!", cart });
});

// Remove item
const removeItem = asyncHandler(async (req, res) => {
  const userId = getUserIdOrThrow(req);
  await ensureUserExists(userId);

  const { productId } = req.body || {};
  await getProductOrThrow(productId);

  const cart = await getCartOrThrow(userId);
  const idx = findItemIndex(cart, productId);
  if (idx === -1) return res.status(404).json({ message: "Item not found!" });

  cart.items.splice(idx, 1);
  recalcCart(cart);
  await cart.save();

  return res.status(200).json({ message: "Item removed!", cart });
});

// Delete cart
const deleteCart = asyncHandler(async (req, res) => {
  const userId = getUserIdOrThrow(req);
  await ensureUserExists(userId);

  await Cart.findOneAndDelete({ user: userId });

  return res.status(200).json({ message: "Cart is cleared!" });
});

// User profile
const userProfile = asyncHandler(async (req, res) => {
  const userId = getUserIdOrThrow(req);
  await ensureUserExists(userId);

  const user = await User.findById(userId);
  return res.status(200).json({ message: "User profile fetched!", user });
});

// Update Profile
const updateProfile = asyncHandler(async (req, res) => {
  const userId = getUserIdOrThrow(req);
  await ensureUserExists(userId);

  const user = await User.findById(userId);

  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ message: "All fields are required!" });

  const emailRegex = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.+_-]+\.[A-Za-z]{2,}$/;
  const phoneRegex = /^\d{10}$/;

  if (!emailRegex.test(email))
    return res.status(400).json({ message: `Invalid email!` });
  if (!phoneRegex.test(phone))
    return res.status(400).json({ message: `Invalid phone!` });

  user.name = name;
  user.email = email;
  user.phone = phone;
  await user.save();
  return res.status(200).json({ message: "User profile updated!", user });
});

// Update Password
const updatePassword = asyncHandler(async (req, res) => {
  const userId = getUserIdOrThrow(req);
  await ensureUserExists(userId);

  const user = await User.findById(userId);

  const { password } = req.body;
  if (!password)
    return res.status(400).json({ message: "Password must be required!" });

  const passwordRegex = /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(){}[\].+\-]).{6,}$/;
  if(!passwordRegex.test(password)) return res.status(400).json({ message: "Weak credentials!" });

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  await user.save();
  return res.status(200).json({ message: "Password updated successfully!", user });
});

// Delete Profile
const deleteProfile = asyncHandler(async (req, res) => {
  const userId = getUserIdOrThrow(req);
  await ensureUserExists(userId);

  await User.findByIdAndDelete(userId);
  await Order.deleteMany({ user: userId });

  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });

  return res.status(200).json({ message: "Account deleted!" });
});

export default {
  addToCart,
  removeItem,
  deleteCart,
  deleteProfile,
  userCart,
  userProfile,
  updateQuantity,
  updateProfile,
  updatePassword,
};
