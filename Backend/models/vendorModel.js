import mongoose from "mongoose";
import { AdminSnapshotSchema, schemaOptions } from "./_schemas.js";

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: { type: Number, required: true },
    password: { type: String, required: true, minlength: 6 },

    role: { type: String, default: "vendor", enum: ["vendor"], index: true },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },

    approvedAt: Date,
    approvedBy: AdminSnapshotSchema,

    rejectedAt: Date,
    rejectedBy: AdminSnapshotSchema,

    deletedAt: Date,
    deletedBy: AdminSnapshotSchema,
  },
  schemaOptions,
);

export default mongoose.model("Vendor", vendorSchema);
