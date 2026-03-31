import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderSummarySkeleton = () => {
  return (
    <>
      <div className="mt-6 space-y-4">
        {[0, 1].map((index) => (
          <div className="flex items-center justify-between" key={index}>
            <Skeleton width={100} height={20} />
            <Skeleton width={30} height={20} />
          </div>
        ))}

        <div className="pt-5 border-t border-gray-200 flex items-center justify-between">
          <Skeleton width={120} height={30} />
          <Skeleton width={40} height={30} />
        </div>

        <div className="w-full flex items-center justify-center gap-5 flex-col">
          <Skeleton width={340} height={50} />
          <Skeleton width={120} height={20} />
        </div>
      </div>
    </>
  );
};

export default OrderSummarySkeleton;
