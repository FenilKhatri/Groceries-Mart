import React from "react";
import {
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaLeaf,
  FaShoppingCart,
  FaStore,
  FaTruck,
  FaAppleAlt,
  FaUserShield,
  FaBoxOpen,
  FaShoppingBasket,
} from "react-icons/fa";

const floatingIcons = [
  { Icon: FaShieldAlt, color: "text-emerald-400", style: "top-10 left-10" },
  { Icon: FaLock, color: "text-orange-400", style: "top-32 right-16" },
  {
    Icon: FaCheckCircle,
    color: "text-emerald-500",
    style: "bottom-20 left-20",
  },
  { Icon: FaLeaf, color: "text-green-300", style: "bottom-32 right-24" },
  { Icon: FaShoppingCart, color: "text-orange-500", style: "top-100" },

  { Icon: FaStore, color: "text-emerald-300", style: "top-20 left-1/2" },
  { Icon: FaTruck, color: "text-orange-300", style: "bottom-10 right-10" },
  { Icon: FaAppleAlt, color: "text-green-400", style: "top-1/3 right-1/7" },
  {
    Icon: FaUserShield,
    color: "text-emerald-400",
    style: "bottom-1/3 left-1/4",
  },
  { Icon: FaBoxOpen, color: "text-orange-400", style: "top-3/4 left-10" },
  {
    Icon: FaShoppingBasket,
    color: "text-emerald-500",
    style: "bottom-1/4 right-1/3",
  },
];

const PolicyLayout = ({ title, sections }) => {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-emerald-50 via-white to-orange-50 py-12 px-4 overflow-hidden">
      {/* Floating Icons */}
      {floatingIcons.map((item, i) => {
        const Icon = item.Icon;
        return (
          <Icon
            key={i}
            className={`absolute ${item.style} ${item.color} opacity-20 w-12 h-12`}
          />
        );
      })}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-emerald-500">
            {title}
          </h1>
          <div className="mt-3 h-1 w-24 mx-auto bg-orange-500 rounded-full" />
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-lg md:text-xl font-semibold mb-2 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm group-hover:bg-emerald-500 group-hover:text-white transition">
                  {index + 1}
                </span>
                <span className="text-gray-800 group-hover:text-emerald-600 transition">
                  {section.heading}
                </span>
              </h2>

              <p className="text-gray-600 leading-relaxed pl-11">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;
