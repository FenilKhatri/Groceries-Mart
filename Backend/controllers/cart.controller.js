import mongoose from "mongoose";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Handlers
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
    return sendResponse(
      res,
      500,
      "Internal Server Error!",
      null,
      error.message,
    );
  }
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const validateObjectIdOrFail = (res, id, label = "id") => {
  if (!id) {
    sendResponse(res, 400, `${label} required!`);
    return false;
  }

  if (!isValidObjectId(id)) {
    sendResponse(res, 400, `Invalid ${label}!`);
    return false;
  }

  return true;
};

const getUserIdFromReq = (req) => req.user?.id || req.user?._id;

const getCartTotalAmount = (items = []) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const findProductOrFail = async (res, productId) => {
  if (!validateObjectIdOrFail(res, productId, "productId")) return null;

  const product = await Product.findById(productId);
  if (!product) {
    sendResponse(res, 404, "Product not found!");
    return null;
  }

  return product;
};

const findUserCart = async (userId) =>
  Cart.findOne({ user: userId }).populate(
    "items.product",
    "name price stock thumbnail images category unit",
  );

// Add to Cart
const userAddToCart = asyncHandler(async (req, res) => {
  const userId = getUserIdFromReq(req);
  if (!userId) {
    return sendResponse(res, 401, "Unauthorized!");
  }

  const productId = req.body?.productId;
  const product = await findProductOrFail(res, productId);
  if (!product) return;

  if (product.stock < 1) {
    return sendResponse(res, 400, "Product is out of stock!");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [
        {
          product: product._id,
          quantity: 1,
          price: product.price,
        },
      ],
      totalAmount: product.price,
    });

    const populatedCart = await findUserCart(userId);

    return sendResponse(res, 200, "Product added!", { cart: populatedCart });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === product._id.toString(),
  );

  if (itemIndex > -1) {
    const newQuantity = cart.items[itemIndex].quantity + 1;

    if (newQuantity > product.stock) {
      return sendResponse(
        res,
        400,
        `Only ${product.stock} items are available in stock!`,
      );
    }

    cart.items[itemIndex].quantity = newQuantity;
    cart.items[itemIndex].price = product.price;
  } else {
    cart.items.push({
      product: product._id,
      quantity: 1,
      price: product.price,
    });
  }

  cart.totalAmount = getCartTotalAmount(cart.items);
  await cart.save();

  const populatedCart = await findUserCart(userId);

  return sendResponse(res, 200, "Cart updated!", { cart: populatedCart });
});

// Get cart
const userCart = asyncHandler(async (req, res) => {
  const userId = getUserIdFromReq(req);
  if (!userId) {
    return sendResponse(res, 401, "Unauthorized!");
  }

  const cart = await findUserCart(userId);

  if (!cart) {
    return sendResponse(res, 200, "Cart is empty!", {
      cart: {
        user: userId,
        items: [],
        totalAmount: 0,
      },
    });
  }

  return sendResponse(res, 200, "Cart fetched successfully!", { cart });
});

export default { userAddToCart, userCart };
