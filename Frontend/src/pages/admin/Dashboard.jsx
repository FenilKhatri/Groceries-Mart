import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getDashboardData } from "../../api/adminApi";

import {
  getOrderStats,
  getLatestOrders,
  getMonthlyData,
  getCategoryData,
} from "../../utils/dashboardHelpers";

import DashboardHeader from "../../components/sections/admin/dashboard/DashboardHeader";
import StatsGrid from "../../components/sections/admin/dashboard/StatsGrid";
import StatusGrid from "../../components/sections/admin/dashboard/StatusGrid";
import DeliveryStatusChart from "../../components/sections/admin/dashboard/DeliveryStatusChart";
import CategoryInsightsChart from "../../components/sections/admin/dashboard/CategoryInsightsChart";
import SalesChart from "../../components/sections/admin/dashboard/SalesChart";
import RecentOrdersTable from "../../components/sections/admin/dashboard/RecentOrdersTable";
import AdminDashboardSkeleton from "../../components/skeleton/AdminDashboardSkeleton";

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
  } = data;

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
    { name: "Delivered", value: deliveredOrders },
    { name: "Pending", value: pendingOrders },
    { name: "Out for Delivery", value: outForDeliveryOrders },
    { name: "Cancelled", value: cancelledOrders },
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
