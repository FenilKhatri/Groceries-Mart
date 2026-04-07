import Header from "../../components/sections/about/Header";
import Story from "../../components/sections/about/Story";
import Stats from "../../components/sections/about/Stats";
import CoreValues from "../../components/sections/about/CoreValues";

const AboutUs = () => {
  return (
    <div className="bg-white">
      <div className="max-w-screen-2xl mx-auto my-6 px-5 md:px-8 lg:px-10 space-y-16">
        {/* About Heading */}
        <Header />

        {/* Our Story */}
        <Story />

        {/* Stats */}
        <Stats />

        {/* Core Values */}
        <CoreValues />
      </div>
    </div>
  );
};

export default AboutUs;
