import React from "react";
import Skeleton from "react-loading-skeleton";

const UserOrderSkeleton = ({ count = 1 }) => {
  return (
    <div className="space-y-4 sm:space-y-5">
      {Array.from({ length: count }).map((_, orderIndex) => (
        <div
          key={orderIndex}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-md sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start justify-center gap-5">
              {["Order Id", "Date Placed", "Shipped To"].map((label, index) => (
                <div className="flex flex-col space-y-1" key={index}>
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    {label}
                  </p>
                  <Skeleton width={100} height={18} />
                </div>
              ))}
            </div>

            <Skeleton height={35} width={180} />
          </div>

          <hr className="my-4 border-gray-200" />
          <div className="py-2">
            <Skeleton width={180} height={28} />
          </div>

          {Array.from({ length: count }).map((_, itemIndex) => (
            <div className="py-3" key={itemIndex}>
              <div className="w-full flex items-center justify-between gap-5">
                <div className="w-full flex items-start justify-center gap-3">
                  <Skeleton height={60} width={60} />
                  <div className="w-full flex flex-col items-start justify-center">
                    <Skeleton height={15} width={100} />
                    <Skeleton height={15} width={50} />
                  </div>
                </div>
                <Skeleton height={30} width={50} />
              </div>
            </div>
          ))}

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton width={150} height={18} />
            <Skeleton width={180} height={18} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrderSkeleton;
