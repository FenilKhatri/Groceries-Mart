import React, { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../api/productApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../api/userApi";
import ProductGrid from "../../components/common/ProductGrid";
import SearchBar from "../../components/reusable-component/SearchBar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(null);
  const [cooldownMap, setCooldownMap] = useState({});

  const [query, setQuery] = useState("");
  const [debouncing, setDebouncing] = useState("");

  const navigate = useNavigate();

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const handleProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res?.data?.products || []);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch!");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleProducts();
  }, []);

  // Filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncing(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSortChange = (e) => {
    const value = e.target.value;

    if (!value) {
      setSortConfig({ key: "", direction: "" });
      return;
    }

    const [key, direction] = value.split("-");
    setSortConfig({ key, direction });
  };

  const finalProducts = useMemo(() => {
    const search = debouncing.toLowerCase().trim();

    let filtered = products?.filter((product) => {
      return (
        product?.name?.toLowerCase().includes(search) ||
        product?.brand?.toLowerCase().includes(search) ||
        product?.category?.toLowerCase().includes(search) ||
        product?.shortDescription?.toLowerCase().includes(search) ||
        product?.longDescription?.toLowerCase().includes(search)
      );
    });

    if (!sortConfig.key || !sortConfig.direction) return filtered;

    return [...filtered].sort((a, b) => {
      const aValue = a?.[sortConfig.key] ?? "";
      const bValue = b?.[sortConfig.key] ?? "";

      if (sortConfig.key === "price") {
        return sortConfig.direction === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [products, debouncing, sortConfig]);

  // Product
  const handleProductDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = async (productId) => {

    if(addLoading === productId || cooldownMap[productId]) return;

    try {
      setAddLoading(productId);
      const data = await addToCart({ productId, quantity: 1 });
      toast.success(data?.message || "Added to cart!");

      setCooldownMap((prev) => ({
        ...prev,
        [productId]: true,
      }));

      setTimeout(() => {
        setCooldownMap((prev) => ({
          ...prev,
          [productId]: false,
        }));
      }, 3000);
    } catch (error) {
      toast.error(error?.message || "Failed to add!");
    } finally {
      setAddLoading(null);
    }
  };

  return (
    <section className="bg-gray-50 px-0 py-10 md:px-5">
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="mb-6 flex flex-col md:gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Grocery Products
            </h2>
            <p className="font-semibold text-gray-500">
              Showing {finalProducts?.length} products
            </p>
          </div>

          {/* Search */}
          <SearchBar
            query={query}
            setQuery={setQuery}
            placeholder="Search for products..."
          />

          {/* Sort */}
          <div className="mt-4 md:mt-0">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Sort Products
            </label>

            <div className="relative min-w-55">
              <select
                value={
                  sortConfig.key && sortConfig.direction
                    ? `${sortConfig.key}-${sortConfig.direction}`
                    : ""
                }
                onChange={handleSortChange}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Sort By</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="price-asc">Price Low-High</option>
                <option value="price-desc">Price High-Low</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <ProductGrid
          products={finalProducts}
          loading={loading}
          addLoading={addLoading}
          onView={handleProductDetails}
          onAddToCart={handleAddToCart}
          cooldownMap={cooldownMap}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        />
      </div>
    </section>
  );
};

export default Products;
