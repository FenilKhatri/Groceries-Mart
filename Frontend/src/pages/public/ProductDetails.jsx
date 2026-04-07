import React, { useLayoutEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaStar, FaTruck, FaStore } from "react-icons/fa";
import { getProductDetails } from "../../api/productApi";
import { addToCart } from "../../api/userApi";
import { FaShareAlt } from "react-icons/fa";
import NoProductImg from "../../assets/background/ProductNotFound.png";
import ProductDetailSkeleton from "../../components/skeleton/ProductDetailSkeleton";

// constants
const TAGS = [
  {
    label: "Organic",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  { label: "Local", className: "bg-amber-100 text-amber-700 border-amber-200" },
];

const NUTRITION_POINTS = [
  "Calories: 110 (approx.)",
  "Potassium: Good source",
  "Vitamin B6: Present",
  "Naturally sweet & energy boosting",
];

const DEMO_REVIEWS = [
  {
    name: "Rahul",
    stars: 5,
    time: "2 days ago",
    text: "Fresh quality and packaging was great. Delivered quickly.",
  },
  {
    name: "Neha",
    stars: 4,
    time: "1 week ago",
    text: "Good product and price, would buy again.",
  },
];

const rating = 4.8;
const reviewCount = 124;

const FALLBACK_IMG =
  "https://t4.ftcdn.net/jpg/03/22/52/97/360_F_322529755_PtwWWld1VDk66wXltHdVC6eZiMI4Hu8W.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const API = useMemo(
    () => import.meta.env.VITE_API_URL || "http://localhost:8000",
    [],
  );

  const thumbUrl = (p) => {
    if (p?.thumbnail?.url) return p.thumbnail.url;
    if (p?.thumbnail?.filename)
      return `${API}/uploads/products/thumbnails/${p.thumbnail.filename}`;
    return "";
  };

  const imageUrl = (imgObj) => {
    if (!imgObj) return "";
    if (imgObj.url) return imgObj.url;
    if (imgObj.filename)
      return `${API}/uploads/products/images/${imgObj.filename}`;
    return "";
  };

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [heroSrc, setHeroSrc] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [addLoading, setAddLoading] = useState(null);

  useLayoutEffect(() => {
    let mounted = true;
    window.scrollTo(0, 0);

    const load = async () => {
      try {
        setLoading(true);
        const res = await getProductDetails(id);
        if (!mounted) return;

        const p = res?.data?.product || null;
        setProduct(p);

        const h = thumbUrl(p) || imageUrl(p?.images?.[0]) || FALLBACK_IMG;
        setHeroSrc(h);
      } catch (error) {
        if (!mounted) return;
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch product details!",
        );
        setProduct(null);
        setHeroSrc("");
      } finally {
        mounted && setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const inStock = typeof product?.stock === "number" ? product.stock > 0 : true;

  const gallery = useMemo(() => {
    const arr = [];
    const t = thumbUrl(product);
    if (t) arr.push({ key: "thumb", src: t, type: "thumbnail" });

    if (Array.isArray(product?.images) && product.images.length) {
      product.images.forEach((img, idx) => {
        const u = imageUrl(img);
        if (u) arr.push({ key: `img-${idx}`, src: u, type: "image" });
      });
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, API]);

  const categoryText = Array.isArray(product?.category)
    ? product.category.join(" / ")
    : product?.category || "Products";

  const descText =
    product?.longDescription ||
    product?.shortDescription ||
    product?.description ||
    "No description available for this product.";

  const detailPoints = [
    `Brand: ${product?.brand || "-"}`,
    `Unit: ${product?.unit || "-"}`,
    `Available: ${typeof product?.stock === "number" ? product.stock : "-"}`,
    `Category: ${
      Array.isArray(product?.category)
        ? product.category.join(", ")
        : product?.category || "-"
    }`,
  ];

  const handleAddToCart = async (productId) => {
    try {
      setAddLoading(productId);

      const data = await addToCart({ productId, qunatity: 1 });
      toast.success(data?.message || "Added to cart!");
    } catch (error) {
      toast.error(error?.message || "Failed to add!");
    } finally {
      setAddLoading(null);
    }
  };

  const handleShare = async (productId) => {
    try {
      const productUrl = `${window.location.origin}/products/${productId}`;
      if (navigator.share) {
        await navigator.share({
          title: `Product: ${product.name}`,
          text: `Check out ${product.name}`,
          url: productUrl,
        });
        toast.success("product shared successfully!");
      } else {
        await navigator.clipboard.writeText(productUrl);
        toast.success("Link copied!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to share!");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* top crumb + back */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => navigate("/products")}
            aria-label="Back"
            title="Back"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer"
            type="button"
          >
            <FaArrowLeft />
            Back
          </button>

          <div className="hidden sm:block text-md text-gray-500">
            <span className="hover:text-gray-700">
              <Link to="/">Home</Link>
            </span>
            <span className="mx-2">›</span>
            <span className="hover:text-gray-700">
              <Link to="/products">{categoryText}</Link>
            </span>
            <span className="mx-2">›</span>
            <span className="text-gray-800 font-semibold">
              {product?.name || "Product"}
            </span>
          </div>
        </div>

        {loading ? (
          <ProductDetailSkeleton />
        ) : !product ? (
          <div className="flex items-center justify-center">
            <img
              src={NoProductImg}
              alt="No Product Found Image"
              loading="lazy"
              decoding="async"
              className="h-150 object-contain"
              width="full"
              height="full"
            />
          </div>
        ) : (
          <>
            {/* main grid */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* LEFT */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-white border border-gray-200 p-5">
                  <div className="flex items-center justify-between">
                    {/* tags */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {TAGS.map((t, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${t.className}`}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                    {/* Share */}
                    <button
                      onClick={() => handleShare(product._id)}
                      aria-label="Share Product"
                      title="Share Product"
                      className="cursor-pointer bg-emerald-100 rounded-full text-emerald-800 p-3"
                    >
                      <FaShareAlt title="Share product" />
                    </button>
                  </div>

                  {/* hero */}
                  <div className="mt-4 rounded-2xl border border-gray-200 bg-white h-80 flex items-center justify-center overflow-hidden">
                    {loading ? (
                      <p className="text-gray-500 font-semibold">
                        Loading image...
                      </p>
                    ) : heroSrc ? (
                      <img
                        src={heroSrc}
                        loading="lazy"
                        decoding="async"
                        width="full"
                        height="full"
                        alt={product?.name || "Product"}
                        onError={() => setHeroSrc(FALLBACK_IMG)}
                        className="h-full w-full object-contain bg-gray-100"
                      />
                    ) : (
                      <p className="text-gray-500 font-semibold">No image</p>
                    )}
                  </div>
                </div>

                {/* thumbs */}
                {gallery.length > 1 && (
                  <div className="mt-4 relative">
                    <div className="flex items-center gap-3 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory no-scrollbar pr-10">
                      {gallery.map((g) => (
                        <button
                          key={g.key}
                          type="button"
                          onClick={() => setHeroSrc(g.src)}
                          className={`shrink-0 snap-start h-16 w-16 md:h-20 md:w-20 rounded-xl border bg-white overflow-hidden flex items-center justify-center transition-all hover:border-emerald-400 ${
                            heroSrc === g.src
                              ? "border-emerald-500 ring-2 ring-emerald-100"
                              : "border-gray-200"
                          }`}
                          aria-label="Preview"
                          title="Preview"
                        >
                          <img
                            src={g.src}
                            loading="lazy"
                            decoding="async"
                            alt="thumb"
                            width="full"
                            height="full"
                            onError={(e) =>
                              (e.currentTarget.src = FALLBACK_IMG)
                            }
                            className="h-10 md:h-20 w-auto object-contain"
                          />
                        </button>
                      ))}
                    </div>
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-linear-to-l from-white to-transparent" />
                  </div>
                )}
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-7">
                {/* brand */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 bg-emerald-100 px-5 py-2 rounded-xl font-bold text-sm">
                      {product?.brand || "Nature's Best"}
                    </span>
                  </div>
                </div>

                {/* title */}
                <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {product?.name || "Product Name"}
                </h1>

                {/* price */}
                <div className="mt-4 flex items-end gap-3">
                  <p className="text-3xl font-extrabold text-gray-900">
                    ₹{product?.price ?? "-"}
                  </p>
                  <p className="text-sm text-gray-500">
                    / {product?.unit || "unit"}
                    {product?.unit ? "" : " (approx.)"}
                  </p>
                </div>

                {/* stock */}
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-2 text-sm font-semibold ${
                      inStock ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        inStock ? "bg-emerald-600" : "bg-red-600"
                      }`}
                    />
                    {inStock ? "In Stock" : "Out of Stock"}
                  </span>

                  {typeof product?.stock === "number" && inStock && (
                    <span className="text-sm text-gray-500">
                      • {product.stock} left
                    </span>
                  )}
                </div>

                <div className="my-4 h-px bg-gray-200" />

                {/* Product description */}
                <div className="font-normal text-gray-500 text-justify">
                  {product?.longDescription}
                </div>

                {/* Product quantity */}
                <div className="my-5 font-semibold">
                  Quantity left:{" "}
                  <span className="text-gray-500">{product?.stock}</span>
                </div>

                {/* add to cart */}
                <div className="mt-5">
                  <button
                    type="button"
                    aria-label="Add to Cart"
                    title="Add to Cart"
                    className={`flex-1 h-11 rounded-xl text-white font-bold shadow-sm p-3
                            ${
                              !inStock || addLoading === id
                                ? "bg-emerald-300 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                            }
                          `}
                    onClick={() => handleAddToCart(id)}
                    disabled={!inStock || addLoading === id}
                  >
                    {addLoading === id ? (
                      <p>Adding product...</p>
                    ) : (
                      <p>Add to cart</p>
                    )}
                  </button>
                </div>

                {/* delivery cards */}
                <div className="mt-5 rounded-2xl bg-emerald-50 border border-emerald-100 p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-emerald-700">
                      <FaTruck />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-gray-900">
                        Same-day Delivery
                      </p>
                      <p className="text-sm text-gray-600">
                        Available for orders placed before 2 PM.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-emerald-700">
                      <FaStore />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-gray-900">
                        In-store Pickup
                      </p>
                      <p className="text-sm text-gray-600">
                        Ready in 1 hour at Main Street Store.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs FULL WIDTH (moved outside grid) */}
            <div className="mt-8 w-full rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-6 border-b border-gray-200">
                <button
                  type="button"
                  aria-label="Description"
                  title="Description"
                  className={`pb-3 text-sm font-extrabold transition ${
                    activeTab === "description"
                      ? "text-gray-900 border-b-2 border-emerald-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>

                <button
                  type="button"
                  aria-label="Nutrition"
                  title="Nutrition"
                  className={`pb-3 text-sm font-extrabold transition ${
                    activeTab === "nutrition"
                      ? "text-gray-900 border-b-2 border-emerald-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab("nutrition")}
                >
                  Nutrition
                </button>

                <button
                  type="button"
                  aria-label="Details"
                  title="Details"
                  className={`pb-3 text-sm font-extrabold transition ${
                    activeTab === "details"
                      ? "text-gray-900 border-b-2 border-emerald-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
              </div>

              <div className="pt-5">
                {activeTab === "description" && (
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    <p>{descText}</p>
                    <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-700">
                      <li>Freshly packed for better shelf life</li>
                      <li>Great for smoothies, snacks, and breakfast</li>
                      <li>Quality checked packaging</li>
                    </ul>
                  </div>
                )}

                {activeTab === "nutrition" && (
                  <div className="text-sm text-gray-700">
                    <p className="font-bold text-gray-900">
                      Nutrition Highlights
                    </p>
                    <ul className="mt-3 space-y-2 list-disc pl-5">
                      {NUTRITION_POINTS.map((n, i) => (
                        <li key={i}>{n}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "details" && (
                  <div className="text-sm text-gray-700">
                    <p className="font-bold text-gray-900">Product Details</p>
                    <ul className="mt-3 space-y-2 list-disc pl-5">
                      {detailPoints.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews FULL WIDTH */}
            <div className="mt-8 w-full rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold text-gray-900">
                    Ratings & Reviews
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {rating} ★ • {reviewCount} reviews
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Write Review"
                  title="Write Review"
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-extrabold text-gray-900 hover:bg-gray-50"
                  onClick={() => toast.info("Write review (demo)")}
                >
                  Write Review
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {DEMO_REVIEWS.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-gray-50 border border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-extrabold text-gray-900">
                          {r.name}
                        </p>
                        <p className="text-xs text-gray-500">{r.time}</p>
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full bg-emerald-600 text-white px-3 py-1 text-xs font-extrabold">
                        <FaStar />
                        {r.stars}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
