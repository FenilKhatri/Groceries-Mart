import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { SiGmail } from "react-icons/si";

export const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes within 24 hours depending on your location and product availability.",
  },
  {
    question: "Can I become a vendor on FreshMart?",
    answer:
      "Yes, you can register as a vendor through the Vendor Login section and start selling your products.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support secure online payments through Razorpay including UPI, cards, and net banking.",
  },
  {
    question: "Are the products fresh and verified?",
    answer:
      "Yes, all products are sourced from verified vendors and go through quality checks.",
  },
];


export const contactInfo = [
  {
    icon: IoLogoWhatsapp,
    theme: "text-emerald-500 bg-emerald-100",
    title: "Whatsapp Contact",
    link: "https://wa.me/919313407400",
    description: "+91 9313407400",
  },
  {
    icon: FaPhoneAlt,
    theme: "text-blue-500 bg-blue-100",
    title: "Phone Support",
    link: "tel:+919313407400",
    description: "+91 9313407400",
  },
  {
    icon: SiGmail,
    theme: "text-red-500 bg-red-100",
    title: "Email Us",
    link: "mailto:fenilkhatri931@gmail.com",
    description: "fenilkhatri931@gmail.com",
  },
]