import Vendor from "../models/vendorModel.js";
import Shop from "../models/shopModel.js";
import Product from "../models/productModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import sendShopCreatedEmail from "../helper/sendAccountMail.js";
import { uploadBuffer } from "../utils/cloudinaryUpload.js";
import { CLOUDINARY_FOLDERS } from "../constants/cloudinaryFolders.js";

// Handler functions
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

const normalizeEmail = (email) =>
  String(email || "")
    .trim()
    .toLowerCase();
const normalizePhone = (phone) => String(phone || "").trim();
const normalizeText = (value) => String(value || "").trim();

const emailRegex = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.+_-]+\.[A-Za-z]{2,}$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex =
  /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(){}[\].+\-]).{6,}$/;

const validateVendorRegisterInput = ({ name, email, phone, password }) => {
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
    return "Password must be 6 chars long!";
  }

  return null;
};

const getVendorIdFromReq = (req) => req.vendor?.id || req.vendor?._id;

const findVendorOrFail = async (req, res) => {
  const vendorId = getVendorIdFromReq(req);

  if (!vendorId) {
    sendResponse(res, 400, "VendorId required!");
    return null;
  }

  if (!validateObjectIdOrFail(res, vendorId, "vendorId")) return null;

  const vendor = await Vendor.findById(vendorId);
  if (!vendor) {
    sendResponse(res, 404, "Vendor not found!");
    return null;
  }

  return vendor;
};

const findVendorShopOrFail = async (req, res, selectFields = "") => {
  const vendorId = getVendorIdFromReq(req);

  if (!vendorId) {
    sendResponse(res, 401, "Vendor not authenticated!");
    return null;
  }

  let query = Shop.findOne({ "vendor.vendorId": vendorId });
  if (selectFields) query = query.select(selectFields);

  const shop = await query;
  if (!shop) {
    sendResponse(res, 404, "Shop not found!");
    return null;
  }

  return shop;
};

const requireApprovedShopOrFail = (res, shop, message = null) => {
  if (shop.status !== "approved") {
    sendResponse(
      res,
      403,
      message || `Shop is ${shop.status}. Only approved shop can add products!`,
    );
    return false;
  }
  return true;
};

const buildVendorToken = (vendor) =>
  jwt.sign(
    {
      id: vendor._id,
      role: vendor.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    },
  );

const parseCategoryArray = (category) => {
  let parsed = category;

  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      parsed = [parsed];
    }
  }

  if (!Array.isArray(parsed)) parsed = [parsed];

  return parsed
    .map((item) => String(item).trim().toLowerCase())
    .filter(Boolean);
};

const validateImageFile = (file, { required = true } = {}) => {
  if (required && !file) return "No file uploaded!";
  if (!file) return null;

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowed.includes(file.mimetype)) {
    return "Only JPG, PNG, WEBP allowed!";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "Image must be <= 5MB!";
  }

  return null;
};

