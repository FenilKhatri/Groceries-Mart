import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductGridSkeleton = ({
  count = 8,
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5",
}) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/90 shadow-sm backdrop-blur-sm"
        >
          <div className="relative m-3 overflow-hidden rounded-2xl bg-gray-100">
            <Skeleton height={208} borderRadius={16} />

            <div className="absolute left-3 top-3">
              <Skeleton width={70} height={24} borderRadius={999} />
            </div>

            <div className="absolute right-3 top-3">
              <Skeleton circle width={36} height={36} />
            </div>

            <div className="absolute bottom-3 left-3">
              <Skeleton width={75} height={22} borderRadius={999} />
            </div>
          </div>

          <div className="space-y-3 px-4 pb-4 pt-1">
            <div>
              <Skeleton width="75%" height={24} />
              <div className="mt-1">
                <Skeleton width="40%" height={16} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <Skeleton width={90} height={16} />
              <Skeleton width={70} height={16} />
            </div>

            <div className="flex flex-col items-start justify-between gap-3 pt-1 md:flex-row md:items-end">
              <Skeleton width={70} height={30} />
              <div className="w-full md:w-28">
                <Skeleton width="100%" height={42} borderRadius={12} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
