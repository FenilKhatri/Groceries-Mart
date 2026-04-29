import { useState } from "react";
import { reviews } from "../../../data/pages/homeData";

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const activeReview = reviews[activeIndex];

  return (
    <section className="py-20 bg-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800">
          What Our Customers Say
        </h2>
        <p className="text-gray-500 mt-2 mb-10">
          Real experiences from our happy customers
        </p>

        {/* Avatars */}
        <div className="flex justify-center items-center gap-6 mb-10 flex-wrap">
          {reviews?.map((user, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              className={`cursor-pointer transition duration-300 ${
                index === activeIndex ? "scale-110" : "opacity-60"
              }`}
            >
              <img
                src={user.image}
                alt={user.name}
                className={`w-16 h-16 rounded-full object-cover border-4 ${
                  index === activeIndex
                    ? "border-green-500"
                    : "border-transparent"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Review Card */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md max-w-2xl mx-auto transition-all duration-300">
          <p className="text-gray-600 italic text-lg">
            “{activeReview.review}”
          </p>

          <h4 className="mt-4 font-semibold text-gray-800">
            {activeReview.name}
          </h4>
          <span className="text-sm text-gray-500">{activeReview.role}</span>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
