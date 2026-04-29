import { GiLeafSwirl } from "react-icons/gi";
import { HiOutlineEye } from "react-icons/hi";
import { FaTruckFast } from "react-icons/fa6";
import { coreValues } from "../../../data/pages/aboutData";
import H3 from "../../../shared/components/ui/H3";
import Description from "../../../shared/components/ui/Description";

const CoreValues = () => {
  return (
    <>
      <section className="space-y-6 md:space-y-10">
        <div className="text-center space-y-4">
          <H3 children="Our Core Values" />
          <Description
            children="Everything we do is guided by a commitment to quality, community,
            and sustainability. Here is what you can always expect from us."
            className="mx-auto text-gray-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues?.map((value, index) => {
            const Icon = value?.icon;

            return (
              <div
                className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg hover:bg-emerald-100/30 transition-all p-8 flex flex-col items-center justify-center space-y-5 text-center"
                key={index}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-emerald-100">
                  <Icon className="text-emerald-600 text-3xl" />
                </div>
                <p className="font-semibold text-lg text-gray-900">
                  {value?.title}
                </p>
                <p className="text-gray-500">{value?.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CoreValues;
