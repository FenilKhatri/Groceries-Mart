import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getShops } from "../../api/adminApi";
import {
  IoMdArrowRoundDown,
  IoMdArrowRoundUp,
} from "react-icons/io";
import SearchBar from "../../components/common/SearchBar";
import RefreshButton from "../../components/common/RefreshButton";
import H3 from "../../components/ui/H3";
import Description from "../../components/ui/Description";
import TotalCounts from "../../components/sections/admin/TotalCounts";
import TableTitle from "../../components/sections/about/TableTitle";
import useDebounce from "../../utils/useDebounce";
import AdminTable from "../../components/sections/admin/Table";
import { shopColumns } from "../../data/adminTable";
import Button from "../../components/ui/Button";

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

  const debouncingQuery = useDebounce(query, 500);
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

      return direction === "asc"
        ? String(aValue).localeCompare(bValue)
        : String(bValue).localeCompare(aValue);
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
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
              admin panel
            </p>
            <H3 children="Shops Management" />
            <Description
              children="Monitor shop requests and view shop details."
              className="text-gray-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <TotalCounts children="Shops" length={shops?.length} />
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
            <TableTitle
              Title="Shops Directory"
              Description="Below is the list of all shops."
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
            columns={shopColumns}
            data={filteredShops}
            loading={loading}
            onSort={handleSorted}
            emptyMessage="No shops found"
            renderRow={(shop, index) => {
              const status = (shop?.status || "pending").toLowerCase();
              const statusLabel = status.toUpperCase();

              return (
                <tr
                  key={shop._id || index}
                  className="hover:bg-emerald-50/60 transition"
                >
                  <td className="px-5 py-4">{index + 1}</td>
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
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs bg-gray-50 border px-2 py-1 rounded-lg">
                      {shop.vendor?.vendorId || shop.vendor?._id || "—"}
                    </span>
                  </td>
                  <td className="px-5 py-4">{shop.phone || "—"}</td>
                  <td className="px-5 py-4">{shop.city || "—"}</td>
                  <td className="px-5 py-4">
                    <span
                      className={STATUS_STYLES[status] || STATUS_STYLES.pending}
                    >
                      {statusLabel}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-5 py-4">
                    <Button
                      variant="outline"
                      children="View Shop"
                      onClick={() => navigate(`/admin/shops/${shop._id}`)}
                    />
                  </td>
                </tr>
              );
            }}
            children="shop"
            length={shops?.length}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminShops;
