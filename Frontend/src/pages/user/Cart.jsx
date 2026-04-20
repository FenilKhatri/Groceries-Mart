import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteCart,
  removeItem,
  updateQuantity,
  userCart,
} from "../../api/userApi";
import { Link } from "react-router-dom";
import { TbRefreshOff } from "react-icons/tb";
import UserCartSkeleton from "../../components/skeleton/UserCartSkeleton";
import OrderSummarySkeleton from "../../components/skeleton/OrderSummarySkeleton";

const UserCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState(null);

  const getPid = (item) =>
    item?.product?._id || item?.product?.id || item?.product;

  const refreshCart = async (successMsg) => {
    if (successMsg) toast.success(successMsg);
    await handleCart();
  };

  const handleCart = async () => {
    try {
      setLoading(true);
      const data = await userCart();
      setCart(data?.cart || { items: [], totalAmount: 0 });
    } catch (error) {
      toast.error(error?.message || "Failed to fetch!");
      setCart({ items: [], totalAmount: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (updatingProductId === productId) return;
    if (quantity < 1) return;

    try {
      setUpdatingProductId(productId);
      const data = await updateQuantity({ productId, quantity });
      await refreshCart(data?.message || "Cart updated!");
    } catch (error) {
      toast.error(error?.message || "Failed to update cart!");
    } finally {
      setUpdatingProductId(null);
    }
  };

  const handleRemoveItem = async (productId) => {
    if (!cart?.items?.length) return;

    const confirm = window.confirm(
      "Are you sure you want to remove item from cart?",
    );
    if (!confirm) return;

    try {
      const data = await removeItem({ productId });
      await refreshCart(data?.message || "Item removed from cart!");
    } catch (error) {
      toast.error(error?.message || "Failed to remove item!");
    }
  };

  const handleDeleteCart = async () => {
    if (!cart?.items?.length) return;

    const confirm = window.confirm("Are you sure you want to clear your cart?");
    if (!confirm) return;

    try {
      setClearing(true);
      const data = await deleteCart();
      toast.success(data?.message || "Cart cleared!");
      setCart({ items: [], totalAmount: 0 });
    } catch (error) {
      toast.error(error?.message || "Failed to clear cart!");
    } finally {
      setClearing(false);
    }
  };

  useEffect(() => {
    handleCart();
    const handleFocus = () => handleCart();
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const ProductImage = ({ src, alt, priority }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <div className="relative h-full w-full overflow-hidden bg-gray-100">
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width="full"
          height="full"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition duration-500 ${
            loaded ? "blur-0 scale-100" : "blur-md scale-110"
          }`}
        />
      </div>
    );
  };

  const itemsCount = cart?.items?.length || 0;

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-3 text-sm text-gray-400">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-gray-700">Shopping Cart</span>
        </div>

        {/* Title */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-900">
            Your Cart{" "}
            <span className="text-base font-semibold text-gray-400">
              ({itemsCount} {itemsCount === 1 ? "item" : "items"})
            </span>
          </h2>

          <button
            onClick={handleDeleteCart}
            aria-label="Delete"
            title="Delete"
            disabled={clearing || !cart?.items?.length}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
              clearing || !cart?.items?.length
                ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                : "cursor-pointer border-gray-300 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            <TbRefreshOff className={`${clearing ? "animate-spin" : ""}`} />
            {clearing ? "Clearing..." : "Clear Cart"}
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT: Cart items */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              {/* Header row */}
              <div className="flex items-center justify-between px-6 py-5">
                <p className="font-bold text-gray-900">Product Details</p>
                <p className="hidden font-bold text-gray-900 md:block">
                  Quantity &amp; Price
                </p>
              </div>

              <div className="mx-5 h-px bg-gray-200" />

              {/* Correct order: loading -> empty -> data */}
              {loading ? (
                <UserCartSkeleton cartLength={3} />
              ) : itemsCount === 0 ? (
                <div className="p-10 text-center">
                  <p className="font-semibold text-gray-600">
                    Your cart is empty.
                  </p>
                  <Link
                    to="/products"
                    className="mt-4 inline-block font-semibold text-emerald-600 hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {cart?.items?.map((item, index) => {
                    const img =
                      item?.product?.thumbnail?.url ||
                      item?.product?.images?.[0]?.url ||
                      "";

                    const pid = getPid(item);
                    const isUpdating = updatingProductId === pid;

                    return (
                      <div
                        key={pid || index}
                        className="mx-4 my-4 flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row md:items-center md:justify-between"
                      >
                        {/* Left */}
                        <div className="flex items-center gap-5">
                          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                            <ProductImage
                              src={img}
                              alt={item?.product?.name || "Product image"}
                              priority={index < 4}
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-400">
                              {item?.product?.brand || "Nature's Best"}
                            </p>
                            <p className="line-clamp-1 text-lg font-semibold text-gray-900">
                              {item?.product?.name}
                            </p>
                            <p className="text-sm font-semibold text-gray-400">
                              {item?.product?.category || "Fresh Grocery"}
                            </p>

                            <button
                              onClick={() => handleRemoveItem(pid)}
                              aria-label="Remove"
                              title="Remove"
                              className="mt-2 text-sm font-semibold text-red-500 transition hover:text-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Right */}
                        <div className="flex flex-col items-start gap-4 md:items-end">
                          <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(pid, item?.quantity - 1)
                              }
                              aria-label="Decrease"
                              title="Decrease"
                              disabled={isUpdating || item?.quantity <= 1}
                              className="px-4 py-2 text-lg font-bold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              -
                            </button>

                            <span className="min-w-12.5 border-x border-gray-200 px-4 py-2 text-center text-sm font-semibold text-gray-900">
                              {isUpdating ? "..." : item?.quantity}
                            </span>

                            <button
                              onClick={() =>
                                handleUpdateQuantity(pid, item?.quantity + 1)
                              }
                              disabled={isUpdating}
                              aria-label="Increase"
                              title="Increase"
                              className="px-4 py-2 text-lg font-bold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-400">
                              Price
                            </p>
                            <p className="text-lg font-bold text-emerald-600">
                              ₹ {item?.product?.price || 0}
                            </p>
                            <p className="text-sm text-gray-500">
                              Total: ₹{" "}
                              {(item?.product?.price || 0) *
                                (item?.quantity || 0)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
              <p className="mt-1 text-sm text-gray-400">
                Review your items before checkout.
              </p>

              {loading ? (
                <OrderSummarySkeleton />
              ) : itemsCount === 0 ? (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-400">
                    Please purchase at least 1 item to proceed!
                  </p>
                  <Link
                    to="/products"
                    className="mt-4 block text-center font-semibold text-emerald-600 hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-400">
                        Items Subtotal
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        ₹ {cart?.totalAmount || 0}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-400">
                        Delivery Charges
                      </p>
                      <p className="text-sm font-semibold text-emerald-600">
                        Free
                      </p>
                    </div>
                  </div>

                  <div className="my-6 h-px bg-gray-200" />

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">
                      Total Amount
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹ {cart?.totalAmount || 0}
                    </p>
                  </div>

                  <Link
                    to="/users/checkout"
                    className="mt-5 block cursor-pointer rounded-md bg-orange-500 py-3.5 text-center text-base font-semibold text-white transition duration-300 hover:bg-orange-600"
                  >
                    Proceed to Checkout
                  </Link>

                  <Link
                    to="/products"
                    className="mt-4 block text-center font-semibold text-emerald-600 hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </>
              )}
            </div>

            <div className="mt-6 rounded-md bg-emerald-600 px-6 py-4 text-center font-bold text-white">
              Safe and secure payments. 100% Authentic products directly from
              trusted vendors.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCart;
