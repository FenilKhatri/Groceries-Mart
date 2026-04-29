const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const OrderDetailsSkeleton = () => {
  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            {/* Left */}
            <div className="flex-1 space-y-3">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-6 w-56" />

              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>

              <div className="flex gap-4 mt-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            {/* Right */}
            <div className="w-full xl:w-auto">
              <Skeleton className="h-11 w-full sm:w-32 rounded-xl" />
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="my-5">
          <Skeleton className="h-3 w-40 mb-3" />

          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full sm:w-40 rounded-xl" />
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT SECTION */}
          <div className="col-span-12 lg:col-span-8 space-y-5">
            {/* OrderCard Skeleton */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4">
              <Skeleton className="h-5 w-40" />

              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 items-center">
                  <Skeleton className="h-16 w-16 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>

            {/* OrderStatusProgress Skeleton */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4">
              <Skeleton className="h-5 w-40" />
              <div className="flex justify-between items-center mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Note */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <Skeleton className="h-5 w-40" />
              </div>

              <div className="border-t border-gray-300 p-6 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            {/* Customer Details */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <Skeleton className="h-5 w-40" />
              </div>

              <div className="p-6 border-t space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <Skeleton className="h-5 w-40" />
              </div>

              <div className="p-6 border-t space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-28" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <Skeleton className="h-5 w-40" />
              </div>

              <div className="p-6 border-t space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-28" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
