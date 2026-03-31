import mongoose from "mongoose";
import { VendorSnapshotSchema, schemaOptions } from "./_schemas.js";

const shopSchema = new mongoose.Schema(
  {
    vendor: { type: VendorSnapshotSchema, required: true },

    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: { type: String, required: true, trim: true },

    category: {
      type: [String],
      required: true,
      validate: [
        (arr) => Array.isArray(arr) && arr.length > 0,
        "At least one category is required",
      ],
    },

    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },

    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled", "deleted"],
      default: "pending",
      index: true,
    },

    approvedAt: Date,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    rejectedAt: Date,
    cancelledAt: Date,
  },
  schemaOptions,
);

shopSchema.index({ "vendor.vendorId": 1 }, { unique: true });
shopSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("Shop", shopSchema);
