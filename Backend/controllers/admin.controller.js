import mongoose from "mongoose";
import Shop from "../models/shopModel.js";
import Vendor from "../models/vendorModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Contact from "../models/contactModel.js";

import vendorStatusHelper from "../helper/vendorStatusHelper.js";
import sendShopStatusMail from "../helper/sendShopStatusMail.js";

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

const validateObjectIdOrFail = (res, id, label = "id") => {
  if (!isValidObjectId(id)) {
    sendResponse(res, 400, `Invalid ${label}!`);
    return false;
  }
  return true;
};

const sendListResponse = (res, key, items, successMessage, emptyMessage) => {
  return sendResponse(res, 200, items?.length ? successMessage : emptyMessage, {
    [key]: items || [],
  });
};

const findByIdOrFail = async (
  Model,
  id,
  res,
  notFoundMessage,
  selectFields = "",
) => {
  let query = Model.findById(id);
  if (selectFields) query = query.select(selectFields);

  const doc = await query;
  if (!doc) {
    sendResponse(res, 404, notFoundMessage);
    return null;
  }

  return doc;
};

const getAdminMeta = async (userId) => {
  const admin = await User.findById(userId).select("name email phone");
  return {
    name: admin?.name || "Admin",
    email: admin?.email || "-",
    phone: admin?.phone || "-",
  };
};

const validateProfileInput = ({ name, email, phone }) => {
  if (!name || !email || !phone) {
    return "All fields are required!";
  }

  const emailRegex = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.+_-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Invalid Email!";
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return "Invalid Phone!";
  }

  return null;
};

const findOrders = async (id) =>
  Order.findById(id)
    .populate("user", "name email")
    .populate("items.product", "name price images thumbnail");

const ORDER_STATUS_FLOW = {
  placed: ["confirmed", "cancelled"],
  confirmed: ["packed", "cancelled"],
  packed: ["out_for_delivery", "cancelled"],
  out_for_delivery: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
};

const validateOrderStatusChange = (currentStatus, nextStatus) => {
  const allowedStatuses = Object.keys(ORDER_STATUS_FLOW);

  if (!allowedStatuses.includes(nextStatus)) {
    return "Invalid status update!";
  }

  if (currentStatus === nextStatus) {
    return `Order is already ${currentStatus}!`;
  }

  if (["delivered", "cancelled"].includes(currentStatus)) {
    return `${currentStatus} cannot be updated!`;
  }

  if (!ORDER_STATUS_FLOW[currentStatus]?.includes(nextStatus)) {
    return `Cannot change order status from ${currentStatus} to ${nextStatus}! Allowed: ${ORDER_STATUS_FLOW[currentStatus].join(", ")}`;
  }

  return null;
};

// Reusable shop mail
const shopMailMetaMap = {
  approved: {
    title: "Shop Approved ✅",
    status: "Approved",
  },
  rejected: {
    title: "Shop request rejected ❌",
    status: "Rejected",
  },
  cancelled: {
    title: "Shop request cancelled ❌",
    status: "Cancelled",
  },
  deleted: {
    title: "Shop deleted ❌",
    status: "Deleted",
  },
};

const sendShopStatusEmailToVendor = async (shop, type, adminMeta) => {
  const meta = shopMailMetaMap[type];
  if (!meta) return;

  try {
    await sendShopStatusMail({
      type,
      to: shop.vendor?.email || shop.email,
      title: meta.title,
      actorName: adminMeta.name,
      actorEmail: adminMeta.email,
      actorPhone: adminMeta.phone,
      shopName: shop.name,
      description: shop.description,
      shopEmail: shop.email,
      phone: shop.phone,
      category: shop.category,
      address: shop.address,
      city: shop.city,
      pincode: shop.pincode,
      status: meta.status,
    });
  } catch (error) {
    console.log(`${type} email failed:`, error.message);
  }
};

