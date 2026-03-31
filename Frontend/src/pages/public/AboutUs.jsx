import AboutBG from "../../assets/other/AboutUsImage.png";
import OurStory from "../../assets/other/OurStory.png";
import { GiLeafSwirl } from "react-icons/gi";
import { HiOutlineEye } from "react-icons/hi";
import { FaTruckFast } from "react-icons/fa6";

const AboutUs = () => {
  return (
    <div className="bg-white">
      <div className="max-w-screen-2xl mx-auto my-6 px-5 md:px-8 lg:px-10 space-y-16">
        {/* About Heading */}
        <section className="flex flex-col items-center justify-center gap-10">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-600 leading-tight">
              Nourishing Communities,
              <span className="block">One Delivery at a Time.</span>
            </h2>
            <p className="font-medium text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
              Green Leaf Grocers is more than just a marketplace. We are a
              community of local farmers, trusted vendors, and passionate
              foodies dedicated to bringing the freshest organic produce
              straight to your table.
            </p>
          </div>

          <img
            src={AboutBG}
            alt="About background"
            loading="lazy"
            decoding="async"
            className="w-full h-70 md:h-112.5 rounded-3xl object-cover shadow-md"
          />
        </section>

        {/* Our Story */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="text-emerald-600 font-bold text-3xl uppercase tracking-wider">
              Our Story
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              Fresh food, fair prices, and a greener future
            </h3>
            <p className="text-gray-500 leading-7">
              Founded in 2023, Green Leaf Grocers started with a simple idea:
              everyone deserves access to fresh, healthy, and affordable food.
              We realized that the traditional grocery supply chain was broken,
              leaving farmers underpaid and customers with week-old produce.
            </p>
            <p className="text-gray-500 leading-7">
              By creating a direct multi-vendor platform, we cut out the
              middlemen. Now, you can buy directly from local farms and top-tier
              vendors. This means fresher food for your family, fair prices for
              the producers, and a greener planet for all of us.
            </p>
          </div>

          <img
            src={OurStory}
            alt="Our story"
            loading="lazy"
            decoding="async"
            className="w-full h-75 md:h-105 object-cover rounded-3xl shadow-md"
          />
        </section>

        {/* Stats */}
        <section className="bg-emerald-500 text-white rounded-3xl px-6 py-10 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold">20+</p>
              <p className="text-sm md:text-base font-medium text-white/90">
                Fresh Products
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold">24/7</p>
              <p className="text-sm md:text-base font-medium text-white/90">
                Customer Support
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold">50k+</p>
              <p className="text-sm md:text-base font-medium text-white/90">
                Happy Customers
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-6 md:space-y-10">
          <div className="text-center space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Core Values
            </h3>
            <p className="max-w-2xl mx-auto font-medium text-gray-500">
              Everything we do is guided by a commitment to quality, community,
              and sustainability. Here is what you can always expect from us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg hover:bg-emerald-100/30 transition-all p-8 flex flex-col items-center justify-center space-y-5 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-emerald-100">
                <GiLeafSwirl className="text-emerald-600 text-3xl" />
              </div>
              <p className="font-semibold text-lg text-gray-900">
                100% Organic & Fresh
              </p>
              <p className="text-gray-500">
                We enforce strict quality control to ensure every fruit,
                vegetable, and dairy product meets the highest standards of
                freshness.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg hover:bg-emerald-100/30 transition-all p-8 flex flex-col items-center justify-center space-y-5 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-emerald-100">
                <HiOutlineEye className="text-emerald-600 text-3xl" />
              </div>
              <p className="font-semibold text-lg text-gray-900">
                Vendor Transparency
              </p>
              <p className="text-gray-500">
                Know exactly where your food comes from. Every product displays
                its vendor, so you can support the local businesses you love.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg hover:bg-emerald-100/30 transition-all p-8 flex flex-col items-center justify-center space-y-5 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-emerald-100">
                <FaTruckFast className="text-emerald-600 text-3xl" />
              </div>
              <p className="font-semibold text-lg text-gray-900">
                Lightning Fast Delivery
              </p>
              <p className="text-gray-500">
                Our optimized delivery network ensures your groceries arrive at
                your doorstep exactly when you need them, fresh and intact.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
