import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateStatus } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";
import { FaRegCalendar } from "react-icons/fa";
import { IoPrintSharp, IoCardSharp } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { FiUser, FiPhone, FiTruck } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { RiBillLine } from "react-icons/ri";
import {
  getOrderBadge,
  getOrderStatusName,
  getOrderStatusColor,
} from "../../components/common/OrderComponent";
import OrderStatusProgress from "../../components/common/OrderStatusProgress";
import OrderCard from "../../components/common/OrderCard";
import useOrderDetails from "../../hooks/OrderDetails";

const OrderDetails = () => {
  const [orderStatus, setOrderStatus] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);

  const navigate = useNavigate();
  const { orderDetails, setOrderDetails, loading } = useOrderDetails();

  useEffect(() => {
    if (orderDetails?.orderStatus) {
      setOrderStatus(orderDetails.orderStatus);
    }
  }, [orderDetails]);

  const handleStatusUpdate = async (id) => {
    const adminRes = confirm("Are you sure you want to update status?");
    if (!adminRes) return;

    try {
      setLoadingStatus(true);
      const res = await updateStatus(id, { orderStatus });
      setOrderDetails(res?.data?.order);
      setOrderStatus(res?.data?.order?.orderStatus);
      toast.success(res?.data?.message || "Status updated!");
    } catch (error) {
      toast.error(error?.message || "Failed to update status!");
    } finally {
      setLoadingStatus(false);
    }
  };

  const itemCount = orderDetails?.items?.length || 0;

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6">
      {loading ? (
        <div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <p className="text-center font-semibold text-lg sm:text-xl md:text-2xl animate-pulse">
              Loading Order Details...
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div>
            <div className="px-4 py-5 sm:px-6">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                {/* Left Section */}
                <div className="min-w-0 flex-1">
                  {/* Top row */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                          Order Overview
                        </p>
                        <h1 className="mt-1 break-all text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                          Order #
                          {orderDetails?.razorpay?.orderId
                            ? orderDetails?.razorpay?.orderId.slice(6)
                            : "N/A"}
                        </h1>
                      </div>

                      <span
                        className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm ${getOrderStatusColor(
                          orderDetails?.orderStatus,
                        )}`}
                      >
                        {getOrderBadge(orderDetails?.orderStatus)}
                        {getOrderStatusName(orderDetails?.orderStatus)}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                      <p className="flex items-center gap-2 font-medium">
                        <FaRegCalendar className="shrink-0 text-gray-400" />
                        {orderDetails?.createdAt
                          ? new Date(orderDetails?.createdAt).toLocaleString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )
                          : "N/A"}
                      </p>

                      <span className="hidden sm:inline text-gray-300">|</span>

                      <p className="font-medium">
                        {itemCount} {itemCount === 1 ? "Item" : "Items"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="w-full xl:w-auto">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 cursor-pointer">
                      <IoPrintSharp className="text-base" />
                      Print Order
                    </button>

                    <button
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-200 cursor-pointer"
                      onClick={() => navigate(-1)}
                    >
                      <IoMdArrowBack className="text-base" />
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="my-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Update Order Status
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={orderStatus}
                name="orderStatus"
                id="orderStatus"
                onChange={(e) => setOrderStatus(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-emerald-400"
              >
                <option value="placed">Place</option>
                <option value="confirmed">Confirm</option>
                <option value="packed">Pack</option>
                <option value="out_for_delivery">Out of Delivery</option>
                <option value="delivered">Deliver</option>
                <option value="cancelled">Cancel</option>
              </select>

              <button
                className={`w-full min-w-fit sm:w-auto rounded-xl px-5 py-3 text-sm font-semibold text-white transition
                            ${
                              loadingStatus
                                ? "bg-emerald-600 opacity-60 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                            }`}
                onClick={() => handleStatusUpdate(orderDetails?._id)}
                disabled={loadingStatus}
              >
                {loadingStatus ? "Updating status..." : "Update Status"}
              </button>
            </div>
          </div>

          {/* Order Section */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Section */}
            <div className="col-span-12 lg:col-span-8">
              <div className="flex flex-col gap-2 lg:gap-5">
                {/* Order Items */}
                <OrderCard />

                {/* Order Activity */}
                <OrderStatusProgress />

                {/* Customer Note */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-6">
                    <p className="text-lg font-semibold text-gray-800">
                      Customer Note
                    </p>
                  </div>
                  <div className="border-t border-gray-300">
                    <div className="p-6">
                      <p className="font-regular text-gray-500">
                        {orderDetails?.customerNote || "NA"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-span-12 lg:col-span-4">
              <div className="flex flex-col gap-2 lg:gap-5">
                {/* Customer Section */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-6">
                    <p className="text-lg font-semibold text-gray-800">
                      Customer Details
                    </p>
                  </div>

                  <div className="p-6 space-y-4 text-sm border-t border-t-slate-300">
                    <div className="flex items-start gap-3">
                      <FiUser size={20} className="text-gray-400" />
                      <div>
                        <p className="text-gray-400 uppercase font-semibold">
                          Customer Name
                        </p>
                        <p className="font-medium text-gray-700">
                          {orderDetails?.user?.name || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MdOutlineEmail size={20} className="text-gray-400" />
                      <div>
                        <p className="text-gray-400 uppercase font-semibold">
                          Email
                        </p>
                        <p className="font-medium text-gray-700">
                          {orderDetails?.user?.email || "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-6">
                    <p className="text-lg font-semibold text-gray-800">
                      Shipping Details
                    </p>
                  </div>

                  {/* Shipping location */}
                  <div className="p-6 space-y-4 text-sm border-t border-t-slate-300">
                    <div className="flex items-start gap-3">
                      <GrLocation size={20} className="text-gray-400" />
                      <div>
                        <p className="text-gray-400 uppercase font-semibold">
                          Shipping Location
                        </p>
                        <p className="font-medium text-gray-700">
                          {orderDetails?.shippingAddress?.address || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Shipping Person name */}
                    <div className="flex items-start gap-3">
                      <FiUser size={20} className="text-gray-400" />
                      <div>
                        <p className="text-gray-400 uppercase font-semibold">
                          Shipping Name
                        </p>
                        <p className="font-medium text-gray-700">
                          {orderDetails?.shippingAddress?.name || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Shipping Phone number */}
                    <div className="flex items-start gap-3">
                      <FiPhone size={20} className="text-gray-400" />
                      <div>
                        <p className="text-gray-400 uppercase font-semibold">
                          Phone No.
                        </p>
                        <p className="font-medium text-gray-700">
                          {orderDetails?.shippingAddress?.phone || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Shipping method */}
                    <div className="flex items-start gap-3">
                      <FiTruck size={20} className="text-gray-400" />
                      <div>
                        <p className="text-gray-400 uppercase font-semibold">
                          Shipping Method
                        </p>
                        <p className="font-medium text-gray-700">
                          Standard Delivery (2-3 Days)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="p-6">
                    <p className="text-lg font-semibold text-gray-800">
                      Payment Information
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="p-6 space-y-4 text-sm border-t border-t-slate-300">
                    <div className="flex items-start gap-3">
                      <IoCardSharp size={20} className="text-gray-400" />
                      <div>
                        <p className="text-gray-400 uppercase font-semibold">
                          Payment Method
                        </p>
                        <p className="font-medium text-gray-700">
                          {orderDetails?.paymentMethod || "RazorPay"}
                        </p>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="flex items-start gap-3">
                      <RiBillLine size={20} className="text-gray-400" />
                      <div>
                        <p className="text-gray-400 uppercase font-semibold">
                          Billing Address
                        </p>
                        <p className="font-medium text-gray-700">
                          Same as shipping address
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
