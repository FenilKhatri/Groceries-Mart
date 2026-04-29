import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getOrderStats,
  getLatestOrders,
  getMonthlyData,
  getCategoryData,
} from "../../utils/dashboardHelpers";

import { getDashboardData } from "../../features/admin/api";

import DashboardHeader from "../../features/admin/components/dashboard/DashboardHeader";
import StatusGrid from "../../features/admin/components/dashboard/StatusGrid";
import StatsGrid from "../../features/admin/components/dashboard/StatsGrid";
import DeliveryStatusChart from "../../features/admin/components/dashboard/DeliveryStatusChart";
import CategoryInsightsChart from "../../features/admin/components/dashboard/CategoryInsightsChart";
import SalesChart from "../../features/admin/components/dashboard/SalesChart";
import RecentOrdersTable from "../../features/admin/components/dashboard/RecentOrdersTable";
import AdminDashboardSkeleton from "../../shared/components/feedback/skeleton/AdminDashboardSkeleton";
import { ORDER_STATUS } from "../../utils/constants";

const Dashboard = () => {
  const {
    data = {},
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 min cache
  });

  const {
    vendors = [],
    users = [],
    shops = [],
    orders = [],
    products = [],
  } = data?.data || {};

  //  ORDER STATS
  const {
    pendingOrders,
    outForDeliveryOrders,
    deliveredOrders,
    cancelledOrders,
    totalRevenue,
  } = useMemo(() => getOrderStats(orders), [orders]);

  //  DERIVED DATA
  const latestOrders = useMemo(() => getLatestOrders(orders), [orders]);
  const monthlyData = useMemo(() => getMonthlyData(orders), [orders]);
  const categoryData = useMemo(() => getCategoryData(products), [products]);

  const deliveryData = [
    { name: ORDER_STATUS.DELIVERED, value: deliveredOrders },
    { name: ORDER_STATUS.PENDING, value: pendingOrders },
    { name: ORDER_STATUS.OUT_FOR_DELIVERY, value: outForDeliveryOrders },
    { name: ORDER_STATUS.CANCELLED, value: cancelledOrders },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f7fff8] via-[#f8fffb] to-[#eefbf1]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* HEADER */}
        <DashboardHeader
          refreshing={isFetching}
          setRefreshing={() => {}}
          onRefresh={refetch}
        />

        {/* BODY */}
        <div className="mt-8 space-y-6">
          {isLoading ? (
            <AdminDashboardSkeleton />
          ) : (
            <>
              {/* STATS */}
              <StatsGrid
                totalRevenue={totalRevenue}
                totalOrders={orders.length}
                totalProducts={products.length}
                totalUsers={users.length}
              />

              {/* STATUS */}
              <StatusGrid
                vendors={vendors.length}
                shops={shops.length}
                products={products.length}
                pendingOrders={pendingOrders}
                outForDeliveryOrders={outForDeliveryOrders}
                deliveredOrders={deliveredOrders}
                cancelledOrders={cancelledOrders}
              />

              {/* SALES CHART */}
              <SalesChart monthlyData={monthlyData} />

              {/* PIE CHARTS */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <DeliveryStatusChart data={deliveryData} />
                <CategoryInsightsChart data={categoryData} />
              </div>

              {/* RECENT ORDERS */}
              <RecentOrdersTable orders={latestOrders} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
