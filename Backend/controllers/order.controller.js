import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Helpers
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

const getUserIdFromReq = (req) => req.user?.id || req.user?._id;

const validateUserOrFail = (req, res) => {
  const userId = getUserIdFromReq(req);

  if (!userId) {
    sendResponse(res, 401, "Unauthorized!");
    return null;
  }

  if (!isValidObjectId(userId)) {
    sendResponse(res, 400, "Invalid userId!");
    return null;
  }

  return userId;
};

const getOrdersByUser = async (userId) =>
  Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("items.product", "name price images thumbnail category");

const getCartByUser = async (userId, session = null) => {
  let query = Cart.findOne({ user: userId }).populate(
    "items.product",
    "name price stock images thumbnail category",
  );

  if (session) query = query.session(session);
  return query;
};

const calculateTotalAmount = (items = []) =>
  items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

const normalizeAddress = (address = {}) => ({
  name: String(address.name || "").trim(),
  phone: String(address.phone || "").trim(),
  address: String(address.address || "").trim(),
  city: String(address.city || "").trim(),
  pincode: String(address.pincode || "").trim(),
});

const validateAddress = (address = {}) => {
  const clean = normalizeAddress(address);

  if (
    !clean.name ||
    !clean.phone ||
    !clean.address ||
    !clean.city ||
    !clean.pincode
  ) {
    return "All address fields are required!";
  }

  if (!/^\d{10}$/.test(clean.phone)) {
    return "Invalid phone!";
  }

  if (!/^\d{6}$/.test(clean.pincode)) {
    return "Invalid pincode!";
  }

  return null;
};

// Place Order
const placeOrder = asyncHandler(async (req, res) => {
  const userId = validateUserOrFail(req, res);
  if (!userId) return;

  const address = normalizeAddress(req.body?.address || {});
  const customerNote = String(req.body?.customerNote || "").trim();
  const paymentMethod = String(req.body?.paymentMethod || "cod")
    .trim()
    .toLowerCase();
  const paymentStatus = String(req.body?.paymentStatus || "paid")
    .trim()
    .toLowerCase();

  const addressError = validateAddress(address);
  if (addressError) {
    return sendResponse(res, 400, addressError);
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cart = await getCartByUser(userId, session);

    if (!cart || !cart.items || cart.items.length === 0) {
      await session.abortTransaction();
      return sendResponse(res, 400, "Cart is empty!");
    }

    const orderItems = [];

    for (const item of cart.items) {
      const productId = item.product?._id || item.product;

      if (!isValidObjectId(productId)) {
        await session.abortTransaction();
        return sendResponse(res, 400, "Invalid product in cart!");
      }

      const product = await Product.findById(productId).session(session);

      if (!product) {
        await session.abortTransaction();
        return sendResponse(res, 404, "Product not found!");
      }

      if (product.stock < item.quantity) {
        await session.abortTransaction();
        return sendResponse(
          res,
          400,
          `Only ${product.stock} items are available for ${product.name}!`,
        );
      }

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const totalAmount = calculateTotalAmount(orderItems);

    const [order] = await Order.create(
      [
        {
          user: userId,
          items: orderItems,
          totalAmount,
          shippingAddress: address,
          customerNote,
          paymentMethod,
          paymentStatus,
          orderStatus: "placed",
          razorpay: {
            orderId: String(req.body?.razorpay?.orderId || "").trim(),
            paymentId: String(req.body?.razorpay?.paymentId || "").trim(),
            signature: String(req.body?.razorpay?.signature || "").trim(),
          },
        },
      ],
      { session },
    );

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save({ session });

    await session.commitTransaction();

    const populatedOrder = await Order.findById(order._id).populate(
      "items.product",
      "name price images thumbnail category",
    );

    return sendResponse(res, 201, "Order placed successfully!", {
      order: populatedOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    return sendResponse(
      res,
      500,
      "Internal Server Error!",
      null,
      error.message,
    );
  } finally {
    session.endSession();
  }
});

// All orders
const allOrders = asyncHandler(async (req, res) => {
  const userId = validateUserOrFail(req, res);
  if (!userId) return;

  const orders = await getOrdersByUser(userId);

  if (!orders || orders.length === 0) {
    return sendResponse(res, 200, "Currently you don't have any orders!", {
      orders: [],
    });
  }

  return sendResponse(res, 200, "Orders fetched successfully!", { orders });
});

// Order details
const getOrderDetails = asyncHandler(async (req, res) => {
  const userId = validateUserOrFail(req, res);
  if (!userId) return;

  const orderId = req.params?.id;

  if (!orderId) {
    return sendResponse(res, 400, "Order id required!");
  }

  if (!isValidObjectId(orderId)) {
    return sendResponse(res, 400, "Invalid order id!");
  }

  const order = await Order.findOne({ _id: orderId, user: userId })
    .populate("user", "name email")
    .populate("items.product", "name price images thumbnail category");

  if (!order) {
    return sendResponse(res, 404, "Order not found!");
  }

  return sendResponse(res, 200, "Order fetched successfully!", { order });
});

export default {
  placeOrder,
  allOrders,
  getOrderDetails,
};