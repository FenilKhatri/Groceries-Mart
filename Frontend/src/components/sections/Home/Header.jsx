import Button from "../../ui/Button";
import { FaArrowRight, FaHouseUser } from "react-icons/fa6";
import Description from "../../ui/Description";
import { counts } from "../../../data/counts";

const Header = () => {
  return (
    <>
      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col items-start space-y-5 lg:space-y-7 max-w-2xl">
          <div className="flex">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/50 px-4 py-2 text-sm font-bold text-emerald-700 shadow-2xl backdrop-blur-md">
              <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
              100% Organic & Fresh
            </p>
          </div>

          <h1 className="text-3xl leading-tight font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Get fresh Frocery
            <span className="mt-2 block text-emerald-600">
              Enjoy healthy life.
            </span>
          </h1>
          <Description
            children="Shop from local vendors and get the best quality fruits, vegetables,
            and daily essentials delivered fast. Join thousands of happy
            customers today."
            className="rounded-xl p-2 bg-emerald-200/30 text-base text-emerald-900 md:text-emerald-900/50 backfrop-blur-md md:backdrop-blur-none sm:text-lg lg:bg-transparent"
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
            <Button
              to="/products"
              icon={<FaArrowRight size={20} />}
              children="Shop Now"
              variant="primary"
              className="py-3"
            />

            <Button
              to="/products"
              icon={<FaHouseUser size={20} />}
              children="Become a vendor"
              variant="secondary"
              className="py-3"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 rounded-xl bg-emerald-200/30 p-2 text-emerald-900 backdrop-blur-md md:backdrop-blur-none lg:bg-transparent">
            {counts?.map((data, index) => (
              <div key={index}>
                <p className="text-xl font-bold sm:text-3xl">{data?.count}</p>
                <p className="text-xs font-medium sm:text-sm">
                  {data?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
