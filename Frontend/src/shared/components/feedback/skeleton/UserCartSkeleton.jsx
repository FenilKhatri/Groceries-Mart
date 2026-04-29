import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserCartSkeleton = ({ cartLength = 1 }) => {
  return (
    <div className="divide-y divide-gray-100">
      {Array.from({ length: cartLength }).map((_, index) => (
        <div
          key={index}
          className="mx-4 my-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition flex flex-col md:flex-row md:items-center md:justify-between gap-5"
        >
          <div className="w-full flex items-start gap-5">
            <div className="w-20 h-20 sm:w-22.5 sm:h-22.5 md:w-23 md:h-23 shrink-0">
              <Skeleton width="100%" height="100%" />
            </div>

            <div className="w-full flex flex-col justify-between">
              <div className="w-full flex flex-col gap-0">
                <div className="w-10">
                  <Skeleton width="100%" height={10} />
                </div>

                <div className="w-32">
                  <Skeleton width="100%" height={15} />
                </div>

                <div className="w-10">
                  <Skeleton width="100%" height={10} />
                </div>
              </div>

              <div className="w-16 sm:w-20 md:w-24">
                <Skeleton width="100%" height={15} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-6 md:gap-10">
            <div className="flex flex-col items-end justify-center">
              <div className="w-10 sm:w-12 md:w-14">
                <Skeleton width="100%" height={10} />
              </div>
              <div className="w-14 sm:w-16 md:w-20">
                <Skeleton width="100%" height={10} />
              </div>
            </div>

            <div className="w-22.5 sm:w-27.5 md:w-30">
              <Skeleton width="100%" height={35} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCartSkeleton;
