import Header from "../../components/sections/about/Header";
import Story from "../../components/sections/about/Story";
import Stats from "../../components/sections/about/Stats";
import CoreValues from "../../components/sections/about/CoreValues";
import MeetTeam from "../../components/sections/about/MeetTeam";
import Mission from "../../components/sections/about/Mission";
import Vision from "../../components/sections/about/Vision";
import Trust from "../../components/sections/about/Trust";

const AboutUs = () => {
  return (
    <div className="bg-white">
      <div className="max-w-screen-2xl mx-auto my-6 px-5 md:px-8 lg:px-10 space-y-16">
        <Header />
        <Story />
        <Stats />
        <CoreValues />
        <MeetTeam />
        <Mission />
        <Vision />
        <Trust />
      </div>
    </div>
  );
};

export default AboutUs;
