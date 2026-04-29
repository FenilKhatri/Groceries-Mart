import React, { useEffect, useMemo, useCallback, useState } from "react";
import { getProducts } from "../../features/products/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/user/api";
import ProductGrid from "../../shared/components/common/ProductGrid";
import SearchBar from "../../shared/components/common/SearchBar";
import useDebounce from "../../hooks/useDebounce";

const LIMIT = 12;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  
  const [hasMore, setHasMore] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  
  const [addLoading, setAddLoading] = useState(null);
  const [cooldownMap, setCooldownMap] = useState({});
  
  const [query, setQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  
  const navigate = useNavigate();
  
  const debouncedQuery = useDebounce(query, 500);

  const fetchProducts = useCallback(
    async (currentPage, isLoadMore = false) => {
      try {
        isLoadMore ? setLoadMoreLoading(true) : setLoading(true);

        const res = await getProducts({
          page: currentPage,
          limit: LIMIT,
          search: debouncedQuery, // now correct
        });

        const newProducts = res?.data?.products || [];

        setProducts((prev) => {
          const map = new Map();
          [...prev, ...newProducts].forEach((p) => {
            map.set(p._id, p);
          });
          return Array.from(map.values());
        });

        setHasMore(res?.data?.hasMore ?? newProducts.length === LIMIT);
      } catch (error) {
        toast.error(error?.message || "Failed to fetch products!");
      } finally {
        setLoading(false);
        setLoadMoreLoading(false);
      }
    },
    [debouncedQuery],
  );

  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);

    fetchProducts(1, false);
  }, [debouncedQuery, fetchProducts]);

  const handleLoadMore = () => {
    setPage((prev) => {
      const nextPage = prev + 1;
      fetchProducts(nextPage, true);
      return nextPage;
    });
  };

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
    if (!sortConfig.key) return products;

    return [...products].sort((a, b) => {
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
  }, [products, sortConfig]);

  const handleProductDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = async (productId) => {
    if (addLoading === productId || cooldownMap[productId]) return;

    try {
      setAddLoading(productId);

      const data = await addToCart({ productId, quantity: 1 });

      toast.success(data?.message || "Added to cart!");

      setCooldownMap((prev) => ({ ...prev, [productId]: true }));

      setTimeout(() => {
        setCooldownMap((prev) => ({ ...prev, [productId]: false }));
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
        {/* HEADER */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between md:gap-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Grocery Products
            </h2>
            <p className="font-semibold text-gray-500">
              Showing {finalProducts.length} products
            </p>
          </div>

          <SearchBar
            query={query}
            setQuery={setQuery}
            placeholder="Search for products..."
          />

          <select
            value={
              sortConfig.key ? `${sortConfig.key}-${sortConfig.direction}` : ""
            }
            onChange={handleSortChange}
            className="w-full md:w-56 rounded-xl border px-4 py-3 text-sm"
          >
            <option value="">Sort By</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low-High</option>
            <option value="price-desc">Price High-Low</option>
          </select>
        </div>

        {/* PRODUCTS */}
        <ProductGrid
          products={finalProducts}
          loading={loading}
          addLoading={addLoading}
          onView={handleProductDetails}
          onAddToCart={handleAddToCart}
          coolDownMap={cooldownMap}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        />

        {/* LOAD MORE */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={loadMoreLoading}
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 disabled:opacity-50"
            >
              {loadMoreLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
