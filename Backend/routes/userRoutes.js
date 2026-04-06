import express from "express";
import { authController as auth, userController } from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

import orderController from "../controllers/order.controller.js";
import { createRazorPayOrder, verifyRazorPayOrder } from "../controllers/razorpay.controller.js";
import downloadInvoice from "../controllers/invoice.controller.js";
import { limiter } from "../middlewares/rateLimiter.js";

const userRouter = express.Router();

// Auth
userRouter.post("/register", auth.userRegister);
userRouter.post("/login", auth.userLogin);

userRouter.use(authMiddleware);

// Profile
userRouter.get("/profile", userController.userProfile);
userRouter.put("/update-profile", userController.updateProfile);
userRouter.patch("/update-password", userController.updatePassword);
userRouter.delete("/delete-profile", userController.deleteProfile);

// Cart
userRouter.get("/cart", userController.userCart);
userRouter.post("/cart/add", limiter, userController.addToCart);
userRouter.patch("/cart/update-quantity", limiter, userController.updateQuantity);
userRouter.patch("/cart/remove-item", limiter, userController.removeItem);
userRouter.delete("/cart/delete-cart", userController.deleteCart);

// Payment
userRouter.post("/payments/create-order", createRazorPayOrder);
userRouter.post("/payments/verify-order", verifyRazorPayOrder);

// Order
userRouter.post("/orders/place", orderController.placeOrder);
userRouter.get("/orders", orderController.allOrders);
userRouter.get("/orders/:id", orderController.getOrderDetails);
userRouter.get("/orders/invoice/:id", limiter, downloadInvoice);

export default userRouter;