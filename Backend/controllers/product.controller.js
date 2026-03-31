import mongoose from "mongoose";
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
      "Failed to fetch products! Server Error!",
      null,
      error.message,
    );
  }
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const formatProduct = (product) => ({
  _id: product._id,
  id: product._id,
  vendor: product.vendor,
  name: product.name,
  shortDescription: product.shortDescription,
  longDescription: product.longDescription,
  brand: product.brand,
  productCode: product.productCode,
  category: product.category,
  price: product.price,
  unit: product.unit,
  stock: product.stock,
  thumbnail: product.thumbnail,
  images: product.images,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
});

// Get products
const getProducts = asyncHandler(async (req, res) => {
  const { category, vendor } = req.query;
  const filter = {};

  if (category) {
    filter.category = String(category).trim().toLowerCase();
  }

  if (vendor) {
    filter["vendor.vendorId"] = vendor;
  }

  const products = (await Product.find(filter).lean().sort({ createdAt: -1 }));

  if (!products || products.length === 0) {
    return sendResponse(res, 200, "No products found!", { products: [] });
  }

  const formattedProducts = products.map(formatProduct);

  return sendResponse(res, 200, "Products fetched successfully!", {
    products: formattedProducts,
  });
});

// Get products details
const getProductDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return sendResponse(res, 400, "Product id is required!");
  }

  if (!isValidObjectId(id)) {
    return sendResponse(res, 400, "Invalid product id!");
  }

  const product = await Product.findById(id).lean();

  return sendResponse(res, 200, "Product details fetched successfully!", {
    product: formatProduct(product),
  });
});

export default { getProducts, getProductDetails };