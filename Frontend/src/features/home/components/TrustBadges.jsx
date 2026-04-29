import { badges } from "../../../data/pages/homeData";

const TrustBadges = () => {
  return (
    <section className="py-16 bg-linear-to-r from-green-50 via-white to-green-50 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Trusted by Thousands of Customers
        </h2>
        <p className="text-gray-500 mt-2">
          Delivering quality, reliability, and satisfaction every day
        </p>
      </div>

      {/* Scrolling Strip */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-12 animate-scroll whitespace-nowrap">
          {[...badges, ...badges]?.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-700 text-lg font-medium"
              >
                <Icon className="text-green-600 text-xl" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
