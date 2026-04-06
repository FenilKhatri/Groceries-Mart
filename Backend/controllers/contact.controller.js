import Contact from "../models/contactModel.js";
import Subscribe from "../models/subscribeModel.js";
import { sendMail } from "../utils/sendSubscribeMail.js";

const subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Please enter email to subscribe!",
      });
    }

    const existing = await Subscribe.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "Email already subscribed!",
      });
    }

    const subscribedUser = await Subscribe.create({ email });
    await sendMail({
      userEmail: email,
      subject: "New Newsletter Subscriber",
      html: `
        <h2>New subscriber on FreshMart</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>This user subscribed to your newsletter.</p>
      `,
    });

    return res.status(200).json({
      message: "Thank you for subscribing!",
      subscribedUser
    });
  } catch (error) {
    console.error("Subscribe error:", error);

    return res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};

const contactUser = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const normalizedName = String(name || "")
      .trim()
      .toLowerCase();
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    const normalizedSubject = String(subject || "")
      .trim()
      .toLowerCase();
    const normalizedMessage = String(message || "")
      .trim()
      .toLowerCase();

    const emailRegex = /^[A-Za-z0-9.+_-]+@[A-Za-z0-9.+_-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Invalid Email!",
      });
    }

    const contact = await Contact.create({
      name: normalizedName,
      email: normalizedEmail,
      subject: normalizedSubject,
      message: normalizedMessage,
    });

    return res.status(200).json({
      message: "Thank you for your message!",
      contact,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};

export default { subscribeUser, contactUser };
