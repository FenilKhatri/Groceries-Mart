import User from "../models/userModel.js";
import Vendor from "../models/vendorModel.js";

const ALLOWED = new Set(["approved", "rejected"]);

const vendorStatusHelper = async (req, res, targetStatus) => {
  try {
    const id = req.params?.id;
    if (!id) return res.status(400).json({ message: "Vendor id is required!" });

    if (!ALLOWED.has(targetStatus)) {
      return res.status(400).json({ message: "Invalid status!" });
    }

    const vendor = await Vendor.findById(id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found!" });

    if (vendor.status === targetStatus) {
      return res
        .status(409)
        .json({ message: `Vendor already ${targetStatus}!` });
    }

    const adminId = req.user?.id;
    const admin = await User.findById(adminId).select("name email phone");

    vendor.status = targetStatus;
    vendor[`${targetStatus}At`] = new Date();
    vendor[`${targetStatus}By`] = {
      adminId,
      name: admin?.name || "Admin",
      email: admin?.email || "-",
      phone: admin?.phone || "-",
    };

    await vendor.save();

    return res.status(200).json({
      message: `Vendor ${targetStatus}!`,
      vendor,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};

export default vendorStatusHelper;