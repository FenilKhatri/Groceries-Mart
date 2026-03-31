import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getShops } from "../../api/adminApi";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoMdArrowRoundDown, IoMdArrowRoundUp, IoMdSearch } from "react-icons/io";
import SearchBar from "../../components/reusable-component/SearchBar";
import RefreshButton from "../../components/reusable-component/RefreshButton";

const LINKS = "px-5 py-3 text-left font-semibold";

const STATUS_STYLES = {
  approved:
    "text-xs font-semibold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200",
  rejected:
    "text-xs font-semibold px-2 py-1 rounded-lg bg-red-100 text-red-700 border border-red-200",
  cancelled:
    "text-xs font-semibold px-2 py-1 rounded-lg bg-gray-100 text-gray-700 border border-gray-200",
  pending:
    "text-xs font-semibold px-2 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200",
};

const FALLBACK_IMG =
  "https://t4.ftcdn.net/jpg/03/22/52/97/360_F_322529755_PtwWWld1VDk66wXltHdVC6eZiMI4Hu8W.jpg";

const AdminShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [query, setQuery] = useState("");
  const [debouncingQuery, setDebouncingQuery] = useState("");

  const [sorted, setSorted] = useState({ key: "", direction: "" });

  const navigate = useNavigate();

  const handleData = async () => {
    try {
      setLoading(true);
      const data = await getShops();
      setShops(data?.shops || []);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch shops!");
      setShops([]);
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

  const filteredShops = useMemo(() => {
    const search = debouncingQuery.toLowerCase().toString();

    return shops.filter((shop) => {
      return (
        shop?._id?.toLowerCase().includes(search) ||
        shop?.vendor?._id?.toLowerCase().includes(search) ||
        shop?.name?.toLowerCase().includes(search) ||
        shop?.phone?.toLowerCase().includes(search) ||
        shop?.city?.toLowerCase().includes(search)
      );
    });
  }, [shops, debouncingQuery]);

  useEffect(() => {
    handleData();
  }, []);

  const handleSorted = (key, direction) => {
    const sorted = [...shops].sort((a, b) => {
      const aValue = a[key] ?? "";
      const bValue = b[key] ?? "";

      return direction === "asc" ? String(aValue).localeCompare(bValue) : String(bValue).localeCompare(aValue);
    });
    setShops(sorted);
    setSorted({ key, direction });
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-4xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Admin Panel
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Shops Management
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Monitor shop requests and view shop details.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-500">Total Shops</p>
            <p className="mt-1 text-xl font-bold text-gray-900 text-center">
              {shops.length}
            </p>
          </div>
        </div>

        {/* Search */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search for shops..."
        />

        {/* Card */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
            <div className="left-part">
              <p className="text-sm font-semibold text-gray-900">
                Shops Directory
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Below is the list of all shops.
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
              Loading Shops...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className={LINKS}>Sr No.</th>
                    <th className={LINKS}>
                      <div className="flex items-center justify-between">
                        Shop
                        <div className="flex items-center justify-center gap-3">
                          <IoMdArrowRoundUp
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSorted("name", "asc")}
                          />
                          <IoMdArrowRoundDown
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSorted("name", "desc")}
                          />
                        </div>
                      </div>
                    </th>
                    <th className={LINKS}>
                      <div className="flex items-center justify-between">
                        Vendor ID
                        <div className="flex items-center justify-center gap-3">
                          <IoMdArrowRoundUp
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSorted("_id", "asc")}
                          />
                          <IoMdArrowRoundDown
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSorted("_id", "desc")}
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
                            onClick={() => handleSorted("phone", "asc")}
                          />
                          <IoMdArrowRoundDown
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSorted("phone", "desc")}
                          />
                        </div>
                      </div>
                    </th>
                    <th className={LINKS}>
                      <div className="flex items-center justify-between">
                        City
                        <div className="flex items-center justify-center gap-3">
                          <IoMdArrowRoundUp
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSorted("city", "asc")}
                          />
                          <IoMdArrowRoundDown
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSorted("city", "desc")}
                          />
                        </div>
                      </div>
                    </th>
                    <th className={LINKS}>
                      <div className="flex items-center justify-between">
                        Status
                        <div className="flex items-center justify-center gap-3">
                          <IoMdArrowRoundUp
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSorted("status", "asc")}
                          />
                          <IoMdArrowRoundDown
                            className="cursor-pointer hover:text-emerald-500 transition duration-300"
                            onClick={() => handleSorted("status", "desc")}
                          />
                        </div>
                      </div>
                    </th>
                    <th className={LINKS}>Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredShops?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-12 text-center text-gray-500"
                      >
                        No shops found
                      </td>
                    </tr>
                  ) : (
                    filteredShops?.map((shop, index) => {
                      const status = (shop?.status || "pending").toLowerCase();
                      const statusLabel = status.toUpperCase();

                      return (
                        <tr
                          key={shop._id || index}
                          className="hover:bg-emerald-50/60 transition"
                        >
                          <td className="px-5 py-4">{index + 1}</td>

                          {/* Shop + Image */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                loading="lazy"
                                decoding="async"
                                src={shop?.image?.url || FALLBACK_IMG}
                                alt="shop"
                                className="h-10 w-10 rounded-xl object-cover border"
                                onError={(e) => {
                                  e.currentTarget.src = FALLBACK_IMG;
                                }}
                              />
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {shop.name || shop.shopName || "—"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {Array.isArray(shop.category)
                                    ? shop.category.join(", ")
                                    : shop.category || "Shop"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* VendorId */}
                          <td className="px-5 py-4">
                            <span className="font-mono text-xs bg-gray-50 border px-2 py-1 rounded-lg">
                              {shop.vendor?.vendorId || shop.vendor?._id || "—"}
                            </span>
                          </td>

                          <td className="px-5 py-4">{shop.phone || "—"}</td>
                          <td className="px-5 py-4">{shop.city || "—"}</td>

                          {/* Status Badge */}
                          <td className="px-5 py-4">
                            <span
                              className={
                                STATUS_STYLES[status] || STATUS_STYLES.pending
                              }
                            >
                              {statusLabel}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <button
                              onClick={() =>
                                navigate(`/admin/shops/${shop._id}`)
                              }
                              className="rounded-xl border px-3 py-2 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                            >
                              View
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
            Showing {shops.length} shop{shops.length !== 1 ? "s" : ""}.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShops;
