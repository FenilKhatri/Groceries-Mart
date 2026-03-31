import mongoose from "mongoose";

export const schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret) => {
      delete ret.__v;
      delete ret.password;
      return ret;
    },
  },
  toObject: { virtuals: true },
};

export const FileSchema = new mongoose.Schema(
  {
    originalname: String,
    filename: String,
    mimetype: String,
    size: Number,
    path: String,
  },
  { _id: false },
);

export const VendorSnapshotSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, required: true },
  },
  { _id: false },
);

export const AdminSnapshotSchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false },
);
