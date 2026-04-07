import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import {
  getVendors,
  approveVendorRequest,
  rejectVendorRequest,
  deleteVendorRequest,
} from "../../api/adminApi";
import SearchBar from "../../components/common/SearchBar";
import RefreshButton from "../../components/common/RefreshButton";
import Description from "../../components/ui/Description";
import H3 from "../../components/ui/H3";
import TotalCounts from "../../components/sections/admin/TotalCounts";
import useDebounce from "../../utils/useDebounce";
import TableTitle from "../../components/sections/about/TableTitle";
import AdminTable from "../../components/sections/admin/Table";
import { vendorColumns } from "../../data/adminTable";

const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [query, setQuery] = useState("");

  const [order, setOrder] = useState({ key: "", direction: "" });

  const busy = !!action;
  const LINKS = "px-5 py-3 text-left font-semibold";

  const handleData = async () => {
    try {
      setLoading(true);
      const data = await getVendors();
      setVendors(data?.vendors || []);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch vendor!");
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  const act = async (type, vendorId) => {
    if (busy) return;
    const res = confirm(`Are you sure you want to do ${type} vendor?`);
    if (!res) return;

    try {
      setAction({ type, id: vendorId });

      const api =
        type === "approve"
          ? approveVendorRequest
          : type === "reject"
            ? rejectVendorRequest
            : deleteVendorRequest;

      const data = await api(vendorId);

      toast.info(
        data?.message ||
          (type === "approve"
            ? "Vendor approved!"
            : type === "reject"
              ? "Vendor rejected!"
              : "Vendor deleted!"),
      );

      // Update row locally (fast UI)
      setVendors((prev) =>
        prev.map((v) => {
          if (v._id !== vendorId) return v;

          // Prefer server-returned vendor if available
          const updated = data?.vendor || data?.updatedVendor || null;
          if (updated) return updated;

          // fallback local patch
          return {
            ...v,
            status:
              type === "approve"
                ? "approved"
                : type === "reject"
                  ? "rejected"
                  : "deleted",
          };
        }),
      );
    } catch (error) {
      toast.error(error?.message || "Action failed!");
    } finally {
      setAction(null);
      handleData();
    }
  };

  const isActing = (type, id) => action?.type === type && action?.id === id;

  const debouncingQuery = useDebounce(query, 500);
  const filteredVendors = useMemo(() => {
    const search = debouncingQuery.toLowerCase().trim();

    return vendors?.filter((vendor) => {
      return (
        vendor?._id?.toLowerCase().includes(search) ||
        vendor?.name?.toLowerCase().includes(search) ||
        vendor?.email?.toLowerCase().includes(search)
      );
    });
  }, [vendors, debouncingQuery]);

  useEffect(() => {
    handleData();
  }, []);

  const handleSort = (key, direction) => {
    const sorted = [...vendors].sort((a, b) => {
      const aValue = a[key] ?? "";
      const bValue = b[key] ?? "";

      return direction === "asc"
        ? String(aValue).localeCompare(bValue)
        : String(bValue).localeCompare(aValue);
    });
    setVendors(sorted);
    setOrder({ key, direction });
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-4xl">
      {/* Page shell */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
              admin panel
            </p>
            <H3 children="Vendors Management" />
            <Description
              children="Monitor vendor accounts and view registered vendor details."
              className="text-gray-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <TotalCounts children="Vendors" length={vendors?.length} />
          </div>
        </div>

        {/* Search */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search for vendors..."
        />

        {/* Card */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
            <TableTitle
              Title="Vendor Directory"
              Description="Below is the list of all vendors."
            />
            {/* Refresh button */}
            <RefreshButton
              refreshing={refreshing}
              setRefreshing={setRefreshing}
              onRefresh={handleData}
            />
          </div>

          {/* Table */}
          <AdminTable
            columns={vendorColumns}
            data={filteredVendors}
            loading={loading}
            onSort={handleSort}
            emptyMessage="No vendors found"
            renderRow={(vendor, index) => (
              <tr
                key={vendor._id || index}
                className="hover:bg-emerald-50/60 transition"
              >
                <td className="px-5 py-4">{index + 1}</td>
                <td className="px-5 py-4">
                  <span className="font-mono text-xs bg-gray-50 border px-2 py-1 rounded-lg">
                    {vendor?._id}
                  </span>
                </td>
                <td className="px-5 py-4">{vendor.name}</td>
                <td className="px-5 py-4">{vendor.email}</td>
                <td className="px-5 py-4">{vendor.phone}</td>
                <td className="px-5 py-4">
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-2">
                    <button
                      disabled={busy || vendor.status === "approved"}
                      onClick={() => act("approve", vendor._id)}
                      aria-label="Approve"
                      title="Approve"
                      className={`rounded-xl px-3 py-2 text-xs font-semibold
                                    ${
                                      vendor.status === "approved" || busy
                                        ? "bg-gray-100 text-gray-400"
                                        : "bg-emerald-100 hover:bg-emerald-200"
                                    }`}
                    >
                      {isActing("approve", vendor._id)
                        ? "Approving..."
                        : vendor.status === "approved"
                          ? "Approved"
                          : "Approve"}
                    </button>

                    <button
                      disabled={busy || vendor.status === "rejected"}
                      onClick={() => act("reject", vendor._id)}
                      aria-label="Reject"
                      title="Reject"
                      className={`rounded-xl px-3 py-2 text-xs font-semibold
                                  ${
                                    vendor.status === "rejected" || busy
                                      ? "bg-gray-100 text-gray-400"
                                      : "bg-orange-100 hover:bg-orange-200"
                                  }`}
                    >
                      Reject
                    </button>

                    <button
                      disabled={busy || vendor.status === "deleted"}
                      onClick={() => act("delete", vendor._id)}
                      aria-label="Delete"
                      title="Delete"
                      className={`rounded-xl px-3 py-2 text-xs font-semibold
                                  ${
                                    vendor.status === "deleted" || busy
                                      ? "bg-gray-100 text-gray-400"
                                      : "bg-red-100 hover:bg-red-200"
                                  }`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )}
            children="vendor"
            length={vendors?.length}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminVendors;