// Reusable Shop controller
const updateShopStatus = async ({
  req,
  res,
  allowedStatuses,
  nextStatus,
  successMessage,
  vendorNextStatus,
}) => {
  const { id } = req.params;

  if (!validateObjectIdOrFail(res, id, "shop id")) return;

  const existingShop = await Shop.findById(id);
  if (!existingShop) {
    return sendResponse(res, 404, "Shop not found!");
  }

  if (!allowedStatuses.includes(existingShop.status)) {
    return sendResponse(
      res,
      400,
      `Shop is already ${existingShop.status}. Allowed current statuses: ${allowedStatuses.join(", ")}.`,
    );
  }

  const adminMeta = await getAdminMeta(req.user?.id || req.user?._id);

  if (nextStatus === "deleted") {
    await sendShopStatusEmailToVendor(existingShop, nextStatus, adminMeta);

    if (existingShop?.vendor?.vendorId) {
      const vendorId = existingShop.vendor.vendorId;

      await Vendor.findByIdAndDelete(vendorId);
      await Product.deleteMany({ "vendor.vendorId": vendorId });
    }

    await Shop.findByIdAndDelete(id);

    return sendResponse(res, 200, successMessage);
  }

  const setData = {
    status: nextStatus,
    approvedAt: undefined,
    approvedBy: undefined,
    rejectedAt: undefined,
    cancelledAt: undefined,
    deletedAt: undefined,
  };

  if (nextStatus === "approved") {
    setData.approvedAt = new Date();
    setData.approvedBy = req.user?.id || req.user?._id;
  }

  if (nextStatus === "rejected") {
    setData.rejectedAt = new Date();
  }

  if (nextStatus === "cancelled") {
    setData.cancelledAt = new Date();
  }

  const shop = await Shop.findByIdAndUpdate(
    id,
    { $set: setData },
    { new: true, runValidators: false },
  );

  if (shop?.vendor?.vendorId) {
    await Vendor.findByIdAndUpdate(shop.vendor.vendorId, {
      status: vendorNextStatus || nextStatus,
    });
  }

  await sendShopStatusEmailToVendor(shop, nextStatus, adminMeta);

  return sendResponse(res, 200, successMessage, { shop });
};

// Admin Profile Controller
const updateprofile = asyncHandler(async (req, res) => {
  const id = req.user?.id || req.user?._id;
  if (!validateObjectIdOrFail(res, id, "id")) return;

  const admin = await findByIdOrFail(
    User,
    id,
    res,
    "Admin not found!",
    "name email phone",
  );
  if (!admin) return;

  const { name, email, phone } = req.body || {};

  const validationError = validateProfileInput({ name, email, phone });
  if (validationError) {
    return sendResponse(res, 400, validationError);
  }

  admin.name = name;
  admin.email = email;
  admin.phone = phone;

  await admin.save();

  return sendResponse(res, 200, "Profile updated!", { user: admin });
});

// Vendor Controller
const getVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({ role: "vendor" });

  return sendListResponse(
    res,
    "vendors",
    vendors,
    "Successfully fetched vendors!",
    "No vendors found!",
  );
});

const approveVendor = (req, res) => vendorStatusHelper(req, res, "approved");
const rejectVendor = (req, res) => vendorStatusHelper(req, res, "rejected");

// User Controller
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" });

  return sendListResponse(
    res,
    "users",
    users,
    "Successfully fetched users!",
    "No users found!",
  );
});

// Shop Controller
const getShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find();

  return sendListResponse(
    res,
    "shops",
    shops,
    "Successfully fetched shops!",
    "No shops found!",
  );
});

const getShopDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectIdOrFail(res, id, "shop id")) return;

  const shop = await Shop.findById(id);
  if (!shop) {
    return sendResponse(res, 404, "Shop not found!");
  }

  return sendResponse(res, 200, "Shop fetched successfully!", { shop });
});

const approveShop = (req, res) =>
  updateShopStatus({
    req,
    res,
    allowedStatuses: ["pending", "rejected", "cancelled"],
    nextStatus: "approved",
    successMessage: "Shop approved!",
  });

const rejectShop = (req, res) =>
  updateShopStatus({
    req,
    res,
    allowedStatuses: ["pending", "approved"],
    nextStatus: "rejected",
    successMessage: "Shop request rejected!",
  });

const cancelShop = (req, res) =>
  updateShopStatus({
    req,
    res,
    allowedStatuses: ["pending"],
    nextStatus: "cancelled",
    successMessage: "Shop request cancelled!",
  });

const deleteShop = async (req, res) => {
  updateShopStatus({
    req,
    res,
    allowedStatuses: ["pending", "approved", "rejected", "cancelled"],
    nextStatus: "deleted",
    successMessage: "Shop deleted permanently!",
  });
  const { id } = req.params;
  const products = await Product.deleteMany({ "vendor.vendorId": id });
}

// Products Controller
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  return sendResponse(res, 200, "Products fetched!", products);
})

