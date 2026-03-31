import express from "express";
import vendorAuth from "../middlewares/vendorMiddleware.js";
import vendorOnly from "../middlewares/approvedVendorOnlyMiddleware.js";
import { vendorController as vendor } from "../controllers/index.js";
import upload from "../middlewares/uploadMemory.js";

const vendorRouter = express.Router();

// Public routes
vendorRouter.post("/register", vendor.register);
vendorRouter.post("/login", vendor.login);

// Protected routes (any logged-in vendor)
vendorRouter.use(vendorAuth);

vendorRouter.post(
  "/:id/upload/vendorShop",
  upload.single("shopImage"),
  vendor.createShop,
);

vendorRouter.get("/:id/my-shop", vendor.getMyShop);
vendorRouter.get("/:id/profile", vendor.getProfile);
vendorRouter.patch("/:id/update-password", vendor.updatePassword);
vendorRouter.put("/:id/update-profile", vendor.updateProfile);
vendorRouter.delete("/:id/delete-profile", vendor.deleteProfile);

// Approved vendor only routes
vendorRouter.use(vendorOnly);

// Product Route
vendorRouter.post(
  "/:id/add-products",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 6 },
  ]),
  vendor.addProduct,
);
vendorRouter.get("/:id/products", vendor.getProducts);
vendorRouter.get("/:vendorId/product/:productId", vendor.getShopProductDetails);
vendorRouter.patch("/:vendorId/product/:productId", vendor.updateProductDetails);

// Category Route
vendorRouter.get("/:id/shop/categories", vendor.getCategories);

// Shop Route
vendorRouter.patch(":id/shop/update-shop", vendor.updateShop);

export default vendorRouter;
