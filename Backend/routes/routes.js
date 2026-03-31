import express from "express";
import { contactController as contact } from "../controllers/index.js";
import { logout } from "../controllers/logout.controller.js";

const router = express.Router();

router.post("/subscribe", contact.subscribeUser);
router.post("/contact", contact.contactUser);
router.post("/logout", logout);

export default router;