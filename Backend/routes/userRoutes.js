import express from "express";
import { authController as auth, userController } from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

import orderController from "../controllers/order.controller.js";
import { createRazorPayOrder, verifyRazorPayOrder } from "../controllers/razorpay.controller.js";
import downloadInvoice from "../controllers/invoice.controller.js";
import rateLimit from "express-rate-limit";

const userRouter = express.Router();

// Rate Limiter
const rateLimiter = rateLimit({
    windowMs: 20 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many requests, try again later.",
    }
});

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
userRouter.post("/cart/add", rateLimiter, userController.addToCart);
userRouter.patch("/cart/update-quantity", rateLimiter, userController.updateQuantity);
userRouter.patch("/cart/remove-item", rateLimiter, userController.removeItem);
userRouter.delete("/cart/delete-cart", userController.deleteCart);

// Payment
userRouter.post("/payments/create-order", createRazorPayOrder);
userRouter.post("/payments/verify-order", verifyRazorPayOrder);

// Order
userRouter.post("/orders/place", orderController.placeOrder);
userRouter.get("/orders", orderController.allOrders);
userRouter.get("/orders/:id", orderController.getOrderDetails);
userRouter.get("/orders/invoice/:id", downloadInvoice);

export default userRouter;