import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { vendorProducts } from "../../../api/vendorApi";
import { useParams, NavLink } from "react-router-dom";
import { FiEye, FiPlus, FiPackage, FiGrid, FiTag, FiBox } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineSparkles } from "react-icons/hi";
import { LuPackageSearch } from "react-icons/lu";
import SearchBar from "../../reusable-component/SearchBar";
import VendorProductsSkeleton from "../../reusable-component/VendorProductsSkeleton";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { id } = useParams();

  const handleProducts = async () => {
    try {
      setLoading(true);
      const res = await vendorProducts(id);
      setProducts(res?.products || []);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) handleProducts();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredProductsList = useMemo(() => {
    const search = debouncedQuery.toLowerCase().trim();

    return products?.filter((product) => {
      return (
        product?.name?.toLowerCase().includes(search) ||
        product?.brand?.toLowerCase().includes(search) ||
        product?.category?.toLowerCase().includes(search) ||
        product?.productCode?.toLowerCase().includes(search)
      );
    });
  }, [products, debouncedQuery]);

  const totalProducts = products.length;
  const outOfStockCount = products.filter((item) => item?.stock === 0).length;
  const lowStockCount = products.filter(
    (item) => item?.stock > 0 && item?.stock <= 10,
  ).length;

  const getStockConfig = (stock) => {
    if (stock === 0) {
      return {
        label: "Out of Stock",
        chip: "border-red-100 bg-red-50 text-red-700",
        dot: "bg-red-500",
      };
    }

    if (stock <= 10) {
      return {
        label: `Only ${stock} Left`,
        chip: "border-amber-100 bg-amber-50 text-amber-700",
        dot: "bg-amber-500",
      };
    }

    return {
      label: `${stock} in stock`,
      chip: "border-emerald-100 bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
    };
  };

  const ProductImage = ({ product }) => {
    const image = product?.thumbnail?.url || product?.thumbnail;

    if (image) {
      return (
        <img
          src={image}
          alt={product?.name || "Product"}
          className="h-14 w-14 rounded-2xl object-cover ring-1 ring-gray-200 md:h-16 md:w-16"
        />
      );
    }

    return (
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 ring-1 ring-gray-200 md:h-16 md:w-16">
        <FiPackage size={20} />
      </div>
    );
  };

  return (
    <div className="m-4 space-y-6 md:m-6">
      {loading ? (
        <VendorProductsSkeleton count={ products.length || "5" } />
      ) : (
        <>
          {/* Top Banner */}
          <div className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-sm">
            <div className="flex flex-col gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm ring-1 ring-orange-100">
                  <HiOutlineSparkles size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
                    Product Inventory
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                    Manage your catalog with a cleaner overview, product
                    thumbnails, smart stock indicators, and a mobile-friendly
                    layout.
                  </p>
                </div>
              </div>

              <NavLink
                to={`/vendors/${id}/products/add`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-400"
              >
                <FiPlus size={17} />
                Add Product
              </NavLink>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Total Products
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold text-gray-900">
                    {totalProducts}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <MdOutlineInventory2 size={24} />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Low Stock
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold text-yellow-500">
                    {lowStockCount}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-yellow-500">
                  <LuPackageSearch size={22} />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Out of Stock
                  </p>
                  <h3 className="mt-2 text-3xl font-extrabold text-red-700">
                    {outOfStockCount}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <FiPackage size={22} />
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <SearchBar
            query={query}
            setQuery={setQuery}
            placeholder="Search for products..."
          />

          {/* Main Card */}
          <div className="overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-xl">
            <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-600">
                  <MdOutlineInventory2 size={22} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Product Inventory
                  </h3>
                  <p className="text-sm text-gray-500">
                    Browse, track, and manage your products with better
                    visibility.
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-2xl border border-gray-100 bg-gray-50 px-4 py-2 text-sm text-gray-600">
                <FiGrid size={16} />
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {filteredProductsList.length}
                </span>
                of
                <span className="font-bold text-gray-900">
                  {products.length}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
                <p className="text-base font-semibold text-gray-700">
                  Loading your products...
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Please wait while we prepare your inventory view.
                </p>
              </div>
            ) : products.length === 0 ? (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 text-gray-400">
                  <MdOutlineInventory2 size={34} />
                </div>

                <h4 className="mt-5 text-2xl font-bold text-gray-900">
                  No products found
                </h4>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  You have not added any products yet. Start building your
                  catalog and showcase your items to customers.
                </p>

                <NavLink
                  to={`/vendors/${id}/products/add`}
                  className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <FiPlus size={16} />
                  Add Your First Product
                </NavLink>
              </div>
            ) : filteredProductsList.length === 0 ? (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 text-orange-400">
                  <IoMdSearch size={34} />
                </div>

                <h4 className="mt-5 text-2xl font-bold text-gray-900">
                  No matching products
                </h4>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Try searching with a different product name, brand, category,
                  or product code.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto lg:block">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">#</th>
                        <th className="px-6 py-4 text-left font-semibold">
                          Product
                        </th>
                        <th className="px-6 py-4 text-left font-semibold">
                          Brand
                        </th>
                        <th className="px-6 py-4 text-left font-semibold">
                          Category
                        </th>
                        <th className="px-6 py-4 text-left font-semibold">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left font-semibold">
                          Stock
                        </th>
                        <th className="px-6 py-4 text-left font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {filteredProductsList.map((product, index) => {
                        const stockConfig = getStockConfig(product?.stock);

                        return (
                          <tr
                            key={product._id}
                            className="transition-colors hover:bg-orange-50/40"
                          >
                            <td className="px-6 py-5 font-semibold text-gray-700">
                              {index + 1}
                            </td>

                            <td className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                <ProductImage product={product} />

                                <div>
                                  <p className="font-semibold text-gray-900">
                                    {product?.name || "-"}
                                  </p>
                                  <p className="mt-1 text-xs text-gray-500">
                                    Code: {product?.productCode || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-5 text-gray-700">
                              {product?.brand || "-"}
                            </td>

                            <td className="px-6 py-5">
                              <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                                {product?.category || "-"}
                              </span>
                            </td>

                            <td className="px-6 py-5">
                              <span
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${stockConfig.chip}`}
                              >
                                <span
                                  className={`h-2 w-2 rounded-full ${stockConfig.dot}`}
                                />
                                {product?.stock === 0
                                  ? "Inactive"
                                  : product?.stock <= 10
                                    ? "Low Stock"
                                    : "Active"}
                              </span>
                            </td>

                            <td className="px-6 py-5">
                              <span
                                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${stockConfig.chip}`}
                              >
                                {stockConfig.label}
                              </span>
                            </td>

                            <td className="px-6 py-5">
                              <NavLink
                                to={`/vendors/${id}/products/${product._id}`}
                                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
                              >
                                <FiEye size={16} />
                                Edit
                              </NavLink>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile / Tablet Cards */}
                <div className="grid grid-cols-1 gap-4 p-4 lg:hidden sm:grid-cols-2">
                  {filteredProductsList.map((product) => {
                    const stockConfig = getStockConfig(product?.stock);

                    return (
                      <div
                        key={product._id}
                        className="group rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <div className="flex items-start gap-4">
                          <ProductImage product={product} />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <h4 className="truncate text-base font-bold text-gray-900">
                                  {product?.name || "-"}
                                </h4>
                                <p className="mt-1 truncate text-xs text-gray-500">
                                  Code: {product?.productCode || "N/A"}
                                </p>
                              </div>

                              <span
                                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${stockConfig.chip}`}
                              >
                                <span
                                  className={`h-2 w-2 rounded-full ${stockConfig.dot}`}
                                />
                                {product?.stock === 0
                                  ? "Inactive"
                                  : product?.stock <= 10
                                    ? "Low"
                                    : "Active"}
                              </span>
                            </div>

                            <div className="mt-4 space-y-3">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FiTag size={15} className="text-gray-400" />
                                <span className="font-medium text-gray-500">
                                  Brand:
                                </span>
                                <span className="truncate text-gray-800">
                                  {product?.brand || "-"}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FiGrid size={15} className="text-gray-400" />
                                <span className="font-medium text-gray-500">
                                  Category:
                                </span>
                                <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-semibold capitalize text-emerald-700">
                                  {product?.category || "-"}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FiBox size={15} className="text-gray-400" />
                                <span className="font-medium text-gray-500">
                                  Stock:
                                </span>
                                <span
                                  className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${stockConfig.chip}`}
                                >
                                  {stockConfig.label}
                                </span>
                              </div>
                            </div>

                            <NavLink
                              to={`/vendors/${id}/products/${product._id}`}
                              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black"
                            >
                              <FiEye size={16} />
                              Edit Product
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
