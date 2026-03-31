import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import dns from "dns";

import userRouter from "./routes/userRoutes.js";
import vendorRouter from "./routes/vendorRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import router from "./routes/routes.js";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://groceries-mart.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// Handle preflight
app.options(/.*/, cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Disable caching
app.set("etag", false);
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// Static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRouter);
app.use("/api/vendors", vendorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api", router);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Server is running!",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        ok: false,
        message: "File too large. Please upload images under 2MB each.",
        code: err.code,
        field: err.field,
      });
    }

    return res.status(400).json({
      ok: false,
      message: err.message,
      code: err.code,
      field: err.field,
    });
  }

  console.error("❌ ERROR:", err);

  return res.status(err.statusCode || 500).json({
    ok: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
