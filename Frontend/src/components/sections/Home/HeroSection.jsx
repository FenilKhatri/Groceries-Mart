import HeroBG from "../../../assets/background/HeroImg.webp";
import Header from "./Header";

const HeroSection = () => {
  return (
    <section className="relative min-h-svh w-full">
      <picture>
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

      <Header />
    </section>
  );
};

export default HeroSection;
