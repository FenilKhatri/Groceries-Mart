import OurStory from "../../../assets/other/OurStory.png";
import Description from "../../ui/Description";
import H3 from "../../ui/H3";

const Story = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <H3 children="OUR STORY" className="text-emerald-500" />
          <H3>
            <span className="text-xl md:text-2xl">Fresh food, fair prices, and a greener future</span>
          </H3>
          <Description
            children="Founded in 2023, Green Leaf Grocers started with a simple idea:
            everyone deserves access to fresh, healthy, and affordable food. We
            realized that the traditional grocery supply chain was broken,
            leaving farmers underpaid and customers with week-old produce."
            className="text-gray-500 leading-7 text-justify"
          />
          <Description
            children="By creating a direct multi-vendor platform, we cut out the
            middlemen. Now, you can buy directly from local farms and top-tier
            vendors. This means fresher food for your family, fair prices for
            the producers, and a greener planet for all of us."
            className="text-gray-500 leading-7 text-justify"
          />
        </div>

        <img
          src={OurStory}
          alt="Our story"
          loading="lazy"
          decoding="async"
          className="w-full h-75 md:h-105 object-cover rounded-3xl shadow-md"
        />
      </section>
    </>
  );
};

export default Story;