const validateImagesArray = (files, min = 1, max = 6) => {
  if (!Array.isArray(files) || files.length < min || files.length > max) {
    return `At least ${min} and maxium ${max} images are allowed!`;
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  for (const file of files) {
    if (!allowed.includes(file.mimetype)) {
      return "Only JPG, PNG, WEBP allowed!";
    }

    if (file.size > 5 * 1024 * 1024) {
      return "Each image must be <= 5MB!";
    }
  }

  return null;
};

const SHOP_ALLOWED_CATEGORIES = [
  "fruits",
  "vegetables",
  "dairy products",
  "food items",
  "cooking essentials",
  "snacks",
  "beverages",
  "bakery",
  "grains",
  "spices",
];

const validateCreateShopInput = (payload) => {
  const {
    name,
    description,
    email,
    phone,
    address,
    pincode,
    category,
    city,
    file,
  } = payload;

  if (
    !name ||
    !description ||
    !email ||
    !phone ||
    !address ||
    !pincode ||
    !city ||
    !Array.isArray(category) ||
    category.length === 0
  ) {
    return "All fields are required!";
  }

  const fileError = validateImageFile(file, { required: true });
  if (fileError) return fileError;

  if (!emailRegex.test(email)) {
    return "Invalid Email!";
  }

  if (!phoneRegex.test(phone)) {
    return "Invalid Phone!";
  }

  if (name.length < 3 || name.length > 60) {
    return "Shop name must be 3-60 chars long!";
  }

  if (description.length < 20 || description.length > 300) {
    return "Description must be 20-300 chars long!";
  }

  if (address.length < 10 || address.length > 200) {
    return "Address must be 10-200 chars long!";
  }

  if (!/^\d{6}$/.test(pincode)) {
    return "Invalid pincode!";
  }

  const invalidCategory = category.find(
    (item) => !SHOP_ALLOWED_CATEGORIES.includes(item),
  );

  if (invalidCategory) {
    return `Category not matched: ${invalidCategory}`;
  }

  return null;
};

const validateProductInput = ({
  name,
  shortDescription,
  category,
  unit,
  price,
  stock,
  images,
  thumbnail,
}) => {
  if (
    !name ||
    !shortDescription ||
    !category ||
    !unit ||
    price === undefined ||
    stock === undefined
  ) {
    return "All fields are required!";
  }

  if (name.length < 2 || name.length > 80) {
    return "Name must be 2 to 80 chars long!";
  }

  if (shortDescription.length < 10 || shortDescription.length > 100) {
    return "Short Description must be 10 to 100 chars long!";
  }

  if (!Number.isFinite(price) || price <= 0) {
    return "Price must be valid number and greater than 0!";
  }

  if (!Number.isFinite(stock) || stock <= 0) {
    return "Stock must be valid number and greater than 0!";
  }

  const imagesError = validateImagesArray(images, 1, 6);
  if (imagesError) return imagesError;

  const thumbnailError = validateImageFile(thumbnail, { required: true });
  if (thumbnailError) return thumbnailError;

  return null;
};

const uploadManyImages = async (files, folder) =>
  Promise.all(
    files.map((file) =>
      uploadBuffer({
        buffer: file.buffer,
        folder,
      }),
    ),
  );

// Auth controller
const register = asyncHandler(async (req, res) => {
  const name = normalizeText(req.body?.name);
  const email = normalizeEmail(req.body?.email);
  const phone = normalizePhone(req.body?.phone);
  const password = String(req.body?.password || "");

  const validationError = validateVendorRegisterInput({
    name,
    email,
    phone,
    password,
  });

  if (validationError) {
    return sendResponse(res, 400, validationError);
  }

  const vendorExists = await Vendor.findOne({ email });
  if (vendorExists) {
    return sendResponse(res, 400, "Vendor already exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newVendor = await Vendor.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: "vendor",
  });

  const token = buildVendorToken(newVendor);

  return sendResponse(
    res,
    201,
    "Vendor registered successfully! Wait for approval...",
    {
      vendor: {
        name: newVendor.name,
        email: newVendor.email,
        phone: newVendor.phone,
        role: newVendor.role,
      },
    },
  );
});

const login = asyncHandler(async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || "");

  if (!email || !password) {
    return sendResponse(res, 400, "All fields are required!");
  }

  const vendor = await Vendor.findOne({ email });
  if (!vendor) {
    return sendResponse(res, 400, "Vendor does not exist!");
  }

  const matched = await bcrypt.compare(password, vendor.password);
  if (!matched) {
    return sendResponse(res, 400, "Password is wrong!");
  }

  const token = buildVendorToken(vendor);
  const isProd = process.env.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };

  res.cookie("token", token, cookieOptions);

  const payload = {
    _id: vendor._id,
    token,
    vendor: {
      name: vendor.name,
      email: vendor.email,
      phone: vendor.phone,
      role: vendor.role,
      status: vendor.status,
    },
  };

  if (vendor.status === "pending") {
    return sendResponse(
      res,
      200,
      "LoggedIn successful! Your request is pending.",
      payload,
    );
  }

  if (vendor.status === "rejected") {
    return sendResponse(
      res,
      200,
      "LoggedIn successful! Your request was rejected.",
      payload,
    );
  }

  return sendResponse(res, 200, "LoggedIn successful!", payload);
});

