import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShareAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { getProducts } from "../../api/productApi";
import ProductGridSkeleton from "../reusable-component/ProductGridSkeleton";
import Button from "../ui/Button";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res?.data?.products || []);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleProducts();
  }, []);

  const handleShare = async (productId) => {
    try {
      const productUrl = `${window.location.origin}/products/${productId}`;

      if (navigator.share) {
        await navigator.share({
          title: `Grocery Product ${productId}`,
          url: productUrl,
        });
      } else {
        await navigator.clipboard.writeText(productUrl);
        toast.success("Link copied successfully!");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to share!");
    }
  };

  return (
    <section className="px-4 py-10 md:px-8 lg:px-10">
      <div className="mx-auto max-w-screen-2xl space-y-8">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <div className="w-full space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Featured Products
            </h2>
            <p className="text-sm font-medium text-gray-500 md:text-base">
              Handpicked fresh arrivals from our top-rated local vendors
            </p>
          </div>

          <Button
            variant="outline"
            to="/products"
            children="View Products"
            className="min-w-fit"
          ></Button>
        </div>

        <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <>
              <div className="col-span-1 md:col-span-2 lg:col-span-4">
                <ProductGridSkeleton />
              </div>
            </>
          ) : (
            <>
              {products.slice(0, 8).map((item) => (
                <div
                  key={item._id}
                  className={`group col-span-2 md:col-span-1 relative overflow-hidden rounded-3xl border border-gray-200 bg-white/90 shadow-sm backdrop-blur-sm ${
                    item.stock === 0
                      ? "cursor-not-allowed opacity-60"
                      : "transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  }`}
                >
                  <div className="relative m-3 overflow-hidden rounded-2xl bg-gray-100">
                    <img
                      src={item?.thumbnail?.url}
                      alt={item?.name}
                      className={`h-52 w-full object-cover ${
                        item.stock === 0
                          ? "cursor-not-allowed opacity-60"
                          : "transition-transform duration-700 group-hover:scale-110"
                      }`}
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-80" />

                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-emerald-700 shadow">
                      {item.brand || "FreshMart"}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleShare(item._id)}
                      className="absolute right-3 top-3 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-emerald-100/90 text-emerald-700 shadow transition-all duration-300 hover:bg-emerald-500 hover:text-white"
                    >
                      <FaShareAlt size={16} />
                    </button>

                    {item.stock > 0 ? (
                      <span className="absolute bottom-3 left-3 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white shadow">
                        In Stock
                      </span>
                    ) : (
                      <span className="absolute bottom-3 left-3 rounded-full bg-red-500 px-3 py-1 text-[11px] font-semibold text-white shadow">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 px-4 pb-4 pt-1">
                    <div>
                      <h3 className="line-clamp-1 text-base font-bold text-gray-900 md:text-lg">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm capitalize text-gray-500 line-clamp-1">
                        {item.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-500">
                        Unit:{" "}
                        <span className="font-semibold text-gray-700">
                          {item.unit || "1 pc"}
                        </span>
                      </p>
                      <p className="text-gray-500">
                        Stock:{" "}
                        <span
                          className={`font-semibold ${
                            item?.stock === 0
                              ? "text-red-500"
                              : item?.stock <= 5
                                ? "text-yellow-700"
                                : "text-gray-700"
                          }`}
                        >
                          {item.stock ?? 0}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-3 pt-1">
                      <p className="text-2xl font-extrabold text-emerald-600">
                        ₹{item.price}
                      </p>

                      <Button
                        variant="secondary"
                        to={`/products/${item?.id}`}
                        children="View"
                        className="min-w-fit"
                      ></Button>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-500 group-hover:ring-emerald-300" />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
