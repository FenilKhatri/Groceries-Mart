import Vendor from "../models/vendorModel.js";
import { readAuthToken, verifyToken } from "./_token.js";

const vendorAuth = async (req, res, next) => {
  try {
    const token = readAuthToken(req);
    if (!token) {
      return res.status(401).json({ message: "Please login first!" });
    }

    const decoded = verifyToken(token);

    const vendorId = decoded.id || decoded._id;
    if (!vendorId) {
      return res.status(401).json({ message: "Invalid token payload!" });
    }

    const vendor = await Vendor.findById(vendorId).select("-password");
    if (!vendor) {
      return res
        .status(401)
        .json({ message: "Vendor not found!", where: "VendorAuth" });
    }

    // enforce vendor role from DB (more secure than decoded.role)
    if (vendor.role !== "vendor") {
      return res.status(403).json({ message: "Access denied! Vendor only." });
    }

    req.vendor = vendor;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token!", error: error.message });
  }
};

export default vendorAuth;