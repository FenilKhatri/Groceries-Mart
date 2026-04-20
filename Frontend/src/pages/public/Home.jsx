import Category from "../../components/sections/Home/Category";
import FeaturedProducts from "../../components/sections/Home/FeaturedProducts";
import HeroSection from "../../components/sections/Home/HeroSection";
import {
  WhyChooseUs,
  Vendors,
  Reviews,
  TrustBadges,
  UserFlow
} from "../../components/sections/Home/index";

const Home = () => {
  return (
    <div>
      {/* HERO (keep as it is) */}
      <HeroSection />

      {/* SHOP SECTION */}
      <div className="bg-white">
        <Category />
        <FeaturedProducts />
      </div>

      {/* TRUST / VALUE SECTION */}
      <div className="bg-linear-to-b from-white to-emerald-50">
        <WhyChooseUs />
      </div>

      {/* PROCESS FLOW (highlight section) */}
      <div className="bg-white relative">
        {/* subtle divider */}
        <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-emerald-50 to-transparent pointer-events-none"></div>
        <UserFlow />
      </div>

      {/* NETWORK (vendors) */}
      <div className="bg-linear-to-b from-white to-emerald-50">
        <Vendors />
      </div>

      {/* SOCIAL PROOF */}
      <div className="bg-white">
        <Reviews />
      </div>

      {/* TRUST BADGES (final conversion section) */}
      <div className="bg-linear-to-b from-white to-emerald-100">
        <TrustBadges />
      </div>
    </div>
  );
};

export default Home;
