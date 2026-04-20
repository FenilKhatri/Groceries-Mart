import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { faqs } from "../../../data/pages/contact";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
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
