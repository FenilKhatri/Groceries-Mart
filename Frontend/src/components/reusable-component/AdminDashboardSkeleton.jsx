import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ChartCardSkeleton = ({
  badgeWidth = 90,
  chartHeight = "h-80",
  legendCount = 4,
}) => {
  return (
    <div className="rounded-[30px] border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton width={170} height={24} />
          <div className="mt-2">
            <Skeleton width={240} height={16} />
          </div>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2">
          <Skeleton circle width={18} height={18} />
          <Skeleton width={badgeWidth} height={14} />
        </div>
      </div>

      <div
        className={`mt-6 ${chartHeight} rounded-[26px] border-2 border-dashed border-emerald-200 bg-linear-to-br from-emerald-50 to-lime-50/60 p-4`}
      >
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <Skeleton circle width={190} height={190} />
          </div>

          <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: legendCount }).map((_, i) => (
              <div key={i} className="flex items-center justify-center gap-2">
                <Skeleton width={12} height={12} />
                <Skeleton width={60} height={14} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SalesAnalyticsSkeleton = () => {
  return (
    <div className="h-full min-h-90 rounded-[30px] border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton width={150} height={24} />
          <div className="mt-2">
            <Skeleton width={230} height={16} />
          </div>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2">
          <Skeleton circle width={18} height={18} />
          <Skeleton width={70} height={14} />
        </div>
      </div>

      <div className="mt-6 h-86 rounded-[26px] border-2 border-dashed border-emerald-200 bg-linear-to-br from-emerald-50 to-lime-50/60 p-4">
        <div className="flex h-full flex-col justify-between">
          {/* fake chart area */}
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            {/* horizontal grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} width="100%" height={1} />
              ))}
            </div>

            {/* line chart placeholder */}
            <div className="absolute inset-x-6 bottom-10 top-8 flex items-end justify-between">
              {[45, 70, 55, 85, 60, 95, 75, 110, 80, 120, 90, 130].map(
                (h, i) => (
                  <div key={i} className="flex items-end gap-2">
                    <Skeleton width={6} height={h} borderRadius={999} />
                    <Skeleton
                      width={6}
                      height={Math.max(35, h - 22)}
                      borderRadius={999}
                    />
                  </div>
                ),
              )}
            </div>

            {/* x-axis labels */}
            <div className="absolute inset-x-4 bottom-0 flex items-center justify-between">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} width={32} height={12} />
              ))}
            </div>
          </div>

          {/* legend */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Skeleton width={12} height={12} />
              <Skeleton width={50} height={14} />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton width={12} height={12} />
              <Skeleton width={60} height={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecentOrdersTableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="overflow-hidden rounded-[30px] border border-emerald-100 bg-white shadow-sm">
      <div className="border-b border-emerald-50 px-6 py-5">
        <Skeleton width={140} height={24} />
        <div className="mt-2">
          <Skeleton width={260} height={16} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-emerald-50/70">
            <tr>
              {Array.from({ length: 6 }).map((_, i) => (
                <th key={i} className="px-5 py-4 text-left">
                  <div className="flex items-center justify-between gap-3">
                    <Skeleton width={70} height={16} />
                    {i !== 5 ? <Skeleton width={28} height={16} /> : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-emerald-50">
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i}>
                <td className="px-5 py-4">
                  <Skeleton width={110} height={14} />
                </td>
                <td className="px-5 py-4">
                  <Skeleton width={90} height={14} />
                </td>
                <td className="px-5 py-4">
                  <Skeleton width={80} height={14} />
                </td>
                <td className="px-5 py-4">
                  <Skeleton width={20} height={14} />
                </td>
                <td className="px-5 py-4">
                  <Skeleton width={60} height={14} />
                </td>
                <td className="px-5 py-4">
                  <Skeleton width={85} height={28} borderRadius={999} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminDashboardSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Top cards */}
      <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full rounded-[30px] border border-emerald-100 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-5">
              <Skeleton width={52} height={52} borderRadius={16} />
              <Skeleton width={78} height={26} borderRadius={999} />
            </div>

            <div className="mt-4">
              <Skeleton width={120} height={16} />
            </div>

            <div>
              <Skeleton width={90} height={32} />
            </div>

            <div>
              <Skeleton width="80%" height={12} />
              <Skeleton width={36} height={12} />
            </div>
          </div>
        ))}
      </div>

      {/* Status cards */}
      <div className="w-full grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-7">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="w-full rounded-3xl border border-emerald-100 bg-white p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <Skeleton width={38} height={38} borderRadius={12} />
              <Skeleton width={60} height={15} borderRadius={999} />
            </div>

            <div className="mt-5">
              <Skeleton width={56} height={28} />
            </div>
          </div>
        ))}
      </div>

      {/* Sales Analytics */}
      <div className="w-full">
        <SalesAnalyticsSkeleton />
      </div>

      {/* Delivery + Category charts */}
      <div className="w-full grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCardSkeleton badgeWidth={60} chartHeight="h-80" legendCount={4} />
        <ChartCardSkeleton badgeWidth={80} chartHeight="h-80" legendCount={6} />
      </div>

      {/* Recent Orders table */}
      <div className="w-full">
        <RecentOrdersTableSkeleton rows={5} />
      </div>
    </div>
  );
};

export default AdminDashboardSkeleton;
