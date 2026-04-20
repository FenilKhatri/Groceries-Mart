import { FaLeaf, FaAppleAlt, FaStore, FaCarrot } from "react-icons/fa";

const vendors = [
  {
    name: "Green Farm",
    desc: "Organic vegetables directly from farms",
    icon: FaLeaf,
    position: "top",
  },
  {
    name: "Fresh Dairy",
    desc: "Pure milk and dairy products",
    icon: FaStore,
    position: "left",
  },
  {
    name: "Fruit Hub",
    desc: "Fresh seasonal fruits delivered daily",
    icon: FaAppleAlt,
    position: "right",
  },
  {
    name: "Veggie Market",
    desc: "Fresh greens & daily essentials",
    icon: FaCarrot,
    position: "bottom",
  },
];

const Vendors = () => {
  return (
    <section className="py-20 md:py-24 bg-linear-to-b from-white to-green-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Trusted Vendors
        </h2>
        <p className="text-gray-500 mt-3 mb-12 md:mb-16 text-sm md:text-base">
          A strong network of verified suppliers delivering freshness daily
        </p>

        {/*  MOBILE VIEW  */}
        <div className="flex flex-col items-center gap-6 md:hidden">
          {vendors.map((vendor, i) => {
            const Icon = vendor.icon;

            return (
              <div
                key={i}
                className="w-full max-w-sm bg-white rounded-xl px-5 py-4 shadow border border-gray-200"
              >
                <Icon className="text-green-600 text-xl mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-gray-800">
                  {vendor.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{vendor.desc}</p>
              </div>
            );
          })}
        </div>

        {/*  DESKTOP VIEW  */}
        <div className="hidden md:flex relative items-center justify-center h-112.5">
          {/* Center */}
          <div className="w-36 h-36 rounded-full bg-white shadow-xl flex flex-col items-center justify-center border border-green-100 z-10">
            <h3 className="text-green-600 font-bold text-lg">FreshMart</h3>
            <p className="text-xs text-gray-500">Marketplace</p>
          </div>

          {/* Lines */}
          <div className="absolute w-0.5 h-32 bg-green-300 top-10"></div>
          <div className="absolute w-0.5 h-32 bg-green-300 bottom-10"></div>
          <div className="absolute w-32 h-0.5 bg-green-300 left-[calc(50%-160px)] top-1/2"></div>
          <div className="absolute w-32 h-0.5 bg-green-300 right-[calc(50%-160px)] top-1/2"></div>

          {/* Vendors */}
          {vendors.map((vendor, i) => {
            const Icon = vendor.icon;

            let positionClass = "";
            if (vendor.position === "top") {
              positionClass = "absolute top-0 left-1/2 -translate-x-1/2";
            } else if (vendor.position === "bottom") {
              positionClass = "absolute bottom-0 left-1/2 -translate-x-1/2";
            } else if (vendor.position === "left") {
              positionClass = "absolute left-50 top-1/2 -translate-y-1/2";
            } else {
              positionClass = "absolute right-50 top-1/2 -translate-y-1/2";
            }

            return (
              <div key={i} className={`${positionClass} group`}>
                <div className="bg-white rounded-xl px-5 py-4 shadow-md border border-gray-200 w-44 text-center hover:shadow-xl hover:-translate-y-1 transition">
                  <Icon className="text-green-600 text-xl mx-auto mb-2 group-hover:scale-110 transition" />
                  <h4 className="text-sm font-semibold text-gray-800">
                    {vendor.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{vendor.desc}</p>
                </div>

                {/* Dot */}
                <div className="w-3 h-3 bg-green-600 rounded-full mx-auto mt-2 shadow"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Vendors;
