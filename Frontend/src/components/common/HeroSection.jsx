import { Link } from "react-router-dom";
import { FaArrowRight, FaHouseUser } from "react-icons/fa6";
import HeroBG from "../../assets/background/HeroImg.webp";

const HeroSection = () => {
  return (
    <section className="relative min-h-svh w-full">
      <picture>
        <source srcSet={HeroBG} type="image/webp" />
        <img
          src={HeroBG}
          alt="Fresh groceries background"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width="1920"
          height="1080"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <div className="flex">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/50 px-4 py-2 text-sm font-bold text-emerald-700 shadow-2xl backdrop-blur-md">
              <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
              100% Organic & Fresh
            </p>
          </div>

          <h1 className="mt-4 text-3xl leading-tight font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Get fresh Frocery
            <span className="mt-2 block text-emerald-600">
              Enjoy healthy life.
            </span>
          </h1>

          <p className="mt-4 rounded-xl bg-emerald-200/30 p-2 text-base font-semibold text-emerald-900/50 backdrop-blur-md md:backdrop-blur-none sm:text-lg lg:bg-transparent">
            Shop from local vendors and get the best quality fruits,
            vegetables, and daily essentials delivered fast. Join thousands of
            happy customers today.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-5">
            <Link
              to="/products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 sm:w-auto"
            >
              Shop Now <FaArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/vendor/login"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600 sm:w-auto"
            >
              Become a vendor <FaHouseUser className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 rounded-xl bg-emerald-200/30 p-2 text-emerald-900 backdrop-blur-md md:backdrop-blur-none lg:bg-transparent">
            <div>
              <p className="text-xl font-bold sm:text-3xl">50k+</p>
              <p className="text-xs font-medium sm:text-sm">Happy Customers</p>
            </div>
            <div>
              <p className="text-xl font-bold sm:text-3xl">200+</p>
              <p className="text-xs font-medium sm:text-sm">Local Vendors</p>
            </div>
            <div>
              <p className="text-xl font-bold sm:text-3xl">100%</p>
              <p className="text-xs font-medium sm:text-sm">Fresh Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;