import express from "express";
import { productController as product } from "../controllers/index.js";

const productRouter = express.Router();

productRouter.get("/", product.getProducts);
productRouter.get("/:id", product.getProductDetails);

export default productRouter;