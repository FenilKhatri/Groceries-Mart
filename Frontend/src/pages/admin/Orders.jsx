import { useEffect, useMemo } from "react";
import { useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getOrders } from "../../api/adminApi";
import {
  getOrderBadge,
  getOrderStatusColor,
  getOrderStatusName,
} from "../../components/common/OrderComponent";
import SearchBar from "../../components/reusable-component/SearchBar";
import RefreshButton from "../../components/reusable-component/RefreshButton";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

const AdminOrders = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [debouncingQuery, setDebouncingQuery] = useState("");

  const [sorted, setSorted] = useState({ key: "", direction: "" });

  const LINKS = "px-5 py-3 text-left font-semibold";

  const handleData = async () => {
    setLoading(true);
    try {
      const res = await getOrders();
      setOrders(res.orders);
    } catch (error) {
      return toast.error(error?.message || "Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncingQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredOrders = useMemo(() => {
    const search = debouncingQuery.toLowerCase().trim();

    return orders.filter((order) => {
      return (
        order?._id?.toLowerCase().includes(search) ||
        order?.shippingAddress?.name?.toLowerCase().includes(search) ||
        order?.shippingAddress?.phone?.toLowerCase().includes(search) ||
        order?.orderStatus?.toLowerCase()?.includes(search)
      );
    });
  }, [debouncingQuery, orders]);

  useEffect(() => {
    handleData();
  }, []);

  const handleSorted = (key, direction) => {
    const sorted = [...orders].sort((a, b) => {
      let aValue = a[key] ?? "";
      let bValue = b[key] ?? "";

      if (key === "items") {
        aValue = a?.items?.length ?? 0;
        bValue = b?.items?.length ?? 0;

        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (key === "name") {
        aValue = a?.shippingAddress?.name ?? "";
        bValue = b?.shippingAddress?.name ?? "";
      } else if (key === "phone") {
        aValue = a?.shippingAddress?.phone ?? "";
        bValue = b?.shippingAddress?.phone ?? "";
      } else if (key === "address") {
        aValue = a?.shippingAddress?.address ?? "";
        bValue = b?.shippingAddress?.address ?? "";
      } else {
        aValue = a?.[key] ?? "";
        bValue = b?.[key] ?? "";
      }

      return direction === "asc"
        ? String(aValue).localeCompare(bValue)
        : String(bValue).localeCompare(aValue);
    });
    setOrders(sorted);
    setSorted({ key, direction });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Admin Panel
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Orders Management
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Monitor orders and view order details.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs text-gray-500">Total Orders</p>
          <p className="mt-1 text-xl font-bold text-gray-900 text-center">
            {orders?.length}
          </p>
        </div>
      </div>

      {/* Search */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search for orders..."
      />

      {/* Card */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
          <div className="left-part">
            <p className="text-sm font-semibold text-gray-900">
              Orders Directory
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Below is the list of all orders.
            </p>
          </div>
          {/* Refresh Button */}
          <RefreshButton
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            onRefresh={handleData}
          />
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-2xl font-semibold text-center py-12 animate-pulse">
            Loading orders...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className={LINKS}>Sr No.</th>
                  <th className={LINKS}>
                    <div className="flex items-center justify-between">
                      Total Items
                      <div className="flex items-center justify-center gap-3">
                        <IoMdArrowRoundUp
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("items", "asc")}
                        />
                        <IoMdArrowRoundDown
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("items", "desc")}
                        />
                      </div>
                    </div>
                  </th>
                  <th className={LINKS}>
                    <div className="flex items-center justify-between">
                      Name
                      <div className="flex items-center justify-center gap-3">
                        <IoMdArrowRoundUp
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() =>
                            handleSorted("name", "asc")
                          }
                        />
                        <IoMdArrowRoundDown
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() =>
                            handleSorted("name", "desc")
                          }
                        />
                      </div>
                    </div>
                  </th>
                  <th className={LINKS}>
                    <div className="flex items-center justify-between">
                      Phone
                      <div className="flex items-center justify-center gap-3">
                        <IoMdArrowRoundUp
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() =>
                            handleSorted("phone", "asc")
                          }
                        />
                        <IoMdArrowRoundDown
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() =>
                            handleSorted("phone", "desc")
                          }
                        />
                      </div>
                    </div>
                  </th>
                  <th className={LINKS}>
                    <div className="flex items-center justify-between">
                      Shipping Address
                      <div className="flex items-center justify-center gap-3">
                        <IoMdArrowRoundUp
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() =>
                            handleSorted("address", "asc")
                          }
                        />
                        <IoMdArrowRoundDown
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() =>
                            handleSorted("address", "desc")
                          }
                        />
                      </div>
                    </div>
                  </th>
                  <th className={LINKS}>
                    <div className="flex items-center justify-between">
                      Order Status
                      <div className="flex items-center justify-center gap-3">
                        <IoMdArrowRoundUp
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("orderStatus", "asc")}
                        />
                        <IoMdArrowRoundDown
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("orderStatus", "desc")}
                        />
                      </div>
                    </div>
                  </th>
                  <th className={LINKS}>View</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredOrders?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders?.map((order, index) => {
                    return (
                      <tr
                        key={order._id || index}
                        className="hover:bg-emerald-50/60 transition"
                      >
                        <td className="px-5 py-4">{index + 1}</td>

                        {/* total orders*/}
                        <td className="px-5 py-4">
                          <span className="px-2 py-1">
                            {order?.items?.length}
                          </span>
                        </td>

                        {/* order name */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-semibold text-gray-900 line-clamp-1">
                                {order?.shippingAddress?.name || "-"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          {order?.shippingAddress?.phone || "-"}
                        </td>
                        <td className="px-5 py-4">
                          <div className="line-clamp-1">
                            {(order?.shippingAddress?.address || "-").slice(
                              0,
                              20,
                            )}
                            {order?.shippingAddress?.address?.length > 20 &&
                              "..."}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p
                            className={`rounded-xl border px-3 py-2 text-xs text-center font-semibold flex items-center justify-center gap-3 ${getOrderStatusColor(order?.orderStatus)}`}
                          >
                            {getOrderBadge(order?.orderStatus)}
                            {getOrderStatusName(order?.orderStatus)}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <button
                            onClick={() =>
                              navigate(`/admin/orders/${order._id}`)
                            }
                            className="rounded-xl border px-3 py-2 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                          >
                            View Order
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-100 bg-white px-5 py-4 text-xs text-gray-500">
          Showing {orders?.length} order{orders?.length !== 1 ? "s" : ""}.
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
