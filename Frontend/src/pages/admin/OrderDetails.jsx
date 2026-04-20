import { lazy, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { updateStatus, getOrderById } from "../../api/adminApi";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

import {
  getOrderBadge,
  getOrderStatusName,
  getOrderStatusColor,
  orderSteps,
} from "../../utils/order";

import OrderStatusProgress from "../../components/common/OrderStatusProgress";
import H3 from "../../components/ui/H3";
import OrderDetailsSkeleton from "../../components/skeleton/OrderDetailsSkeleton";

const OrderCard = lazy(() => import("../../components/common/OrderCard"));

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getOrderById(id);

      const order = res?.data?.order;
      setOrderDetails(order);
      setOrderStatus(order?.orderStatus || "");
    } catch (err) {
      toast.error(err?.message || "Failed to load order");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleStatusUpdate = async () => {
    try {
      setLoadingStatus(true);

      const res = await updateStatus(orderDetails._id, {
        orderStatus,
      });

      const updatedOrder = res?.data?.order;

      setOrderDetails(updatedOrder);
      setOrderStatus(updatedOrder?.orderStatus);

      toast.success("Status updated!");
    } catch (err) {
      toast.error("Failed to update status!");
    } finally {
      setLoadingStatus(false);
    }
  };

  const itemCount = orderDetails?.items?.length || 0;
  const shippingAddress = orderDetails?.shippingAddress || {};

  if (loading) return <OrderDetailsSkeleton />;

  if (!orderDetails) {
    return <div className="p-6 text-center text-gray-500">Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase">
              Order Overview
            </p>

            <H3>Order #{orderDetails?.razorpay?.orderId?.slice(6) || "N/A"}</H3>

            <div className="flex items-center gap-3 mt-2">
              <span
                className={`px-3 py-1 text-sm rounded-full font-semibold ${getOrderStatusColor(
                  orderDetails?.orderStatus,
                )}`}
              >
                {getOrderBadge(orderDetails?.orderStatus)}{" "}
                {getOrderStatusName(orderDetails?.orderStatus)}
              </span>

              <p className="text-sm text-gray-500">{itemCount} items</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="border px-4 py-2 rounded-lg bg-white flex items-center gap-2"
            >
              <IoMdArrowRoundBack />
              Back
            </button>
          </div>
        </div>

        {/* STATUS UPDATE BAR */}
        <div className="flex gap-3 mb-6">
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="border border-emerald-100 p-3 rounded-lg w-full bg-white"
          >
            {orderSteps.map((s) => (
              <>
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              </>
            ))}
            <option value="cancelled">Cancel</option>
          </select>

          <button
            onClick={handleStatusUpdate}
            disabled={loadingStatus}
            className="min-w-fit bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {loadingStatus ? "Updating..." : "Update Status"}
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT SIDE */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* ORDER ITEMS */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="font-semibold mb-3">Order Items</h2>

              {orderDetails?.items?.length ? (
                <OrderCard order={orderDetails} />
              ) : (
                <p className="text-gray-500 text-sm">No items found</p>
              )}
            </div>

            {/* ORDER ACTIVITY */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Order Activity</h2>
                <span className="text-sm text-emerald-600 font-semibold">
                  1 / 5 Completed
                </span>
              </div>

              <OrderStatusProgress />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            {/* CUSTOMER */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="font-semibold mb-3">Customer Details</h2>
              <p className="font-medium">{orderDetails?.user?.name}</p>
              <p className="text-sm text-gray-500">
                {orderDetails?.user?.email}
              </p>
            </div>

            {/* SHIPPING */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="font-semibold mb-3">Shipping Details</h2>

              <p className="text-sm">{shippingAddress?.address}</p>
              <p className="text-sm">{shippingAddress?.phone}</p>
              <p className="text-sm">{shippingAddress?.name}</p>
            </div>

            {/* PAYMENT */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="font-semibold mb-3">Payment</h2>
              <p className="text-sm">
                {orderDetails?.paymentMethod || "Razorpay"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
