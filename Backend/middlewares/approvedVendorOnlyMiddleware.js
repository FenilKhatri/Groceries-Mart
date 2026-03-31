// middlewares/approvedVendorOnlyMiddleware.js
const vendorOnly = (req, res, next) => {
  const vendor = req.vendor;

  if (!vendor?._id) return res.status(401).json({ message: "Unauthorized" });

  if (vendor.status !== "approved") return res.status(403).json({ message: "Vendor not approved!" });

  next();
};

export default vendorOnly;
