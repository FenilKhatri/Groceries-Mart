import AboutBG from "../../../assets/other/AboutUsImage.png";
import Description from "../../ui/Description";
import H2 from "../../ui/H2";

const Header = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-10">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <H2 className="">
            <span className="text-2xl md:text-4xl lg:text-5xl text-emerald-500">
              Nourishing Communities,
            </span>
            <span className="block text-2xl md:text-4xl lg:text-5xl">
              One Delivery at a Time.
            </span>
          </H2>
          <Description
            children="Green Leaf Grocers is more than just a marketplace. We are a
            community of local farmers, trusted vendors, and passionate foodies
            dedicated to bringing the freshest organic produce straight to your
            table."
            className="mx-auto text-gray-500"
          />
        </div>

        <img
          src={AboutBG}
          alt="About background"
          loading="lazy"
          decoding="async"
          width="full"
          height="full"
          className="w-full h-70 md:h-112.5 rounded-3xl object-cover shadow-md"
        />
      </section>
    </>
  );
};

export default Header;
