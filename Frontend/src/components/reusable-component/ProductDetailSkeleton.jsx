import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailSkeleton = () => {
  return (
    <>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-white border border-gray-200 p-5">
            {/* tags + share */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Skeleton width={60} height={20} borderRadius={20} />
                <Skeleton width={60} height={20} borderRadius={20} />
                <Skeleton width={60} height={20} borderRadius={20} />
              </div>
              <Skeleton circle width={40} height={40} />
            </div>

            {/* hero image */}
            <div className="mt-4">
              <Skeleton height={300} borderRadius={20} />
            </div>
          </div>

          {/* thumbnails */}
          <div className="mt-4 flex gap-3">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} width={70} height={70} borderRadius={12} />
              ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-7 space-y-4">
          {/* brand */}
          <Skeleton width={120} height={30} borderRadius={10} />

          {/* title */}
          <Skeleton width="80%" height={30} />

          {/* price */}
          <div className="flex gap-3">
            <Skeleton width={100} height={30} />
            <Skeleton width={60} height={20} />
          </div>

          {/* stock */}
          <Skeleton width={150} height={20} />

          <Skeleton height={1} />

          {/* description */}
          <Skeleton count={4} />

          {/* quantity */}
          <Skeleton width={200} height={20} />

          {/* buttons */}
          <div className="flex gap-3">
            <Skeleton height={44} borderRadius={12} />
            <Skeleton height={44} borderRadius={12} />
          </div>

          {/* delivery cards */}
          <div className="space-y-3 mt-4">
            <Skeleton height={60} borderRadius={12} />
            <Skeleton height={60} borderRadius={12} />
          </div>
        </div>
      </div>

      {/* Description, Nutrition, Details */}
      <div className="mt-6 p-5 bg-white space-y-10">
        <div className="flex gap-5">
          <Skeleton width={100} height={20} />
          <Skeleton width={100} height={20} />
          <Skeleton width={100} height={20} />
        </div>
        <div>
          <Skeleton width={500} height={20} />
          <Skeleton width={400} height={20} />
          <Skeleton width={450} height={20} />
          <Skeleton width={350} height={20} />
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div className="bg-white mt-6 p-5">
        <div className="flex items-center justify-between gap-5">
          <div className="flex flex-col items-start gap-3">
            <Skeleton width={150} height={20} />
            <Skeleton width={130} height={20} />
          </div>
          <Skeleton width={100} height={20} />
        </div>
        {[0, 1]?.map(() => (
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-3 mt-5 space-y-5">
            <div className="flex items-center justify-between gap-5">
              <div className="flex flex-col items-start">
                <Skeleton width={150} height={20} />
                <Skeleton width={130} height={20} />
              </div>
              <Skeleton width={100} height={20} />
            </div>
            <Skeleton width={400} height={20} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductDetailSkeleton;