// Shop Products Controller
const getShopProducts = asyncHandler(async(req, res) => {
  const { id } = req.params;
  if(!isValidObjectId(id)) return sendResponse(res, 400, "Invalid ObjectId!");

  const shop = await Shop.findById(id);
  if(!shop) return sendResponse(res, 404, "No shop found!");

  const vendorId = shop?.vendor?.vendorId;
  const products = await Product.find({ "vendor.vendorId": vendorId });
  if (!products || products.length === 0) return sendResponse(res, 404, "No products found!");

  return sendResponse(res, 200, "Shop products found!", products);
}); 

// Order Controller
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });

  return sendListResponse(
    res,
    "orders",
    orders,
    "Orders fetched successfully!",
    "Currently 0 orders!",
  );
});

const getOrderDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectIdOrFail(res, id, "order ID")) return;

  const order = await findOrders(id);
  if (!order) {
    return sendResponse(res, 404, "Order not found!");
  }

  return sendResponse(res, 200, "Order fetched successfully!", { order });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateObjectIdOrFail(res, id, "id")) return;

  const { orderStatus } = req.body || {};
  if (!orderStatus) {
    return sendResponse(res, 400, "Status required!");
  }

  const nextStatus = String(orderStatus).trim().toLowerCase();

  const order = await Order.findById(id);
  if (!order) {
    return sendResponse(res, 404, "No orders found!");
  }

  const validationError = validateOrderStatusChange(
    order.orderStatus,
    nextStatus,
  );

  if (validationError) {
    return sendResponse(res, 400, validationError);
  }

  // reduce stock only once when leaving "placed"
  const shouldReduceStock =
    nextStatus === "delivered" && order.orderStatus !== "delivered";
  if (shouldReduceStock) {
    for (const item of order.items) {
      const productId = item.product;
      const quantity = Number(item.quantity || 0);

      const product = await Product.findById(productId);

      if (!product) {
        return sendResponse(
          res,
          404,
          `Product not found for item ${productId}!`,
        );
      }

      if (Number(product.stock) < quantity) {
        return sendResponse(
          res,
          400,
          `Only ${product.stock} items are available for ${product.name}!`,
        );
      }

      product.stock = Number(product.stock) - quantity;
      await product.save();
    }
  }

  // restore stock on cancel after stock was already reduced
  const shouldRestoreStock =
    nextStatus === "cancelled" &&
    ["confirmed", "packed", "out_for_delivery", "delivered"].includes(
      order.orderStatus,
    );

  if (shouldRestoreStock) {
    for (const item of order.items) {
      const productId = item.product;
      const quantity = Number(item.quantity || 0);

      const product = await Product.findById(productId);
      if (!product) continue;

      product.stock = Number(product.stock || 0) + quantity;
      await product.save();
    }
  }

  order.orderStatus = nextStatus;
  await order.save();

  const updatedOrder = await Order.findById(id)
    .populate("user", "name email")
    .populate("items.product", "name price images thumbnail stock");

  return sendResponse(res, 200, "Order status updated!", {
    order: updatedOrder,
  });
});

// Contact Controller
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  return sendResponse(res, 200, "All contacts fetched!", contacts);
});

const getContactDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return sendResponse(res, 400, "Invalid Id!");

  const contact = await Contact.findById(id);
  return sendResponse(res, 200, "Contact details fetched!", contact);
});

// Delete Controlller
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body
  if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid ObjectId!" });

  const users = await User.findByIdAndDelete(id);
  if (!users) return sendResponse(res, 404, "Account not found!");
  await Order.deleteMany({ user: id });
  return sendResponse(res, 200, "Account deleted!", users);
});

const deleteVendor = asyncHandler(async (req, res) => {
  const { id } = req.body || req.params;

  if (!isValidObjectId(id)) {
    return sendResponse(res, 400, "Invalid Id!");
  }

  const vendor = await Vendor.findById(id);
  if (!vendor) {
    return sendResponse(res, 404, "Account not found!");
  }

  await Product.deleteMany({ "vendor.vendorId": id });
  await Shop.findOneAndDelete({ "vendor.vendorId": id });
  await Vendor.findByIdAndDelete(id);

  return sendResponse(res, 200, "Account deleted!");
});

export default {
  getVendors,
  getShops,
  getUsers,
  getOrders,
  getContacts,
  getProducts,
  getShopProducts,
  getShopDetails,
  getOrderDetails,
  getContactDetails,
  updateOrderStatus,
  updateprofile,
  approveVendor,
  rejectVendor,
  deleteVendor,
  approveShop,
  rejectShop,
  cancelShop,
  deleteShop,
  deleteUser,
  deleteVendor,
};
