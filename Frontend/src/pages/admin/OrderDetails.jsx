import { lazy, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { updateStatus, getOrderById } from "../../features/admin/api";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineCreditCard,
} from "react-icons/hi";

import H3 from "../../shared/components/ui/H3";
import OrderDetailsSkeleton from "../../shared/components/feedback/skeleton/OrderDetailsSkeleton";
import OrderStatusProgress from "../../shared/components/common/OrderStatusProgress";
import {
  getOrderBadge,
  getOrderStatusName,
  getOrderStatusColor,
  orderSteps,
} from "../../utils/order";

const OrderCard = lazy(
  () => import("../../shared/components/common/OrderCard"),
);

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
    <div className="min-h-screen bg-gradient-to-b from-[#f7fff8] via-[#f8fffb] to-[#eefbf1] p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
              Order Overview
            </p>

            <H3 className="mt-1 text-gray-900">
              Order #{orderDetails?.razorpay?.orderId?.slice(6) || "N/A"}
            </H3>

            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span
                className={`px-4 py-1.5 text-xs rounded-full font-semibold shadow-sm ${getOrderStatusColor(
                  orderDetails?.orderStatus,
                )}`}
              >
                {getOrderBadge(orderDetails?.orderStatus)}{" "}
                {getOrderStatusName(orderDetails?.orderStatus)}
              </span>

              <span className="text-sm text-gray-500">
                {itemCount} item{itemCount !== 1 && "s"}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 transition shadow-sm"
          >
            <IoMdArrowRoundBack />
            Back
          </button>
        </div>

        {/* STATUS UPDATE */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="flex-1 border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 p-3 rounded-xl bg-white text-sm outline-none"
          >
            {orderSteps.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
            <option value="cancelled">Cancel</option>
          </select>

          <button
            onClick={handleStatusUpdate}
            disabled={loadingStatus}
            className="min-w-40 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition disabled:opacity-60"
          >
            {loadingStatus ? "Updating..." : "Update Status"}
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* ITEMS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h2 className="font-semibold text-gray-900 mb-4">Order Items</h2>

              {orderDetails?.items?.length ? (
                <OrderCard order={orderDetails} />
              ) : (
                <p className="text-gray-500 text-sm">No items found</p>
              )}
            </div>

            {/* ACTIVITY */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Order Activity</h2>
                <span className="text-sm text-emerald-600 font-semibold">
                  Progress
                </span>
              </div>

              <OrderStatusProgress currentStatus={orderDetails?.orderStatus} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            {/* CUSTOMER */}
            <Card
              icon={<HiOutlineUser />}
              title="Customer Details"
              color="emerald"
            >
              <Info icon={<HiOutlineUser />} value={orderDetails?.user?.name} />
              <Info
                icon={<HiOutlineMail />}
                value={orderDetails?.user?.email}
              />
            </Card>

            {/* SHIPPING */}
            <Card
              icon={<HiOutlineLocationMarker />}
              title="Shipping Details"
              color="blue"
            >
              <Info
                icon={<HiOutlineLocationMarker />}
                value={shippingAddress?.address}
              />
              <Info icon={<HiOutlinePhone />} value={shippingAddress?.phone} />
              <Info icon={<HiOutlineUser />} value={shippingAddress?.name} />
            </Card>

            {/* PAYMENT */}
            <Card icon={<HiOutlineCreditCard />} title="Payment" color="purple">
              <Info
                icon={<HiOutlineCreditCard />}
                value={orderDetails?.paymentMethod || "Razorpay"}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Card */
const Card = ({ icon, title, children, color }) => {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`p-2 rounded-lg ${colors[color] || "bg-gray-100 text-gray-600"}`}
        >
          {icon}
        </div>
        <h2 className="font-semibold text-gray-900">{title}</h2>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
};

/* Reusable Info Row */
const Info = ({ icon, value }) => (
  <div className="flex items-start gap-3 text-sm">
    <span className="text-gray-400 mt-1">{icon}</span>
    <p className="text-gray-700 break-all">{value || "—"}</p>
  </div>
);

export default OrderDetails;
