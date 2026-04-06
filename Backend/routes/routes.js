import express from "express";
import { contactController as contact } from "../controllers/index.js";
import { logout } from "../controllers/logout.controller.js";
import { limiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/subscribe", limiter, contact.subscribeUser);
router.post("/contact", limiter, contact.contactUser);
router.post("/logout", logout);

export default router;