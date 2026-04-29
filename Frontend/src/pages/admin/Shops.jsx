import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getShops } from "../../features/admin/api";

import Description from "../../shared/components/ui/Description";
import H3 from "../../shared/components/ui/H3";

import SearchBar from "../../shared/components/common/SearchBar";
import RefreshButton from "../../shared/components/common/RefreshButton";
import TotalCounts from "../../features/admin/components/TotalCounts";
import useDebounce from "../../hooks/useDebounce";
import TableTitle from "../../features/admin/components/TableTitle";
import AdminTable from "../../features/admin/components/Table";

import { SHOP_STATUS } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { shopColumns } from "../../data/pages/adminTableData";
import Button from "../../shared/components/ui/Button";

const STATUS_STYLES = {
  [SHOP_STATUS.APPROVED]:
    "text-xs font-semibold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200",
  [SHOP_STATUS.REJECTED]:
    "text-xs font-semibold px-2 py-1 rounded-lg bg-red-100 text-red-700 border border-red-200",
  [SHOP_STATUS.CANCELLED]:
    "text-xs font-semibold px-2 py-1 rounded-lg bg-gray-100 text-gray-700 border border-gray-200",
  [SHOP_STATUS.PENDING]:
    "text-xs font-semibold px-2 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200",
};

const FALLBACK_IMG =
  "https://t4.ftcdn.net/jpg/03/22/52/97/360_F_322529755_PtwWWld1VDk66wXltHdVC6eZiMI4Hu8W.jpg";

const AdminShops = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [sorted, setSorted] = useState({
    key: "",
    direction: "",
  });

  const {
    data: shops = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    staleTime: 5 * 60 * 1000,
    select: (res) => res?.shops || [],
    onError: (err) => {
      toast.error(err?.message || "Failed to fetch shops!");
    },
  });

  // Filtering
  const filteredShops = useMemo(() => {
    const search = debouncedQuery.toLowerCase().trim();

    return shops.filter((shop) => {
      return (
        shop?._id?.toLowerCase().includes(search) ||
        shop?.vendor?._id?.toLowerCase().includes(search) ||
        shop?.name?.toLowerCase().includes(search) ||
        shop?.phone?.toLowerCase().includes(search) ||
        shop?.city?.toLowerCase().includes(search)
      );
    });
  }, [shops, debouncedQuery]);

  // 🔹 Sorting (NO mutation)
  const sortedShops = useMemo(() => {
    if (!sorted.key) return filteredShops;

    return [...filteredShops].sort((a, b) => {
      const aValue = a[sorted.key] ?? "";
      const bValue = b[sorted.key] ?? "";

      return sorted.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredShops, sorted]);

  const handleSorted = (key, direction) => {
    setSorted({ key, direction });
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
            <H3>Shops Management</H3>
            <Description className="text-gray-500">
              Monitor shop requests and view shop details.
            </Description>
          </div>

          <TotalCounts length={shops?.length}>Shops</TotalCounts>
        </div>

        {/* SEARCH */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search for shops..."
        />

        {/* TABLE */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
            <TableTitle
              Title="Shops Directory"
              Description="Below is the list of all shops."
            />

            <RefreshButton
              refreshing={isFetching}
              setRefreshing={() => {}}
              onRefresh={refetch}
            />
          </div>

          {/* TABLE */}
          <AdminTable
            columns={shopColumns}
            data={sortedShops}
            loading={isLoading}
            onSort={handleSorted}
            emptyMessage="No shops found"
            children="shop"
            length={shops?.length}
            renderRow={(shop, index) => {
              const status = (shop?.status || SHOP_STATUS.PENDING).toLowerCase();
              const statusLabel = status.toUpperCase();

              return (
                <tr
                  key={shop._id || index}
                  className="hover:bg-emerald-50/60 transition"
                >
                  <td className="px-5 py-4">{index + 1}</td>

                  <td className="px-5 py-4 flex items-center gap-3">
                    <img
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
                  </td>

                  <td className="px-5 py-4 font-mono text-xs">
                    {shop.vendor?.vendorId || shop.vendor?._id || "—"}
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

                  <td className="px-5 py-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/admin/shops/${shop._id}`)}
                    >
                      View Shop
                    </Button>
                  </td>
                </tr>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminShops;
