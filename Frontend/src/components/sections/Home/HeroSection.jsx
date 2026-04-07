import HeroDesktopBG from "../../../assets/background/HeroImgDesktop.webp";
import HeroMobileBG from "../../../assets/background/HeroImgMobile.webp";
import Header from "./Header";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] w-full">
      <picture>
        <source srcSet={HeroMobileBG} media="(max-width: 768px)" />
        <source srcSet={HeroDesktopBG} media="(min-width: 769px)" />
        <img
          src={HeroDesktopBG}
          alt="Fresh groceries background"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      <Header />
    </section>
  );
};

export default HeroSection;
