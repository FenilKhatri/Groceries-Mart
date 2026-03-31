import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

// Verify userId
export const validateUser = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "unauthorized!" });

  // Validate user cart
  const userCart = await Cart.findOne({ user: userId }).populate(
    "items.product",
  );
  if (!userCart || userCart.items.length === 0)
    return res.status(400).json({ message: "Cart is empty!" });

  return { userId, userCart };
};

// Create razorpay order
export const createRazorPayOrder = async (req, res) => {
  try {
    const validated = await validateUser(req, res);
    if (!validated) return;

    const { userId, userCart } = validated;

    // Validate total amount
    let total = userCart.totalAmount;
    const deliveryCharge = 0;
    const finalAmount = total + deliveryCharge;
    if (finalAmount <= 0)
      return res.status(400).json({ message: "Invalid order amount!" });

    // Razorpay
    const options = {
      amount: Math.round(finalAmount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: String(userId),
      },
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json({
      message: "Razorpay order created!",
      order,
      amount: finalAmount,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};

// Verify razorpay order
export const verifyRazorPayOrder = async (req, res) => {
  try {
    const validated = await validateUser(req, res);
    if (!validated) return;

    const { userId, userCart } = validated;

    // Validate user detail fields
    const { name, phone, address, city, pincode, customerNote } = req.body;
    if (!name || !phone || !address || !city  || !pincode)
      return res.status(400).json({ message: "All fields are required!" });

    const phoneRegEx = /^\d{10}$/;
    if (!phoneRegEx.test(phone))
      return res.status(400).json({ message: "Invalid phone number!" });

    const pincodeRegEx = /^\d{6}$/;
    if (!pincodeRegEx.test(pincode))
      return res.status(400).json({ message: "Invalid pincode!" });

    // Validate payment fields
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
      return res.status(400).json({ message: "Missing payment details!" });

    // Validate signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if (!isAuthentic)
      return res.status(400).json({ message: "Invalid payment signature!" });

    // Prevent duplicate order
    const existingOrder = await Order.findOne({
      "razorpay.paymentId": razorpay_payment_id,
    });
    if (existingOrder)
      return res
        .status(400)
        .json({ message: "Payment already verified!", order: existingOrder });

    // Order items
    const orderItems = userCart.items.map((item) => ({
      product: item.product._id || item.product,
      quantity: item.quantity,
      price: item.price,
    }));

    // Create order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      shippingAddress: {
        name,
        phone,
        address,
        city,
        pincode,
      },
      customerNote,
      totalAmount: userCart.totalAmount,
      paymentMethod: "Razorpay",
      paymentStatus: "paid",
      orderStatus: "placed",
      razorpay: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      },
    });

    userCart.items = [];
    userCart.totalAmount = 0;
    await userCart.save();

    return res
      .status(200)
      .json({ message: "Payment verified successfully!", order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
};