// Shop Controller
const createShop = asyncHandler(async (req, res) => {
  let { name, description, email, phone, category, address, city, pincode } =
    req.body || {};

  name = normalizeText(name);
  description = normalizeText(description);
  email = normalizeEmail(email);
  phone = normalizePhone(phone);
  address = normalizeText(address);
  city = normalizeText(city);
  pincode = normalizePhone(pincode);
  category = parseCategoryArray(category);

  const validationError = validateCreateShopInput({
    name,
    description,
    email,
    phone,
    category,
    address,
    city,
    pincode,
    file: req.file,
  });

  if (validationError) {
    return sendResponse(res, 400, validationError);
  }

  const existingByEmail = await Shop.findOne({ email });
  if (existingByEmail) {
    return sendResponse(
      res,
      400,
      "Vendor's shop already exists! Please check your registered mail...",
    );
  }

  const vendorId = getVendorIdFromReq(req);
  const existingByVendor = await Shop.findOne({
    "vendor.vendorId": vendorId,
  });

  if (existingByVendor) {
    return sendResponse(res, 400, "You already created a shop!");
  }

  const uploaded = await uploadBuffer({
    buffer: req.file.buffer,
    folder: CLOUDINARY_FOLDERS.SHOP,
  });

  const shop = await Shop.create({
    vendor: {
      vendorId: req.vendor._id,
      name: req.vendor.name,
      email: req.vendor.email,
      phone: req.vendor.phone,
      status: req.vendor.status,
    },
    name,
    description,
    email,
    phone,
    category,
    address,
    city,
    pincode,
    image: {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    },
    status: "pending",
  });

  await sendShopCreatedEmail({
    to: shop.email,
    title: "Shop created - Pending approval",
    vendorName: req.vendor.name,
    vendorEmail: req.vendor.email,
    vendorPhone: req.vendor.phone,
    shopName: shop.name,
    description: shop.description,
    shopEmail: shop.email,
    phone: shop.phone,
    category: shop.category,
    address: shop.address,
    city: shop.city,
    pincode: shop.pincode,
    status: shop.status,
  });

  return sendResponse(
    res,
    201,
    "Shop created successfully! Wait for approval...",
    { shop },
  );
});

const getMyShop = asyncHandler(async (req, res) => {
  const vendorId = getVendorIdFromReq(req);

  const shop = await Shop.findOne({
    "vendor.vendorId": vendorId,
  });

  if (!shop) {
    return sendResponse(res, 404, "No shop found");
  }

  return sendResponse(res, 200, "Shop fetched successfully!", {
    vendorStatus: req.vendor.status,
    shop,
  });
});

const updateShop = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const shop = await Shop.findOne({
    "vendor.vendorId": id,
  });

  if (!shop) {
    return sendResponse(res, 404, "No shop found");
  }

  const { name } = req.body;
});

const getCategories = asyncHandler(async (req, res) => {
  const shop = await findVendorShopOrFail(req, res, "category status");
  if (!shop) return;

  if (
    !requireApprovedShopOrFail(
      res,
      shop,
      `Shop is ${shop.status}. Only approved shop can add products!`,
    )
  ) {
    return;
  }

  return sendResponse(res, 200, "Categories fetched successfully!", {
    categories: shop.category || [],
  });
});

// Add Product
const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    shortDescription,
    longDescription = "",
    brand = "",
    productCode = "",
    category,
    price,
    unit,
    stock,
  } = req.body || {};

  const images = req.files?.images || [];
  const thumbnail = req.files?.thumbnail?.[0];

  const cleanName = normalizeText(name);
  const cleanShortDescription = normalizeText(shortDescription);
  const cleanLongDescription = normalizeText(longDescription);
  const cleanBrand = normalizeText(brand);
  const cleanCategory = normalizeText(category).toLowerCase();
  const cleanUnit = normalizeText(unit);
  const cleanProductCode = normalizeText(productCode);
  const cleanPrice = Number(price);
  const cleanStock = Number(stock);

  const validationError = validateProductInput({
    name: cleanName,
    shortDescription: cleanShortDescription,
    category: cleanCategory,
    unit: cleanUnit,
    price: cleanPrice,
    stock: cleanStock,
    images,
    thumbnail,
  });

  if (validationError) {
    return sendResponse(res, 400, validationError);
  }

  const vendorId = getVendorIdFromReq(req);
  if (!vendorId) {
    return sendResponse(res, 401, "Vendor not authenticated!");
  }

  const shop = await findVendorShopOrFail(req, res, "category status vendor");
  if (!shop) return;

  if (
    !requireApprovedShopOrFail(
      res,
      shop,
      `Your shop request is ${shop.status}, Only approved shops can add products!`,
    )
  ) {
    return;
  }

  const allowedCategories = (shop.category || []).map((item) =>
    String(item).trim().toLowerCase(),
  );

  if (!allowedCategories.includes(cleanCategory)) {
    return sendResponse(
      res,
      400,
      `You can add only ${shop.category.join(", ")}`,
    );
  }

  if (cleanProductCode) {
    const existingProduct = await Product.exists({
      "vendor.vendorId": vendorId,
      productCode: cleanProductCode,
    });

    if (existingProduct) {
      return sendResponse(
        res,
        400,
        "Product code already exists for this vendor!",
      );
    }
  }

  const uploadedImages = await uploadManyImages(
    images,
    CLOUDINARY_FOLDERS.PRODUCT_IMAGES,
  );

  const uploadedThumb = await uploadBuffer({
    buffer: thumbnail.buffer,
    folder: CLOUDINARY_FOLDERS.THUMBNAIL,
  });

  const product = await Product.create({
    vendor: {
      vendorId: shop.vendor.vendorId,
      name: shop.vendor.name,
      email: shop.vendor.email,
      phone: shop.vendor.phone,
      status: shop.vendor.status,
    },
    name: cleanName,
    shortDescription: cleanShortDescription,
    longDescription: cleanLongDescription,
    brand: cleanBrand,
    productCode: cleanProductCode,
    category: cleanCategory,
    price: cleanPrice,
    unit: cleanUnit,
    stock: cleanStock,
    images: uploadedImages.map((img) => ({
      url: img.secure_url,
      public_id: img.public_id,
    })),
    thumbnail: {
      url: uploadedThumb.secure_url,
      public_id: uploadedThumb.public_id,
    },
  });

  return sendResponse(res, 201, "Product added successfully!", { product });
});

