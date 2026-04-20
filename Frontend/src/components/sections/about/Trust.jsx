import {
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaCertificate,
} from "react-icons/fa";

const Trust = () => {
  return (
    <section className="relative py-28 bg-white overflow-hidden">
      {/* Floating Icons */}
      <FaShieldAlt className="absolute top-16 left-20 text-green-100 text-6xl animate-pulse" />
      <FaLock className="absolute bottom-20 left-32 text-green-100 text-5xl animate-bounce" />
      <FaCheckCircle className="absolute top-24 right-24 text-green-100 text-6xl animate-pulse" />
      <FaCertificate className="absolute bottom-16 right-20 text-green-100 text-5xl animate-bounce" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Small Label */}
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
          Trust & Security
        </p>

        {/* Main Statement */}
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-6">
          Built on Trust. Backed by <br />
          <span className="text-green-600">Secure Systems</span>
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-lg leading-relaxed mb-10">
          We prioritize your safety at every step — from secure payments to
          verified vendors — ensuring a reliable and trustworthy grocery
          shopping experience.
        </p>

        {/* Inline Trust Points (NOT grid/card) */}
        <div className="flex flex-wrap justify-center gap-8 text-gray-600 text-sm">
          <span>• Secure Payments</span>
          <span>• Verified Vendors</span>
          <span>• Data Protection</span>
          <span>• Quality Assurance</span>
        </div>
      </div>
    </section>
  );
};

export default Trust;
