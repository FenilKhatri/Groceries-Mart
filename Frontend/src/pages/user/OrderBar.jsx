import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { allOrders } from "../../api/userApi";

const OrderBar = () => {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await allOrders();
      setOrders(res.orders || []);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const counts = useMemo(() => {
    return {
      all: orders.length,
      processing: orders.filter((order) =>
        ["placed", "out_for_delivery", "confirmed", "packed"].includes(
          order?.orderStatus,
        ),
      ).length,
      completed: orders.filter((order) =>
        ["delivered"].includes(order?.orderStatus),
      ).length,
      cancelled: orders.filter((order) =>
        ["cancelled"].includes(order?.orderStatus),
      ).length,
    };
  }, [orders]);

  const tabs = [
    { label: "All Orders", to: "", count: counts.all, end: true },
    { label: "Processing", to: "processing", count: counts.processing },
    { label: "Completed", to: "completed", count: counts.completed },
    { label: "Cancelled", to: "cancelled", count: counts.cancelled },
  ];

  return (
    <div className="w-full flex gap-5 border-b-2 border-b-gray-300 overflow-x-auto">
      {tabs.map((tab) => (
        <NavLink key={tab.label} to={tab.to} end={tab.end}>
          {({ isActive }) => (
            <div
              className={`flex items-center gap-3 pb-2 whitespace-nowrap transition ${
                isActive
                  ? "text-emerald-500 font-semibold border-b-2 border-emerald-500"
                  : "text-gray-400 hover:text-emerald-400"
              }`}
            >
              <span>{tab.label}</span>

              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default OrderBar;
