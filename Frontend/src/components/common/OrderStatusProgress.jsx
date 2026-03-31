import useOrderDetails from "../../hooks/OrderDetails";
import { getOrderStatusName } from "./OrderComponent";

const ORDER_STEPS = [
  { key: "placed", label: "Placed", icon: "📦" },
  { key: "confirmed", label: "Confirmed", icon: "✅" },
  { key: "packed", label: "Packed", icon: "📦" },
  { key: "out_for_delivery", label: "Out for Delivery", icon: "🚚" },
  { key: "delivered", label: "Delivered", icon: "🎉" },
];

const getCurrentStepIndex = (status) => {
  if (status === "cancelled") return -1;
  return ORDER_STEPS.findIndex((step) => step.key === status);
};

const OrderStatusProgress = () => {
  const { orderDetails } = useOrderDetails();

  const currentStatus = orderDetails?.orderStatus || "placed";
  const currentStepIndex = getCurrentStepIndex(currentStatus);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-800">Order Activity</p>
            <p className="text-sm text-gray-500">
              Current status: {getOrderStatusName(currentStatus)}
            </p>
          </div>

          {currentStatus === "cancelled" ? (
            <span className="inline-flex w-fit items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
              ❌ Cancelled
            </span>
          ) : (
            <span className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              {currentStepIndex + 1} / {ORDER_STEPS.length} Completed
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-300 p-6">
        {currentStatus === "cancelled" ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-base font-semibold text-red-700">
              This order has been cancelled.
            </p>
            <p className="mt-1 text-sm text-red-600">
              No further delivery progress is available for this order.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden md:grid md:grid-cols-5 md:gap-4">
              {ORDER_STEPS.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div key={step.key} className="relative flex flex-col items-center">
                    {index !== ORDER_STEPS.length - 1 ? (
                      <div
                        className={`absolute left-1/2 top-5 h-1 w-full translate-x-1/2 rounded-full ${
                          index < currentStepIndex ? "bg-emerald-500" : "bg-gray-200"
                        }`}
                      />
                    ) : null}

                    <div
                      className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 text-lg ${
                        isCompleted
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      {step.icon}
                    </div>

                    <p
                      className={`mt-3 text-center text-sm font-semibold ${
                        isCurrent
                          ? "text-emerald-700"
                          : isCompleted
                            ? "text-gray-700"
                            : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>

                    <p className="mt-1 text-center text-xs text-gray-400">
                      Step {index + 1}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4 md:hidden">
              {ORDER_STEPS.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div key={step.key} className="flex items-start gap-4">
                    <div
                      className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-base ${
                        isCompleted
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      {step.icon}
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`font-semibold ${
                          isCurrent
                            ? "text-emerald-700"
                            : isCompleted
                              ? "text-gray-700"
                              : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-sm text-gray-400">Step {index + 1}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderStatusProgress;