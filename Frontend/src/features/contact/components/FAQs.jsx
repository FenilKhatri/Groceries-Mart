import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { faqs } from "../../../data/pages/contactData";
import {
  FaLeaf,
  FaShoppingCart,
  FaTruck,
  FaAppleAlt,
  FaBoxOpen,
  FaShoppingBasket,
  FaStore,
  FaCheckCircle,
  FaShieldAlt,
  FaUserShield,
  FaLock,
  FaCarrot,
  FaBreadSlice,
  FaWineBottle,
  FaIceCream,
} from "react-icons/fa";

const floatingIcons = [
  { Icon: FaLeaf, color: "text-green-300", style: "top-10 left-10" },
  { Icon: FaShoppingCart, color: "text-orange-400", style: "top-20 right-16" },
  { Icon: FaTruck, color: "text-orange-300", style: "bottom-20 left-20" },
  { Icon: FaAppleAlt, color: "text-green-400", style: "bottom-32 right-24" },
  { Icon: FaBoxOpen, color: "text-orange-300", style: "top-1/2 left-1/3" },
  {
    Icon: FaShoppingBasket,
    color: "text-green-400",
    style: "bottom-10 right-10",
  },
  { Icon: FaStore, color: "text-emerald-300", style: "top-32 left-1/2" },
  { Icon: FaCheckCircle, color: "text-green-500", style: "top-1/3 left-20" },
  {
    Icon: FaShieldAlt,
    color: "text-emerald-400",
    style: "bottom-1/3 right-1/4",
  },
  { Icon: FaUserShield, color: "text-green-300", style: "top-2/3 right-10" },
  { Icon: FaLock, color: "text-orange-300", style: "bottom-24 left-1/4" },

  { Icon: FaCarrot, color: "text-orange-400", style: "top-40 left-1/4" },
  {
    Icon: FaBreadSlice,
    color: "text-yellow-400",
    style: "bottom-40 right-1/3",
  },
  { Icon: FaWineBottle, color: "text-purple-300", style: "top-1/4 right-1/5" },
  { Icon: FaIceCream, color: "text-pink-300", style: "bottom-1/4 left-1/6" },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden" id="faq">
      {/* Floating Icons */}
      {floatingIcons.map((item, i) => {
        const Icon = item.Icon;

        return (
          <Icon
            key={i}
            className={`
        absolute ${item.style} ${item.color}
        opacity-10 w-8 h-8
        ${i > 5 ? "hidden md:block" : "block"}
      `}
          />
        );
      })}
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Frequently Asked Questions
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs?.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden transition"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>

                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180 text-green-600" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`px-5 text-gray-600 text-sm transition-all duration-300 ${
                  activeIndex === index
                    ? "max-h-40 pb-5"
                    : "max-h-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
