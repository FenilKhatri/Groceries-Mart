import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getOrders } from "../../api/adminApi";

import SearchBar from "../../components/common/SearchBar";
import RefreshButton from "../../components/common/RefreshButton";
import H3 from "../../components/ui/H3";
import Description from "../../components/ui/Description";
import TotalCounts from "../../components/sections/admin/TotalCounts";
import useDebounce from "../../utils/useDebounce";
import TableTitle from "../../components/sections/about/TableTitle";
import { orderColumns } from "../../data/adminTable";
import AdminTable from "../../components/sections/admin/Table";
import Button from "../../components/ui/Button";

import {
  getOrderStatusName,
  getOrderBadge,
  getOrderStatusColor,
} from "../../utils/order";

const AdminOrders = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [sorted, setSorted] = useState({ key: "", direction: "" });

  const navigate = useNavigate();

  // 🔹 Fetch Orders
  const handleData = async () => {
    setLoading(true);
    try {
      const res = await getOrders();
      setOrders(res.orders);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  const debouncingQuery = useDebounce(query, 500);

  const filteredOrders = useMemo(() => {
    const search = debouncingQuery.toLowerCase().trim();

    return orders.filter((o) => {
      const { _id, orderStatus, shippingAddress = {} } = o;

      return [_id, orderStatus, shippingAddress.name, shippingAddress.phone]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(search));
    });
  }, [debouncingQuery, orders]);

  const getFieldValue = (order, key) => {
    const map = {
      items: order?.items?.length,
      name: order?.shippingAddress?.name,
      phone: order?.shippingAddress?.phone,
      address: order?.shippingAddress?.address,
    };

    return map[key] ?? order?.[key] ?? "";
  };

  const handleSorted = (key, direction) => {
    const sortedData = [...orders].sort((a, b) => {
      const aValue = getFieldValue(a, key);
      const bValue = getFieldValue(b, key);

      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    setOrders(sortedData);
    setSorted({ key, direction });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
            admin panel
          </p>
          <H3>Orders Management</H3>
          <Description className="text-gray-500">
            Monitor orders and update orders status.
          </Description>
        </div>

        <div className="flex items-center gap-3">
          <TotalCounts length={orders?.length}>Orders</TotalCounts>
        </div>
      </div>

      {/* Search */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search for orders..."
      />

      {/* Table Card */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
          <TableTitle
            Title="Orders Directory"
            Description="Below is the list of all orders."
          />

          <RefreshButton
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            onRefresh={handleData}
          />
        </div>

        {/* Table */}
        <AdminTable
          columns={orderColumns}
          data={filteredOrders}
          loading={loading}
          onSort={handleSorted}
          emptyMessage="No orders found"
          renderRow={(order, index) => (
            <OrderRow
              key={order._id || index}
              order={order}
              index={index}
              navigate={navigate}
            />
          )}
          children="order"
          length={orders?.length}
        />
      </div>
    </div>
  );
};

export default AdminOrders;

const OrderRow = ({ order, index, navigate }) => {
  const { shippingAddress = {}, items = [], orderStatus } = order;

  return (
    <tr className="hover:bg-emerald-50/60 transition">
      <td className="px-5 py-4">{index + 1}</td>

      <td className="px-5 py-4">{items.length}</td>

      <td className="px-5 py-4">
        <p className="font-semibold text-gray-900 line-clamp-1">
          {shippingAddress.name || "-"}
        </p>
      </td>

      <td className="px-5 py-4">{shippingAddress.phone || "-"}</td>

      <td className="px-5 py-4">
        <div className="line-clamp-1">
          {(shippingAddress.address || "-").slice(0, 20)}
          {shippingAddress.address?.length > 20 && "..."}
        </div>
      </td>

      <td className="px-5 py-4">
        <p
          className={`rounded-xl border px-3 py-2 text-xs font-semibold flex items-center justify-center gap-2 ${getOrderStatusColor(
            orderStatus,
          )}`}
        >
          {getOrderBadge(orderStatus)}
          {getOrderStatusName(orderStatus)}
        </p>
      </td>

      <td className="px-5 py-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/orders/${order._id}`)}
        >
          View Order
        </Button>
      </td>
    </tr>
  );
};
