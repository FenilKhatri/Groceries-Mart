import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VendorProductsSkeleton = ({ count }) => {
  return (
    <>
      {/* Title Section */}
      <div className="overflow-hidden rounded-[28px] shadow-sm">
        <div className="flex flex-col gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-6 bg-white">
          <div className="flex items-start gap-4">
            <Skeleton width={50} height={50} borderRadius={10} />

            <div>
              <Skeleton width={200} height={30} />
              <div className="flex flex-col items-start fap-3">
                <Skeleton width={600} />
                <Skeleton width={100} />
              </div>
            </div>
          </div>
          <Skeleton width={150} height={40} borderRadius={10} />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map(() => (
          <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton width={100} height={10} />
                <Skeleton width={30} height={30} />
              </div>

              <div>
                <Skeleton width={40} height={40} borderRadius={10} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mt-5 group flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus-within:border-emerald-400 focus-within:shadow-lg">
        <Skeleton width={40} height={40} borderRadius={10} />
        <Skeleton width={150} height={20} borderRadius={10} />
      </div>

      {/* Products */}
      <div className="overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-xl">
        <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <Skeleton width={40} height={40} borderRadius={20} />
            <div>
              <Skeleton width={150} height={20} />
              <Skeleton width={380} height={15} />
            </div>
          </div>
          <Skeleton width={100} height={30} borderRadius={10} />
        </div>
        <div>
          <table className="w-full">
            <thead>
              <tr>
                {[0, 1, 2, 3, 4, 5]?.map((i) => (
                  <th className="px-3 py-2 text-left bg-gray-100" key={i}>
                    <Skeleton width={60} height={20} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: count || "5" })?.map((_, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <Skeleton width={20} height={20} />
                  </td>
                  <td className="px-4 py-3 flex items-center justify-start gap-3">
                    <Skeleton width={70} height={70} />
                    <div className="flex flex-col items-start justify-center">
                      <Skeleton width={120} height={15} />
                      <Skeleton width={90} height={15} />
                    </div>
                  </td>
                  {[0, 1, 2].map(() => (
                    <td className="px-4 py-3">
                      <Skeleton width={100} height={20} />
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <Skeleton width={100} height={30} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VendorProductsSkeleton;
