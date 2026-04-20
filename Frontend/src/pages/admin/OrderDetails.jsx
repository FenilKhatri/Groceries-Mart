import { lazy, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { updateStatus, getOrderById } from "../../api/adminApi";
import { useNavigate, useParams } from "react-router-dom";

import { FaRegCalendar, IoCardSharp } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { FiUser, FiPhone, FiTruck } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { RiBillLine } from "react-icons/ri";

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

  // FETCH ORDER (stable function)
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

  // UPDATE STATUS
  const handleStatusUpdate = async () => {
    if (!orderDetails?._id) return;

    const confirmUpdate = window.confirm(
      "Are you sure you want to update status?",
    );
    if (!confirmUpdate) return;

    try {
      setLoadingStatus(true);

      const res = await updateStatus(orderDetails._id, {
        orderStatus,
      });

      const updatedOrder = res?.data?.order;

      setOrderDetails(updatedOrder);
      setOrderStatus(updatedOrder?.orderStatus);

      toast.success(res?.data?.message || "Status updated!");
    } catch (err) {
      toast.error(err?.message || "Failed to update status!");
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
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-emerald-600">
              Order Overview
            </p>

            <H3>Order #{orderDetails?.razorpay?.orderId?.slice(6) || "N/A"}</H3>

            <div className="flex items-center gap-3 mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getOrderStatusColor(
                  orderDetails?.orderStatus,
                )}`}
              >
                {getOrderBadge(orderDetails?.orderStatus)}{" "}
                {getOrderStatusName(orderDetails?.orderStatus)}
              </span>

              <p className="text-sm text-gray-500">{itemCount} items</p>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border px-4 py-2 rounded-xl"
          >
            <IoMdArrowBack />
            Back
          </button>
        </div>

        {/* STATUS UPDATE */}
        <div className="my-6 flex gap-3">
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            disabled={
              orderStatus === "delivered" || orderStatus === "cancelled"
            }
            className="border p-3 rounded-xl w-full"
          >
            {orderSteps.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleStatusUpdate}
            disabled={loadingStatus}
            className="bg-emerald-600 text-white px-5 py-3 rounded-xl disabled:opacity-50"
          >
            {loadingStatus ? "Updating..." : "Update"}
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-8">
            <OrderCard order={orderDetails} />
            <OrderStatusProgress />
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            {/* CUSTOMER */}
            <div className="border p-5 rounded-xl">
              <p className="font-semibold mb-3">Customer</p>

              <p>{orderDetails?.user?.name || "-"}</p>
              <p>{orderDetails?.user?.email || "-"}</p>
            </div>

            {/* SHIPPING */}
            <div className="border p-5 rounded-xl">
              <p className="font-semibold mb-3">Shipping</p>

              <p>{shippingAddress?.name}</p>
              <p>{shippingAddress?.phone}</p>
              <p>{shippingAddress?.address}</p>
            </div>

            {/* PAYMENT */}
            <div className="border p-5 rounded-xl">
              <p className="font-semibold mb-3">Payment</p>

              <p>{orderDetails?.paymentMethod || "Razorpay"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
