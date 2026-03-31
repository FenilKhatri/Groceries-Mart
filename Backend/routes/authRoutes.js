import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { authController as auth } from "../controllers/index.js";

const authRouter = express.Router();

authRouter.get("/me", authMiddleware, auth.me);

export default authRouter;