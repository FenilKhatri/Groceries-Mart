import mongoose from "mongoose";
import { VendorSnapshotSchema, schemaOptions } from "./_schemas.js";

const productSchema = new mongoose.Schema(
  {
    vendor: { type: VendorSnapshotSchema, required: true },

    name: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    longDescription: { type: String, default: "", trim: true },
    brand: { type: String, default: "", trim: true },
    productCode: { type: String, default: "", trim: true },

    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    price: { type: Number, required: true, min: 0, default: 0 },
    unit: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, min: 0 },

    thumbnail: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
  },
  schemaOptions,
);

productSchema.index(
  { "vendor.vendorId": 1, productCode: 1 },
  {
    unique: true,
    partialFilterExpression: { productCode: { $type: "string", $ne: "" } },
  },
);

export default mongoose.model("Product", productSchema);
