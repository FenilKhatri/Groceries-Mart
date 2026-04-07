import { useEffect, useState } from "react";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

const RecentOrdersTable = ({ orders = [] }) => {
  const [ordersData, setOrdersData] = useState([]);
  const [sorted, setSorted] = useState({ key: "", direction: "" });

  const LINKS = "px-5 py-4 text-left font-semibold";

  useEffect(() => {
    setOrdersData(orders);
  }, [orders]);

  const getValue = (order, key) => {
    switch (key) {
      case "_id":
        return order?._id || "";
      case "customer":
        return order?.shippingAddress?.name || "";
      case "createdAt":
        return order?.createdAt ? new Date(order.createdAt).getTime() : 0;
      case "items":
        return order?.items?.length || 0;
      case "totalAmount":
        return order?.totalAmount || 0;
      case "orderStatus":
        return order?.orderStatus || "";
      default:
        return "";
    }
  };

  const handleSorted = (key, direction) => {
    const sortedOrders = [...ordersData].sort((a, b) => {
      const aValue = getValue(a, key);
      const bValue = getValue(b, key);

      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    setOrdersData(sortedOrders);
    setSorted({ key, direction });
  };

  return (
    <div className="overflow-hidden rounded-[30px] border border-emerald-100 bg-white shadow-sm">
      <div className="border-b border-emerald-50 px-6 py-5">
        <p className="text-lg font-bold text-gray-900">Recent Orders</p>
        <p className="mt-1 text-sm text-gray-500">
          Latest grocery orders placed on the platform.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-emerald-50/70 text-gray-600">
            <tr>
              <th className={LINKS}>
                <div className="flex items-center justify-between">
                  Order ID
                  <div className="flex items-center gap-3">
                    <IoMdArrowRoundUp
                      className="cursor-pointer transition duration-300 hover:text-emerald-500"
                      onClick={() => handleSorted("_id", "asc")}
                    />
                    <IoMdArrowRoundDown
                      className="cursor-pointer transition duration-300 hover:text-emerald-500"
                      onClick={() => handleSorted("_id", "desc")}
                    />
                  </div>
                </div>
              </th>

              <th className={LINKS}>
                <div className="flex items-center justify-between">
                  Customer
                  <div className="flex items-center gap-3">
                    <IoMdArrowRoundUp
                      className="cursor-pointer transition duration-300 hover:text-emerald-500"
                      onClick={() => handleSorted("customer", "asc")}
                    />
                    <IoMdArrowRoundDown
                      className="cursor-pointer transition duration-300 hover:text-emerald-500"
                      onClick={() => handleSorted("customer", "desc")}
                    />
                  </div>
                </div>
              </th>

              <th className={LINKS}>
                <div className="flex items-center justify-between">
                  Date
                  <div className="flex items-center gap-3">
                    <IoMdArrowRoundUp
                      className="cursor-pointer transition duration-300 hover:text-emerald-500"
                      onClick={() => handleSorted("createdAt", "asc")}
                    />
                    <IoMdArrowRoundDown
                      className="cursor-pointer transition duration-300 hover:text-emerald-500"
                      onClick={() => handleSorted("createdAt", "desc")}
                    />
                  </div>
                </div>
              </th>

              <th className={LINKS}>
                <div className="flex items-center justify-between">
                  Items
                  <div className="flex items-center gap-3">
                    <IoMdArrowRoundUp
                      className="cursor-pointer transition duration-300 hover:text-emerald-500"
                      onClick={() => handleSorted("items", "asc")}
                    />
                    <IoMdArrowRoundDown
                      className="cursor-pointer transition duration-300 hover:text-emerald-500"
                      onClick={() => handleSorted("items", "desc")}
                    />
                  </div>
                </div>
              </th>

              <th className={LINKS}>
                <div className="flex items-center justify-between">
                  Amount
                  <div className="flex items-center gap-3">
                    <IoMdArrowRoundUp
                      className="cursor-pointer transition duration-300 hover:text-emerald-500"
                      onClick={() => handleSorted("totalAmount", "asc")}
                    />
                    <IoMdArrowRoundDown
                      className="cursor-pointer transition duration-300 hover:text-emerald-500"
                      onClick={() => handleSorted("totalAmount", "desc")}
                    />
                  </div>
                </div>
              </th>

              <th className={LINKS}>Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-emerald-50">
            {ordersData.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-gray-500"
                >
                  No recent orders found
                </td>
              </tr>
            ) : (
              ordersData.map((order) => (
                <tr
                  key={order?._id}
                  className="transition hover:bg-emerald-50/40"
                >
                  <td className="px-5 py-4 font-mono text-xs text-gray-700">
                    {order?._id || "-"}
                  </td>
                  <td className="px-5 py-4 text-gray-800">
                    {order?.shippingAddress?.name || "-"}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-5 py-4 text-gray-800">
                    {order?.items?.length || 0}
                  </td>
                  <td className="px-5 py-4 font-semibold text-gray-900">
                    ₹{order?.totalAmount || 0}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                      {(order?.orderStatus || "-").replaceAll("_", " ")}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
