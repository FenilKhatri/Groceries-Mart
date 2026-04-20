import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getOrders } from "../../api/adminApi";

import SearchBar from "../../components/common/SearchBar";
import RefreshButton from "../../components/common/RefreshButton";
import H3 from "../../components/ui/H3";
import Description from "../../components/ui/Description";
import TotalCounts from "../../components/sections/admin/TotalCounts";
import useDebounce from "../../utils/useDebounce";
import TableTitle from "../../components/sections/admin/TableTitle";
import { orderColumns } from "../../data/pages/adminTable";
import AdminTable from "../../components/sections/admin/Table";
import Button from "../../components/ui/Button";

import {
  getOrderStatusName,
  getOrderBadge,
  getOrderStatusColor,
} from "../../utils/order";

import { useQuery } from "@tanstack/react-query";

const AdminOrders = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [sorted, setSorted] = useState({
    key: "",
    direction: "",
  });

  const {
    data: orders = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    staleTime: 5 * 60 * 1000,
    select: (res) => res?.orders || [],
    onError: (err) => {
      toast.error(err?.message || "Failed to fetch orders");
    },
  });

  // Safe field mapping for sorting
  const getFieldValue = (order, key) => {
    const map = {
      items: order?.items?.length,
      name: order?.shippingAddress?.name,
      phone: order?.shippingAddress?.phone,
      address: order?.shippingAddress?.address,
    };

    return map[key] ?? order?.[key] ?? "";
  };

  // Sorting
  const sortedOrders = useMemo(() => {
    if (!sorted.key) return orders;

    return [...orders].sort((a, b) => {
      const aValue = getFieldValue(a, sorted.key);
      const bValue = getFieldValue(b, sorted.key);

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sorted.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return sorted.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [orders, sorted]);

  // Filtering
  const filteredOrders = useMemo(() => {
    const search = debouncedQuery.toLowerCase().trim();

    return sortedOrders.filter((o) => {
      const { _id, orderStatus, shippingAddress = {} } = o;

      return [_id, orderStatus, shippingAddress.name, shippingAddress.phone]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(search));
    });
  }, [debouncedQuery, sortedOrders]);

  const handleSorted = (key, direction) => {
    setSorted({ key, direction });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* HEADER */}
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

        <TotalCounts length={orders?.length}>Orders</TotalCounts>
      </div>

      {/* SEARCH */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search for orders..."
      />

      {/* TABLE */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
          <TableTitle
            Title="Orders Directory"
            Description="Below is the list of all orders."
          />

          <RefreshButton
            refreshing={isFetching}
            setRefreshing={() => {}}
            onRefresh={refetch}
          />
        </div>

        {/* TABLE */}
        <AdminTable
          columns={orderColumns}
          data={filteredOrders}
          loading={isLoading}
          onSort={handleSorted}
          emptyMessage="No orders found"
          children="order"
          length={orders?.length}
          renderRow={(order, index) => (
            <OrderRow
              key={order._id || index}
              order={order}
              index={index}
              navigate={navigate}
            />
          )}
        />
      </div>
    </div>
  );
};

export default AdminOrders;

//  ORDER ROW 

const OrderRow = ({ order, index, navigate }) => {
  const { shippingAddress = {}, items = [], orderStatus } = order;

  return (
    <tr className="hover:bg-emerald-50/60 transition">
      <td className="px-5 py-4">{index + 1}</td>
      <td className="px-5 py-4">{items.length}</td>

      <td className="px-5 py-4 font-semibold text-gray-900">
        {shippingAddress.name || "-"}
      </td>

      <td className="px-5 py-4">{shippingAddress.phone || "-"}</td>

      <td className="px-5 py-4 line-clamp-1">
        {(shippingAddress.address || "-").slice(0, 20)}
        {shippingAddress.address?.length > 20 && "..."}
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
