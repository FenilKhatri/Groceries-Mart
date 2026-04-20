import whychooseusimg from "../../../assets/home/whychooseus.avif";
import { features } from "../../../data/pages/home";

const WhyChooseUs = () => {
  return (
    <section className="md:py-16 bg-white">
      <div className="text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Why Choose FreshMart
        </h2>

        <p className="text-gray-500 mb-8">
          We provide fresh groceries with fast delivery and a seamless shopping
          experience.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT IMAGE */}
        <div>
          <img
            src={whychooseusimg}
            alt="Fresh groceries"
            className="w-full rounded-2xl shadow-md object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* FEATURES LIST */}
          <div className="space-y-6">
            {features?.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-4">
                  {/* ICON */}
                  <div className="min-w-11.25 h-11.25 flex items-center justify-center rounded-full bg-green-100">
                    <Icon className="text-green-600" size={18} />
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
