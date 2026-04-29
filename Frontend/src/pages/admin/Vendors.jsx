import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import {
  getVendors,
  approveVendorRequest,
  rejectVendorRequest,
  deleteVendorRequest,
} from "../../features/admin/api";

import Description from "../../shared/components/ui/Description";
import H3 from "../../shared/components/ui/H3";

import SearchBar from "../../shared/components/common/SearchBar";
import RefreshButton from "../../shared/components/common/RefreshButton";
import TotalCounts from "../../features/admin/components/TotalCounts";
import useDebounce from "../../hooks/useDebounce";
import TableTitle from "../../features/admin/components/TableTitle";
import AdminTable from "../../features/admin/components/Table";

import { useQuery } from "@tanstack/react-query";
import { vendorColumns } from "../../data/pages/adminTableData";
import { actions } from "../../utils/constants";

const AdminVendors = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [action, setAction] = useState(null);
  const busy = !!action;

  const [order, setOrder] = useState({
    key: "",
    direction: "",
  });

  //  VENDORS QUERY
  const {
    data: vendors = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: getVendors,
    select: (res) => res?.vendors || [],
    staleTime: 5 * 60 * 1000,
    onError: (err) => {
      toast.error(err?.message || "Failed to fetch vendors!");
    },
  });

  const act = async (type, vendorId) => {
    if (busy) return;

    const confirmed = window.confirm(
      `Are you sure you want to ${type} vendor?`,
    );
    if (!confirmed) return;

    try {
      setAction({ type, id: vendorId });

      const apiMap = {
        approve: approveVendorRequest,
        reject: rejectVendorRequest,
        delete: deleteVendorRequest,
      };

      await apiMap[type](vendorId);

      toast.success(
        type === "approve"
          ? "Vendor approved!"
          : type === "reject"
            ? "Vendor rejected!"
            : "Vendor deleted!",
      );

      refetch();
    } catch (error) {
      toast.error(error?.message || "Action failed!");
    } finally {
      setAction(null);
    }
  };

  const isActing = (type, id) => action?.type === type && action?.id === id;

  //  FILTER
  const filteredVendors = useMemo(() => {
    const search = debouncedQuery.toLowerCase().trim();

    return vendors.filter((vendor) => {
      return (
        vendor?._id?.toLowerCase().includes(search) ||
        vendor?.name?.toLowerCase().includes(search) ||
        vendor?.email?.toLowerCase().includes(search)
      );
    });
  }, [vendors, debouncedQuery]);

  //  SORT
  const sortedVendors = useMemo(() => {
    if (!order.key) return filteredVendors;

    return [...filteredVendors].sort((a, b) => {
      const aValue = a[order.key] ?? "";
      const bValue = b[order.key] ?? "";

      return order.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredVendors, order]);

  const handleSort = (key, direction) => {
    setOrder({ key, direction });
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-4xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
              admin panel
            </p>
            <H3>Vendors Management</H3>
            <Description className="text-gray-500">
              Monitor vendor accounts and view details.
            </Description>
          </div>

          <TotalCounts length={vendors?.length}>Vendors</TotalCounts>
        </div>

        {/* SEARCH */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search for vendors..."
        />

        {/* TABLE */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
            <TableTitle
              Title="Vendor Directory"
              Description="Below is the list of all vendors."
            />

            <RefreshButton
              refreshing={isFetching}
              setRefreshing={() => {}}
              onRefresh={refetch}
            />
          </div>

          {/* TABLE */}
          <AdminTable
            columns={vendorColumns}
            data={sortedVendors}
            loading={isLoading}
            onSort={handleSort}
            emptyMessage="No vendors found"
            children="vendor"
            length={vendors?.length}
            renderRow={(vendor, index) => (
              <tr
                key={vendor._id || index}
                className="hover:bg-emerald-50/60 transition"
              >
                <td className="px-5 py-4">{index + 1}</td>

                <td className="px-5 py-4 font-mono text-xs">{vendor._id}</td>

                <td className="px-5 py-4">{vendor.name}</td>
                <td className="px-5 py-4">{vendor.email}</td>
                <td className="px-5 py-4">{vendor.phone}</td>

                <td className="px-5 py-4 grid grid-cols-3 gap-2">
                  {actions?.map((action) => (
                    <button
                      key={action?.key}
                      disabled={busy || action?.disabledCheck(vendor.status)}
                      onClick={() => act(action?.key, vendor._id)}
                      className={`rounded-xl px-3 py-2 text-xs font-semibold cursor-pointer ${action?.bg} ${action?.hover} disabled:bg-gray-100`}
                    >
                      {isActing(action?.key, vendor._id)
                        ? action?.loadingLabel
                        : action?.label}
                    </button>
                  ))}
                </td>
              </tr>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminVendors;
