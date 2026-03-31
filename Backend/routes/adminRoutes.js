import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import { adminController as admin } from "../controllers/index.js";
import { authController as auth } from "../controllers/index.js";

const adminRouter = express.Router();

adminRouter.post("/login", auth.userLogin)

adminRouter.use(authMiddleware, adminMiddleware);

// Admin profile update
adminRouter.patch("/update-profile", admin.updateprofile);

// Vendor Routes
adminRouter.get("/vendors", admin.getVendors);
adminRouter.patch("/vendors/:id/approve", admin.approveVendor);
adminRouter.patch("/vendors/:id/reject", admin.rejectVendor);
adminRouter.patch("/vendors/:id/delete", admin.deleteVendor);

// Shop Routes
adminRouter.get("/shops", admin.getShops);
adminRouter.get("/shops/:id", admin.getShopDetails);
adminRouter.patch("/shops/:id/approve", admin.approveShop);
adminRouter.patch("/shops/:id/reject", admin.rejectShop);
adminRouter.patch("/shops/:id/cancel", admin.cancelShop);
adminRouter.delete("/shops/:id/delete", admin.deleteShop);
adminRouter.get("/shops/:id/products", admin.getShopProducts);

// Product Routes
adminRouter.get("/products", admin.getProducts);

// User Routes
adminRouter.get("/users", admin.getUsers);

// Orders
adminRouter.get("/orders", admin.getOrders);
adminRouter.get("/orders/:id", admin.getOrderDetails);
adminRouter.put("/orders/:id/update-status", admin.updateOrderStatus);

// Contacts
adminRouter.get("/contacts", admin.getContacts);
adminRouter.get("/contact/:id", admin.getContactDetails);

// Delete
adminRouter.delete("/users/delete-profile", admin.deleteUser);
adminRouter.delete("/vendors/delete-profile", admin.deleteVendor);

export default adminRouter;