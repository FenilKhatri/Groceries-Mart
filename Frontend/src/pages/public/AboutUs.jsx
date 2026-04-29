import { Header, Story, Stats, CoreValues, MeetTeam, Mission, Vision, Trust } from "../../features/about/components/index";

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