// Get products
const getProducts = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid vendor ID!" });
  }

  const products = await Product.find({ "vendor.vendorId": id });
  if (!products || products.length === 0) return res.status(404).json({ message: "No products found!" });

  return res.status(200).json({ message: "Products fetched!", products });
})

const getShopProductDetails = asyncHandler(async (req, res) => {
  const { vendorId, productId } = req?.params;
  if (!mongoose.Types.ObjectId.isValid(vendorId) || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid objectId!" });
  }

  const product = await Product.findById(productId);
  if (!product || product.length === 0) return res.status(404).json({ message: "No products found!" });

  return res.status(200).json({ message: "Product fetched!", product });
})

const updateProductDetails = asyncHandler(async (req, res) => {
  const { vendorId, productId } = req?.params;
  if (!mongoose.Types.ObjectId.isValid(vendorId) || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid objectId!" });
  }

  const product = await Product.findById(productId);
  if (!product || product.length === 0) return res.status(404).json({ message: "No products found!" });

  const { name, shortDescription, longDescription, brand, productCode, price, stock } = req.body;
  if (!name || !shortDescription || !longDescription || !brand || !productCode || !price || !stock) return res.status(400).json({ message: "All fields are required!" });

  product.name = name;
  product.shortDescription = shortDescription;
  product.longDescription = longDescription;
  product.brand = brand;
  product.productCode = productCode;
  product.price = price;
  product.stock = stock;
  await product.save();

  return res.status(200).json({ message: "Product Details updated!", product });
})

// Profile
const getProfile = asyncHandler(async (req, res) => {
  const vendor = await findVendorOrFail(req, res);
  if (!vendor) return;

  return sendResponse(res, 200, "Profile fetched successfully!", { vendor });
});

// Update Profile
const updateProfile = asyncHandler(async (req, res) => {
  const vendor = await findVendorOrFail(req, res);
  if (!vendor) return;

  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ message: "All fields are required!" });

  const emailRegex = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.+_-]+\.[A-Za-z]{2,}$/;
  const phoneRegex = /^\d{10}$/;

  if (!emailRegex.test(email))
    return res.status(400).json({ message: `Invalid email!` });
  if (!phoneRegex.test(phone))
    return res.status(400).json({ message: `Invalid phone!` });

  vendor.name = name;
  vendor.email = email;
  vendor.phone = phone;
  await vendor.save();
  return res.status(200).json({ message: "Vendor profile updated!", vendor });
});

// Update Password
const updatePassword = asyncHandler(async (req, res) => {
  const vendor = await findVendorOrFail(req, res);
  if (!vendor) return;

  const { password } = req.body;
  if (!password)
    return res.status(400).json({ message: "Password must be required!" });

  const passwordRegex = /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(){}[\].+\-]).{6,}$/;;
  if(!passwordRegex.test(password)) return res.status(400).json({ message: "Weak credentials!" });

  const hashedPassword = await bcrypt.hash(password, 10);

  vendor.password = hashedPassword;
  await vendor.save();
  return res.status(200).json({ message: "Password updated successfully!", vendor });
});

// Delete Profile
const deleteProfile = asyncHandler(async (req, res) => {
  const vendor = await findVendorOrFail(req, res);
  if (!vendor) return;

  await Product.deleteMany({ "vendor.vendorId": vendor._id });
  await Shop.findOneAndDelete({ "vendor.vendorId": vendor._id })
  await Vendor.findByIdAndDelete(vendor._id);

  const isProd = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });

  return res.status(200).json({ message: "Vendor Deleted!" });
});

export default {
  register,
  login,
  createShop,
  addProduct,
  deleteProfile,
  updateShop,
  updateProfile,
  updatePassword,
  getProfile,
  getMyShop,
  getCategories,
  getProducts,
  getShopProductDetails,
  updateProductDetails,
};
