import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import {
  getVendors,
  approveVendorRequest,
  rejectVendorRequest,
  deleteVendorRequest,
} from "../../api/adminApi";
import { IoMdSearch } from "react-icons/io";
import SearchBar from "../../components/reusable-component/SearchBar";
import RefreshButton from "../../components/reusable-component/RefreshButton";

const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [query, setQuery] = useState("");
  const [debouncingQuery, setDeboundingQuery] = useState("");

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboundingQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

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

      return direction === "asc" ? String(aValue).localeCompare(bValue) : String(bValue).localeCompare(aValue);
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
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Admin Panel
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Vendors Management
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Monitor vendor accounts and view registered vendor details.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-gray-500">Total Vendors</p>
              <p className="mt-1 text-xl font-bold text-gray-900 text-center">
                {vendors.length}
              </p>
            </div>
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
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
            <div className="flex items-start justify-between flex-col md:flex-row">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Vendor Directory
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Below is the list of all vendors.
                </p>
              </div>
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
              Loading Vendors...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className={LINKS}>Sr No.</th>

                    <th className={LINKS}>
                      <div className="flex items-center justify-between">
                        Vendor
                        <div className="flex items-center gap-2">
                          <IoMdArrowRoundUp
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSort("name", "asc")}
                          />
                          <IoMdArrowRoundDown
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSort("name", "desc")}
                          />
                        </div>
                      </div>
                    </th>

                    <th className={LINKS}>
                      <div className="flex items-center justify-between">
                        Email
                        <div className="flex items-center gap-2">
                          <IoMdArrowRoundUp
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSort("email", "asc")}
                          />
                          <IoMdArrowRoundDown
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSort("email", "desc")}
                          />
                        </div>
                      </div>
                    </th>

                    <th className={LINKS}>
                      <div className="flex items-center justify-between">
                        Phone
                        <div className="flex items-center gap-2">
                          <IoMdArrowRoundUp
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSort("phone", "asc")}
                          />
                          <IoMdArrowRoundDown
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSort("phone", "desc")}
                          />
                        </div>
                      </div>
                    </th>

                    <th className={LINKS}>
                      <div className="flex items-center justify-between">
                        Vendor Id
                        <div className="flex items-center gap-2">
                          <IoMdArrowRoundUp
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSort("_id", "asc")}
                          />
                          <IoMdArrowRoundDown
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSort("_id", "desc")}
                          />
                        </div>
                      </div>
                    </th>

                    <th className={LINKS}>Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {filteredVendors.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 sm:px-6 py-12 text-center"
                      >
                        <div className="mx-auto flex max-w-md flex-col items-center">
                          <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                            <span className="text-emerald-700 font-bold">
                              V
                            </span>
                          </div>
                          <p className="mt-3 font-semibold text-gray-900">
                            No vendors found
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Once vendors register, they will appear here.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredVendors?.map((vendor, index) => (
                      <tr
                        key={vendor._id || index}
                        className={`group transition ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                        } hover:bg-emerald-50/60`}
                      >
                        <td className="px-5 sm:px-6 py-4 text-gray-700 font-medium">
                          {index + 1}
                        </td>

                        <td className="px-5 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                              {(vendor?.name?.[0] || "V").toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 truncate">
                                {vendor.name || "—"}
                              </p>
                              <p className="text-xs text-gray-500">
                                Vendor Account
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 sm:px-6 py-4 text-gray-700">
                          {vendor.email || "—"}
                        </td>

                        <td className="px-5 sm:px-6 py-4 text-gray-700">
                          {vendor.phone || "—"}
                        </td>

                        <td className="px-5 sm:px-6 py-4">
                          <span className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-2.5 py-1 font-mono text-xs text-gray-700">
                            {vendor._id}
                          </span>
                        </td>

                        <td className="px-5 sm:px-6 py-4">
                          <div className="grid grid-cols-1 xl:grid-cols-3 gap-2">
                            <button
                              type="button"
                              disabled={busy || vendor.status === "approved"}
                              onClick={() => act("approve", vendor._id)}
                              className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold shadow-sm transition-all
                                ${
                                  vendor.status === "approved" || busy
                                    ? "border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "border border-emerald-300 bg-emerald-100 text-gray-700 hover:bg-emerald-200 cursor-pointer"
                                }`}
                            >
                              {isActing("approve", vendor._id)
                                ? "Approving..."
                                : vendor.status === "approved"
                                  ? "Approved"
                                  : "Approve"}
                            </button>

                            <button
                              type="button"
                              disabled={busy || vendor.status === "rejected"}
                              onClick={() => act("reject", vendor._id)}
                              className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold shadow-sm transition-all
                                ${
                                  vendor.status === "rejected" || busy
                                    ? "border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "border border-orange-300 bg-orange-100 text-gray-700 hover:bg-orange-200 cursor-pointer"
                                }`}
                            >
                              {isActing("reject", vendor._id)
                                ? "Rejecting..."
                                : vendor.status === "rejected"
                                  ? "Rejected"
                                  : "Reject"}
                            </button>

                            <button
                              type="button"
                              disabled={busy || vendor.status === "deleted"}
                              onClick={() => act("delete", vendor._id)}
                              className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold shadow-sm transition-all
                                ${
                                  vendor.status === "deleted" || busy
                                    ? "border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "border border-red-300 bg-red-100 text-gray-700 hover:bg-red-200 cursor-pointer"
                                }`}
                            >
                              {isActing("delete", vendor._id)
                                ? "Deleting..."
                                : vendor.status === "deleted"
                                  ? "Deleted"
                                  : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-100 bg-white px-5 sm:px-6 py-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {vendors.length}
                </span>{" "}
                vendor{vendors.length === 1 ? "" : "s"}.
              </p>

              <div className="text-xs text-gray-500">
                Tip: Use desktop view for the best table experience.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVendors;
