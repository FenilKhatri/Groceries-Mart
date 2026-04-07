import VendorLoginRegisterBG from "../../assets/background/VendorLoginRegisterBG.png";

const VendorAuthBackground = () => {
  return (
    <div className="relative hidden h-screen lg:block">
      <img
        src={VendorLoginRegisterBG}
        alt="Vendor auth background"
        loading="lazy"
        decoding="async"
        width="full"
        height="full"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

      <div className="absolute bottom-12 left-10 right-10 text-white">
        <span className="rounded-full border border-white/30 px-4 py-2 text-xs backdrop-blur">
          VENDOR SUCCESS STORY
        </span>

        <h2 className="mt-6 text-3xl font-bold leading-snug">
          "Green Leaf transformed our family farm. We now reach thousands of
          local customers every day without the hassle of delivery logistics."
        </h2>

        <div className="mt-6">
          <p className="font-semibold">Mark Thompson</p>
          <p className="text-sm text-white/70">Owner, Sunrise Organic Farms</p>
        </div>
      </div>
    </div>
  );
};

export default VendorAuthBackground;