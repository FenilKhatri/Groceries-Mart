import { useMemo } from "react";

import useDashboardData from "../../hooks/useDashboardData";
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
    vendors,
    users,
    shops,
    orders,
    products,
    loading,
    refreshing,
    setRefreshing,
    fetchDashboardData,
  } = useDashboardData();

  const {
    pendingOrders,
    outForDeliveryOrders,
    deliveredOrders,
    cancelledOrders,
    totalRevenue,
  } = useMemo(() => getOrderStats(orders), [orders]);

  const latestOrders = useMemo(() => getLatestOrders(orders), [orders]);
  const monthlyData = useMemo(() => getMonthlyData(orders), [orders]);
  const categoryData = useMemo(() => getCategoryData(products), [products]);

  const cardBase =
    "rounded-[28px] border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md";

  const smallStatusCard =
    "rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md";

  const deliveryData = [
    { name: "Delivered", value: deliveredOrders },
    { name: "Pending", value: pendingOrders },
    { name: "Out for Delivery", value: outForDeliveryOrders },
    { name: "Cancelled", value: cancelledOrders },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f7fff8] via-[#f8fffb] to-[#eefbf1]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          onRefresh={fetchDashboardData}
        />

        <div className="mt-8 space-y-6">
          {loading ? (
            <AdminDashboardSkeleton />
          ) : (
            <>
              {/* Top cards + sales chart */}
              <StatsGrid
                totalRevenue={totalRevenue}
                totalOrders={orders.length}
                totalProducts={products.length}
                totalUsers={users.length}
                cardBase={cardBase}
              />

              {/* Status cards */}
              <StatusGrid
                vendors={vendors.length}
                shops={shops.length}
                products={products.length}
                pendingOrders={pendingOrders}
                outForDeliveryOrders={outForDeliveryOrders}
                deliveredOrders={deliveredOrders}
                cancelledOrders={cancelledOrders}
                smallStatusCard={smallStatusCard}
              />

              {/* Sales Chart */}
              <SalesChart monthlyData={monthlyData} />

              {/* Pie charts */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <DeliveryStatusChart data={deliveryData} />
                <CategoryInsightsChart data={categoryData} />
              </div>

              {/* Recent orders table */}
              <RecentOrdersTable orders={latestOrders} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
