import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VendorDashboardSkeleton = ({
  count = 4,
  outOfStockProductCount = 5,
  lowProductCount = 5,
}) => {
  const tableLength = [lowProductCount, outOfStockProductCount];
  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex w-full items-start justify-start gap-5 rounded-2xl bg-white p-4 shadow-md"
          >
            <div className="shrink-0">
              <Skeleton width={50} height={50} borderRadius={10} />
            </div>

            <div className="flex flex-col gap-3">
              <Skeleton width={100} height={18} />
              <Skeleton width={30} height={28} />
            </div>
          </div>
        ))}
      </div>

      {/* Low Stock Product table and Out of Stock Product Table */}
      {tableLength.map((rowCount, tableIndex) => (
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm" key={tableIndex}>
          <div className="p-5">
            <Skeleton width={200} height={20} />
            <div className="mt-2">
              <Skeleton width={250} height={18} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <Skeleton width={100} height={20} />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <Skeleton width={100} height={20} />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <Skeleton width={100} height={20} />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <Skeleton width={100} height={20} />
                  </th>
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: rowCount }).map((_, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <Skeleton width={100} height={20} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton width={100} height={20} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton width={100} height={20} />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton width={100} height={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorDashboardSkeleton;
