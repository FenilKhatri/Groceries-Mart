import { FaShareAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { IoIosWarning } from "react-icons/io";
import { ImCross } from "react-icons/im";
import ProductGridSkeleton from "../reusable-component/ProductGridSkeleton";

const ProductGrid = ({
  products = [],
  loading = false,
  addLoading = null,
  onView,
  onAddToCart,
  coolDownMap,
  className = "",
}) => {
  const gridClass =
    className || "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4";

  if (loading) {
    return <ProductGridSkeleton count={8} className={gridClass} />;
  }

  const handleShare = async (product) => {
    try {
      const productURL = `${window.location.origin}/products/${product._id}`;

      if (navigator.share) {
        await navigator.share({
          title: `Product: ${product.name}`,
          text: `Check out ${product.name}`,
          url: productURL,
        });
        toast.success("Product shared successfully!");
      } else {
        await navigator.clipboard.writeText(productURL);
        toast.success("Link copied successfully!");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to copy!");
    }
  };

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <p className="font-semibold text-gray-600">No products found.</p>
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {products.map((product, index) => {
        const image =
          product?.thumbnail?.url || product?.images?.[0]?.url || "";

        return (
          <div
            key={product._id}
            className={`relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${
              product.stock === 0
                ? "cursor-not-allowed opacity-60"
                : " transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            }`}
          >
            <button
              type="button"
              className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100/70 text-emerald-700 cursor-pointer z-10"
              onClick={() => handleShare(product)}
            >
              <FaShareAlt size={16} title="Share product" />
            </button>

            <div className="flex h-48 items-center justify-center overflow-hidden bg-gray-100">
              {image ? (
                <img
                  src={image}
                  alt={product.name}
                  width="500"
                  height="500"
                  loading={index < 4 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full rounded-t-lg object-cover hover:scale-110 overflow-hidden transition duration-300"
                />
              ) : (
                <span className="font-semibold text-gray-400">No Image</span>
              )}
            </div>

            <div className="p-4">
              <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
                {product.name}
              </h3>

              <p className="line-clamp-1 text-gray-400">
                {product.shortDescription}
              </p>

              <p className="mt-1 text-sm text-gray-400">⭐ 4.8 (124)</p>

              <div className="flex items-center justify-between gap-3">
                <p className="mt-2 font-bold text-gray-800">
                  ₹{product.price}
                  <span className="text-sm font-semibold text-gray-500">
                    /{product.unit}
                  </span>
                </p>

                <p
                  className={`font-bold flex items-center gap-1 ${
                    product.stock === 0
                      ? "text-red-500"
                      : product.stock <= 5
                        ? "text-yellow-500"
                        : "text-emerald-500"
                  }`}
                >
                  {product.stock < 1 ? (
                    <>
                      <ImCross /> Out of Stock
                    </>
                  ) : product.stock <= 5 ? (
                    <>
                      <IoIosWarning /> Only {product.stock} stock left
                    </>
                  ) : (
                    `${product.stock} stock left`
                  )}
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-orange-600 py-2 font-semibold text-white transition-all hover:bg-orange-500 cursor-pointer"
                  onClick={() => onView(product._id)}
                >
                  View
                </button>

                <button
                  type="button"
                  disabled={addLoading === product._id || product.stock === 0}
                  className={`flex-1 rounded-lg py-2 font-semibold text-white transition-all ${
                    addLoading === product._id || product.stock === 0
                      ? "cursor-not-allowed bg-emerald-300"
                      : "cursor-pointer bg-emerald-600 hover:bg-emerald-500"
                  }`}
                  onClick={() => onAddToCart(product._id)}
                >
                  {addLoading === product._id
                    ? "Adding..."
                    : coolDownMap?.[product._id]
                      ? "Wait..."
                      : "Add +"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
