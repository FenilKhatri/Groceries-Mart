import { TbFileInvoice } from "react-icons/tb";
import { PiCurrencyInrBold } from "react-icons/pi";
import {
  getOrderBadge,
  getOrderStatusName,
  getOrderStatusColor,
} from "../../utils/order";
import { toast } from "react-toastify";
import { downloadInvoice } from "../../features/user/api";

const OrderList = ({ orders = [], emptyMessage = "No orders found." }) => {
  const handleInvoice = async (id) => {
    try {
      const blob = await downloadInvoice(id);

      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" }),
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Invoice downloaded successfully!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to download invoice!",
      );
    }
  };

  if (orders.length === 0) {
    return (
      <p className="text-center text-xl font-semibold py-10">{emptyMessage}</p>
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-xl rounded-xl border border-gray-200"
        >
          <div className="p-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div className="flex flex-1 flex-wrap gap-6">
              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-gray-400 uppercase text-xs">
                  Order Id
                </p>
                <p className="font-bold text-xs">
                  #{order?.razorpay?.orderId?.slice(6) || "-"}
                </p>
              </div>

              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-gray-400 uppercase text-xs">
                  Date Placed
                </p>
                <p className="font-semibold text-sm">
                  {new Date(order?.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-gray-400 uppercase text-xs">
                  Shipped To
                </p>
                <p className="font-semibold text-sm">
                  {order?.shippingAddress?.name || "-"}
                </p>
              </div>
            </div>

            <div>
              <button
                className="flex items-center justify-center gap-3 shadow-md border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer px-4 py-2"
                onClick={() => handleInvoice(order._id)}
                aria-label="Download"
                title="Download"
              >
                <TbFileInvoice className="text-lg" />
                Download Invoice
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 p-5">
            <p
              className={`px-4 py-2 rounded-xl w-fit flex items-center gap-3 font-semibold ${getOrderStatusColor(order?.orderStatus)}`}
            >
              {getOrderBadge(order?.orderStatus)}
              {getOrderStatusName(order?.orderStatus)} on{" "}
              {new Date(order?.updatedAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="p-5 flex flex-col space-y-3">
            {order?.items?.map((item, index) => (
              <div key={item?._id || item?.product?._id || index}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-3 items-center">
                    <img
                      src={item?.product?.thumbnail?.url}
                      alt={item?.product?.name || "-"}
                      loading="lazy"
                      decoding="async"
                      width="full"
                      height="full"
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div className="flex flex-col items-start justify-between">
                      <p className="font-semibold">
                        {item?.product?.name || "-"}
                      </p>
                      <p className="font-medium text-gray-400">
                        Qty: {item?.quantity || "-"}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold flex items-center">
                    <PiCurrencyInrBold />
                    {item?.price || "-"}
                  </p>
                </div>

                {index !== order.items.length - 1 && (
                  <hr className="text-gray-300 mt-3" />
                )}
              </div>
            ))}
          </div>

          <hr className="text-gray-200" />

          <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="font-semibold text-gray-400">
              {order?.items?.length || 0}{" "}
              {order?.items?.length === 1 ? "Item" : "Items"} in this Order
            </div>
            <p className="flex gap-3 items-center font-bold uppercase text-md">
              Total Amount:
              <span className="text-emerald-800">₹{order?.totalAmount}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
