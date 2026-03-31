import React, { useEffect, useMemo, useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { IoWarning } from "react-icons/io5";
import { MdInventory2, MdCategory } from "react-icons/md";
import { toast } from "react-toastify";
import { vendorProducts } from "../../api/vendorApi";
import { Link } from "react-router-dom";
import VendorDashboardSkeleton from "../../components/reusable-component/VendorDashboardSkeleton";
import { useAuth } from "../../context/AuthContext";

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { auth } = useAuth();
  const vendorId = auth?.vendor?._id;

  const handleData = async () => {
    try {
      setLoading(true);

      const allProducts = await vendorProducts(vendorId);
      const productList = allProducts?.products || [];

      setProducts(productList);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vendorId) handleData();
  }, [vendorId]);

  const lowStockProducts = useMemo(
    () =>
      products.filter((product) => product?.stock > 0 && product?.stock <= 10),
    [products],
  );

  const outOfStockProducts = useMemo(
    () => products.filter((product) => product?.stock === 0),
    [products],
  );

  const uniqueCategories = useMemo(
    () =>
      new Set(products.map((product) => product.category).filter(Boolean)).size,
    [products],
  );

  const cardClass =
    "rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md";

  const thClass =
    "px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500";

  const tdClass = "px-5 py-4 text-sm text-gray-700";

  const renderTable = (items, emptyTitle, emptyText) => {
    if (items.length === 0) {
      return (
        <div className="px-6 py-14 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <MdInventory2 size={30} />
          </div>
          <h3 className="mt-4 text-lg font-bold text-gray-900">{emptyTitle}</h3>
          <p className="mt-2 text-sm text-gray-500">{emptyText}</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className={thClass}>Sr No.</th>
              <th className={thClass}>Product Name</th>
              <th className={thClass}>Available Stock</th>
              <th className={thClass}>Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {items.map((product, index) => (
              <tr
                key={product._id}
                className="transition-colors hover:bg-emerald-50/40"
              >
                <td className={tdClass}>{index + 1}</td>

                <td className={tdClass}>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {product?.name || "-"}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 capitalize">
                      {product?.category || "Uncategorized"}
                    </p>
                  </div>
                </td>

                <td className={tdClass}>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      product?.stock === 0
                        ? "bg-red-50 text-red-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {product?.stock === 0
                      ? "Out of stock"
                      : product?.stock === 1
                        ? "1 product left"
                        : `${product?.stock} products left`}
                  </span>
                </td>

                <td className={tdClass}>
                  <Link
                    to={`/vendors/${vendorId}/products/${product._id}`}
                    className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Edit Stock
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Vendor Panel
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Vendor Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Monitor your inventory and manage low stock products.
          </p>
        </div>
      </div>

      {loading ? (
        <VendorDashboardSkeleton
          count={4}
          lowProductCount={lowStockProducts.length || "5"}
          outOfStockProductCount={outOfStockProducts.length || "5"}
        />
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className={cardClass}>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <AiFillProduct size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Total Products
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {products.length}
                  </p>
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                  <MdInventory2 size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Low Stock Products
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {lowStockProducts.length}
                  </p>
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <IoWarning size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Out of Stock
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {outOfStockProducts.length}
                  </p>
                </div>
              </div>
            </div>

            <div className={cardClass}>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <MdCategory size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Total Categories
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {uniqueCategories}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Low Stock Table */}
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-900">
                Low Stock Products
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Products that need attention soon.
              </p>
            </div>

            {renderTable(
              lowStockProducts,
              "No low stock products",
              "Great job. Your current inventory looks healthy.",
            )}
          </div>

          {/* Out of Stock Table */}
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-900">
                Out of Stock Products
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                These products are currently unavailable.
              </p>
            </div>

            {renderTable(
              outOfStockProducts,
              "No out of stock products",
              "Nice. Every product is currently available.",
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VendorDashboard;
