import HeroDesktopBG from "../../../assets/background/HeroImgDesktop.webp";
import HeroMobileBG from "../../../assets/background/HeroImgMobile.webp";
import Header from "./Header";

const HeroSection = () => {
  return (
    <section className="relative min-h-svh w-full">
      <picture>
        {/* Mobile first */}
        <source srcSet={HeroMobileBG} media="(max-width: 768px)" />

        {/* Desktop */}
        <source srcSet={HeroDesktopBG} media="(min-width: 769px)" />

        {/* Fallback image */}
        <img
          src={HeroDesktopBG}
          alt="Fresh groceries background"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      <Header />
    </section>
  );
};

export default HeroSection;
