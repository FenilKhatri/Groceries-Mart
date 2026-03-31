import User from "../models/userModel.js";
import Vendor from "../models/vendorModel.js";
import { readAuthToken, verifyToken } from "./_token.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = readAuthToken(req);

    if (!token) {
      return res.status(401).json({ message: "Please login first!" });
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");
    const vendor = user
      ? null
      : await Vendor.findById(decoded.id).select("-password");

    const account = user || vendor;

    if (!account) {
      return res.status(401).json({ message: "Account not found" });
    }
    
    if (account.role === "vendor") {
      req.vendor = { id: account._id, role: account.role, account };
    } else {
      req.user = { id: account._id, role: account.role, account };
    }
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: err.message });
  }
};

export default authMiddleware;