import PDFDocument from "pdfkit";
import Order from "../models/orderModel.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COLORS = {
  brand: "#0f766e",
  brandDark: "#115e59",
  accent: "#f59e0b",
  text: "#0f172a",
  muted: "#64748b",
  light: "#94a3b8",
  line: "#e2e8f0",
  soft: "#f8fafc",
  white: "#ffffff",
  successBg: "#dcfce7",
  successText: "#166534",
  warnBg: "#fef3c7",
  warnText: "#92400e",
  dangerBg: "#fee2e2",
  dangerText: "#991b1b",
  infoBg: "#dbeafe",
  infoText: "#1d4ed8",
};

const PAGE = {
  marginX: 42,
  headerH: 84,
  footerH: 40,
  topGap: 18,
};

const formatCurrency = (value = 0) => `Rs. ${Number(value || 0).toFixed(2)}`;

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatDateTime = (date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatOrderStatus = (status = "placed") => {
  const map = {
    placed: "Placed",
    confirmed: "Confirmed",
    packed: "Packed",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return map[status] || "Placed";
};

const getStatusStyle = (status = "") => {
  switch (status) {
    case "paid":
    case "delivered":
      return { bg: COLORS.successBg, text: COLORS.successText };
    case "confirmed":
    case "packed":
    case "out_for_delivery":
      return { bg: COLORS.infoBg, text: COLORS.infoText };
    case "pending":
      return { bg: COLORS.warnBg, text: COLORS.warnText };
    case "failed":
    case "cancelled":
      return { bg: COLORS.dangerBg, text: COLORS.dangerText };
    default:
      return { bg: COLORS.soft, text: COLORS.text };
  }
};

const getPageTop = () => PAGE.headerH + PAGE.topGap;
const getPageBottom = (doc) => doc.page.height - PAGE.footerH - 18;

const logoPath = path.resolve(__dirname, "../public/Logo.webp");

const buildAddress = (address = {}) => {
  return [
    address.name,
    address.address,
    address.city,
    address.pincode ? `Pincode: ${address.pincode}` : "",
    address.phone ? `Phone: ${address.phone}` : "",
  ]
    .filter(Boolean)
    .join("\n");
};

const drawRoundedCard = (doc, x, y, w, h, radius = 14) => {
  doc.roundedRect(x, y, w, h, radius).fillAndStroke(COLORS.white, COLORS.line);
};

const drawSectionTitle = (doc, x, y, title, subtitle = "") => {
  doc
    .fillColor(COLORS.text)
    .font("Helvetica-Bold")
    .fontSize(22)
    .text(title, x, y);

  if (subtitle) {
    doc
      .fillColor(COLORS.muted)
      .font("Helvetica")
      .fontSize(10)
      .text(subtitle, x, y + 30);
  }
};

const drawMiniIconBadge = (
  doc,
  x,
  y,
  label,
  value,
  style,
  iconText = "•",
  width = 160,
) => {
  doc
    .fillColor(COLORS.white)
    .font("Helvetica-Bold")
    .fontSize(7)
    .text(iconText, x + 10.5, y + 11.2, { width: 7, align: "center" });

  doc
    .fillColor(style.text)
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(`${label}: ${value}`, x + 28, y + 9, {
      width: width - 36,
      align: "left",
    });
};

const drawInfoCard = (doc, x, y, w, h, title) => {
  drawRoundedCard(doc, x, y, w, h, 14);
  doc
    .fillColor(COLORS.muted)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text(title.toUpperCase(), x + 14, y + 14);
};

const drawLabeledValue = (doc, x, y, label, value, totalWidth) => {
  doc
    .fillColor(COLORS.muted)
    .font("Helvetica")
    .fontSize(10)
    .text(label, x, y, { width: totalWidth / 2 });

  doc
    .fillColor(COLORS.text)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text(value || "-", x + totalWidth / 2, y, {
      width: totalWidth / 2,
      align: "right",
    });
};

const drawHeader = (doc, order) => {
  const pageWidth = doc.page.width;
  const rightX = pageWidth - PAGE.marginX - 170;

  doc.save();
  doc.rect(0, 0, pageWidth, PAGE.headerH).fill(COLORS.white);
  doc
    .moveTo(PAGE.marginX, PAGE.headerH)
    .lineTo(pageWidth - PAGE.marginX, PAGE.headerH)
    .strokeColor(COLORS.line)
    .lineWidth(1)
    .stroke();
  doc.restore();

  try {
    doc.image(logoPath, PAGE.marginX, 20, {
      fit: [42, 42],
      align: "left",
      valign: "center",
    });
  } catch {
    doc.roundedRect(PAGE.marginX, 20, 42, 42, 10).fill(COLORS.brand);
    doc
      .fillColor(COLORS.white)
      .font("Helvetica-Bold")
      .fontSize(18)
      .text("G", PAGE.marginX, 33, { width: 42, align: "center" });
  }

  doc
    .fillColor(COLORS.text)
    .font("Helvetica-Bold")
    .fontSize(18)
    .text("Groceries Mart", PAGE.marginX + 54, 23);

  doc
    .fillColor(COLORS.muted)
    .font("Helvetica")
    .fontSize(9.5)
    .text("Premium grocery delivery invoice", PAGE.marginX + 54, 47);

  doc
    .fillColor(COLORS.muted)
    .font("Helvetica")
    .fontSize(9.5)
    .text(`Invoice Date: ${formatDate(order.createdAt)}`, rightX, 26, {
      width: 170,
      align: "right",
    })
    .text(
      `Order Ref: #${String(order._id).slice(-8).toUpperCase()}`,
      rightX,
      44,
      {
        width: 170,
        align: "right",
      },
    );
};

const drawFooter = (doc, pageNumber, totalPages) => {
  const pageWidth = doc.page.width;
  const y = doc.page.height - PAGE.footerH + 8;

  doc
    .moveTo(PAGE.marginX, doc.page.height - PAGE.footerH)
    .lineTo(pageWidth - PAGE.marginX, doc.page.height - PAGE.footerH)
    .strokeColor(COLORS.line)
    .lineWidth(1)
    .stroke();

  doc
    .fillColor(COLORS.muted)
    .font("Helvetica")
    .fontSize(8)
    .text(
      `Copyright ${new Date().getFullYear()} Groceries Mart. All rights reserved.`,
      PAGE.marginX,
      y,
      { width: 280, align: "left" },
    );

  doc
    .fillColor(COLORS.muted)
    .font("Helvetica")
    .fontSize(8)
    .text(
      `Page ${pageNumber} of ${totalPages}`,
      pageWidth - PAGE.marginX - 100,
      y,
      {
        width: 100,
        align: "right",
      },
    );
};

const addPageWithFrame = (doc, order, state) => {
  doc.addPage({ size: "A4", margin: 0 });
  state.pageNumber += 1;
  state.cursorY = getPageTop();
  drawHeader(doc, order);
};

const drawItemsTableHeader = (doc, y) => {
  const x = PAGE.marginX;
  const width = doc.page.width - PAGE.marginX * 2;

  doc.roundedRect(x, y, width, 36, 12).fill(COLORS.brandDark);

  doc
    .fillColor(COLORS.white)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text("Product", x + 16, y + 12, { width: 250 })
    .text("Qty", x + 285, y + 12, { width: 40, align: "center" })
    .text("Unit Price", x + 345, y + 12, { width: 90, align: "right" })
    .text("Amount", x + 445, y + 12, { width: 60, align: "right" });

  return y + 46;
};

const drawItemsRow = (doc, item, rowY, index) => {
  const x = PAGE.marginX;
  const width = doc.page.width - PAGE.marginX * 2;

  const qty = item.quantity || 1;
  const price = item.price || item.product?.price || 0;
  const total = qty * price;
  const productName = item.product?.name || "Product";

  const textHeight = doc.heightOfString(productName, {
    width: 250,
    lineGap: 2,
  });

  const rowHeight = Math.max(44, textHeight + 20);
  const rowBg = index % 2 === 0 ? "#fcfcfd" : "#f8fafc";

  doc.roundedRect(x, rowY, width, rowHeight, 10).fill(rowBg);

  doc
    .fillColor(COLORS.text)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text(productName, x + 16, rowY + 11, {
      width: 250,
      lineGap: 2,
    });

  doc
    .fillColor(COLORS.muted)
    .font("Helvetica")
    .fontSize(10)
    .text(String(qty), x + 285, rowY + rowHeight / 2 - 5, {
      width: 40,
      align: "center",
    })
    .text(formatCurrency(price), x + 345, rowY + rowHeight / 2 - 5, {
      width: 90,
      align: "right",
    });

  doc
    .fillColor(COLORS.text)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text(formatCurrency(total), x + 445, rowY + rowHeight / 2 - 5, {
      width: 70,
      align: "right",
    });

  return { rowHeight, total };
};

const ensureSpace = (
  doc,
  order,
  state,
  neededHeight,
  redrawItemsHeader = false,
) => {
  if (state.cursorY + neededHeight <= getPageBottom(doc)) return;

  addPageWithFrame(doc, order, state);

  if (redrawItemsHeader) {
    doc
      .fillColor(COLORS.text)
      .font("Helvetica-Bold")
      .fontSize(16)
      .text("Order Items (continued)", PAGE.marginX, state.cursorY);

    state.cursorY += 28;
    state.cursorY = drawItemsTableHeader(doc, state.cursorY);
  }
};

const downloadInvoice = async (req, res) => {
  let doc;

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid orderId!" });
    }

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.product", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    const currentUserId = req.user?.id || req.user?._id;
    const isAdmin = req.user?.role === "admin";
    const isOwner = order.user?._id?.toString() === currentUserId?.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Access denied!" });
    }

    doc = new PDFDocument({
      size: "A4",
      margin: 0,
      bufferPages: true,
      autoFirstPage: true,
    });

    const fileName = `invoice-${order._id}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    doc.on("error", (err) => {
      console.error("PDFKit error:", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Failed to generate invoice PDF" });
      } else {
        res.destroy(err);
      }
    });

    doc.pipe(res);

    const state = {
      pageNumber: 1,
      cursorY: getPageTop(),
    };

    drawHeader(doc, order);

    // PAGE 1
    drawSectionTitle(
      doc,
      PAGE.marginX,
      state.cursorY,
      "Invoice",
      "Customer details, shipping and billing information",
    );
    state.cursorY += 58;

    const paymentStyle = getStatusStyle(order.paymentStatus || "paid");
    const statusStyle = getStatusStyle(order.orderStatus || "placed");

    drawMiniIconBadge(
      doc,
      PAGE.marginX,
      state.cursorY,
      "Payment",
      String(order.paymentStatus || "paid").toUpperCase(),
      paymentStyle,
      160,
    );

    drawMiniIconBadge(
      doc,
      PAGE.marginX + 176,
      state.cursorY,
      "Status",
      formatOrderStatus(order.orderStatus),
      statusStyle,
      170,
    );

    state.cursorY += 42;

    const customerAddressText = buildAddress({
      name: order.user?.name,
      address: order.shippingAddress?.address,
      city: order.shippingAddress?.city,
      pincode: order.shippingAddress?.pincode,
      phone: order.shippingAddress?.phone,
    });

    doc.font("Helvetica").fontSize(10);
    const customerTextHeight = doc.heightOfString(customerAddressText, {
      width: 220,
      lineGap: 2,
    });

    const customerCardHeight = Math.max(155, 64 + customerTextHeight + 24);

    drawInfoCard(
      doc,
      PAGE.marginX,
      state.cursorY,
      255,
      customerCardHeight,
      "Customer Details",
    );
    drawInfoCard(
      doc,
      PAGE.marginX + 273,
      state.cursorY,
      255,
      customerCardHeight,
      "Order Summary",
    );

    doc
      .fillColor(COLORS.text)
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(order.user?.name || "N/A", PAGE.marginX + 16, state.cursorY + 36);

    doc
      .fillColor(COLORS.muted)
      .font("Helvetica")
      .fontSize(10)
      .text(order.user?.email || "N/A", PAGE.marginX + 16, state.cursorY + 60, {
        width: 220,
      })
      .text(customerAddressText, PAGE.marginX + 16, state.cursorY + 82, {
        width: 220,
        lineGap: 2,
      });

    drawLabeledValue(
      doc,
      PAGE.marginX + 290,
      state.cursorY + 38,
      "Order Date",
      formatDateTime(order.createdAt),
      205,
    );
    drawLabeledValue(
      doc,
      PAGE.marginX + 290,
      state.cursorY + 64,
      "Payment Method",
      order.paymentMethod || "Razorpay",
      205,
    );
    drawLabeledValue(
      doc,
      PAGE.marginX + 290,
      state.cursorY + 90,
      "Delivery Status",
      formatOrderStatus(order.orderStatus),
      205,
    );
    drawLabeledValue(
      doc,
      PAGE.marginX + 290,
      state.cursorY + 116,
      "Razorpay ID",
      order.razorpay?.orderId ? `#${order.razorpay.orderId.slice(6)}` : "-",
      205,
    );

    state.cursorY += customerCardHeight + 20;

    const shippingText = buildAddress(order.shippingAddress);
    const billingText = buildAddress(order.shippingAddress);

    const shippingHeight = Math.max(
      120,
      doc.heightOfString(shippingText, { width: 220, lineGap: 2 }) + 54,
    );
    const billingHeight = Math.max(
      120,
      doc.heightOfString(billingText, { width: 220, lineGap: 2 }) + 54,
    );
    const cardHeight = Math.max(shippingHeight, billingHeight);

    drawInfoCard(
      doc,
      PAGE.marginX,
      state.cursorY,
      255,
      cardHeight,
      "Shipping Address",
    );
    drawInfoCard(
      doc,
      PAGE.marginX + 273,
      state.cursorY,
      255,
      cardHeight,
      "Billing Address",
    );

    doc
      .fillColor(COLORS.text)
      .font("Helvetica")
      .fontSize(10)
      .text(shippingText, PAGE.marginX + 16, state.cursorY + 38, {
        width: 220,
        lineGap: 2,
      });

    doc
      .fillColor(COLORS.text)
      .font("Helvetica")
      .fontSize(10)
      .text(billingText, PAGE.marginX + 289, state.cursorY + 38, {
        width: 220,
        lineGap: 2,
      });

    // PAGE 2 FOR ITEMS
    addPageWithFrame(doc, order, state);

    drawSectionTitle(
      doc,
      PAGE.marginX,
      state.cursorY,
      "Order Items",
      "Detailed breakdown of all purchased products",
    );
    state.cursorY += 58;

    state.cursorY = drawItemsTableHeader(doc, state.cursorY);

    let grandTotal = 0;

    for (let i = 0; i < order.items.length; i++) {
      const productName = order.items[i]?.product?.name || "Product";
      const testHeight = Math.max(
        44,
        doc.heightOfString(productName, { width: 250, lineGap: 2 }) + 20,
      );

      ensureSpace(doc, order, state, testHeight + 10, true);

      const { rowHeight, total } = drawItemsRow(
        doc,
        order.items[i],
        state.cursorY,
        i,
      );
      grandTotal += total;
      state.cursorY += rowHeight + 8;
    }

    ensureSpace(doc, order, state, 200);

    const summaryX = PAGE.marginX + 285;
    const summaryY = state.cursorY + 8;
    const summaryW = 243;

    drawInfoCard(doc, summaryX, summaryY, summaryW, 138, "Payment Summary");

    drawLabeledValue(
      doc,
      summaryX + 16,
      summaryY + 40,
      "Subtotal",
      formatCurrency(grandTotal),
      210,
    );
    drawLabeledValue(
      doc,
      summaryX + 16,
      summaryY + 64,
      "Delivery",
      formatCurrency(0),
      210,
    );
    drawLabeledValue(
      doc,
      summaryX + 16,
      summaryY + 88,
      "Discount",
      formatCurrency(0),
      210,
    );

    doc
      .moveTo(summaryX + 16, summaryY + 112)
      .lineTo(summaryX + summaryW - 16, summaryY + 112)
      .strokeColor(COLORS.line)
      .stroke();

    doc
      .fillColor(COLORS.text)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("Grand Total", summaryX + 16, summaryY + 118)
      .text(
        formatCurrency(order.totalAmount || grandTotal),
        summaryX + 120,
        summaryY + 118,
        {
          width: 90,
          align: "right",
        },
      );

    state.cursorY = summaryY + 160;

    ensureSpace(doc, order, state, 90);

    drawRoundedCard(
      doc,
      PAGE.marginX,
      state.cursorY,
      doc.page.width - PAGE.marginX * 2,
      78,
      16,
    );

    doc
      .fillColor(COLORS.text)
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Thanks for your order!", PAGE.marginX, state.cursorY + 18, {
        width: doc.page.width - PAGE.marginX * 2,
        align: "center",
      });

    doc
      .fillColor(COLORS.muted)
      .font("Helvetica")
      .fontSize(9)
      .text(
        "This is a computer-generated invoice from Groceries Mart. For support, contact fenilkhatri931@gmail.com",
        PAGE.marginX + 24,
        state.cursorY + 42,
        {
          width: doc.page.width - PAGE.marginX * 2 - 48,
          align: "center",
          lineGap: 2,
        },
      );

    // Add footer with real total pages
    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(i);
      drawFooter(doc, i + 1, range.count);
    }

    doc.end();
  } catch (error) {
    console.error("Invoice generation error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        message: "Internal Server Error!",
        error: error.message,
      });
    }

    res.end();
  }
};

export default downloadInvoice;
