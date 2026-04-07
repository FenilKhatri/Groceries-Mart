import { getOrderStatusName, orderSteps } from "../../utils/order";
import useOrderDetails from "../../hooks/OrderDetails";
import { useMemo } from "react";

const getCurrentStepIndex = (status, steps) =>
  status === "cancelled" ? -1 : steps.findIndex((s) => s.key === status);

const OrderStatusProgress = () => {
  const { orderDetails } = useOrderDetails();

  const steps = useMemo(() => orderSteps, []);
  const currentStatus = orderDetails?.orderStatus || "placed";
  const currentStepIndex = getCurrentStepIndex(currentStatus, steps);

  const isCancelled = currentStatus === "cancelled";

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="text-lg font-semibold text-gray-800">Order Activity</p>
          <p className="text-sm text-gray-500">
            Current status: {getOrderStatusName(currentStatus)}
          </p>
        </div>

        <span
          className={`inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-semibold ${
            isCancelled
              ? "bg-red-50 text-red-600"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {isCancelled
            ? "❌ Cancelled"
            : `${currentStepIndex + 1} / ${steps.length} Completed`}
        </span>
      </div>

      {/* BODY */}
      <div className="border-t border-gray-300 p-6">
        {isCancelled ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="text-base font-semibold text-red-700">
              This order has been cancelled.
            </p>
            <p className="mt-1 text-sm text-red-600">
              No further delivery progress is available.
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP */}
            <div className="hidden md:grid md:grid-cols-5 gap-4">
              {steps.map((step, index) => {
                const state =
                  index < currentStepIndex
                    ? "completed"
                    : index === currentStepIndex
                      ? "current"
                      : "upcoming";

                return (
                  <StepItem
                    key={step.key}
                    step={step}
                    index={index}
                    state={state}
                    isLast={index === steps.length - 1}
                    currentStepIndex={currentStepIndex}
                    variant="desktop"
                  />
                );
              })}
            </div>

            {/* MOBILE */}
            <div className="space-y-4 md:hidden">
              {steps.map((step, index) => {
                const state =
                  index < currentStepIndex
                    ? "completed"
                    : index === currentStepIndex
                      ? "current"
                      : "upcoming";

                return (
                  <StepItem
                    key={step.key}
                    step={step}
                    index={index}
                    state={state}
                    variant="mobile"
                  />
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

const StepItem = ({
  step,
  index,
  state,
  isLast,
  currentStepIndex,
  variant,
}) => {
  const isCompleted = state === "completed" || state === "current";
  const isCurrent = state === "current";

  const circleStyle = isCompleted
    ? "border-emerald-500 bg-emerald-100 text-white"
    : "border-gray-300 bg-white text-gray-400";

  const textStyle = isCurrent
    ? "text-emerald-700"
    : isCompleted
      ? "text-gray-700"
      : "text-gray-400";

  // DESKTOP VIEW
  if (variant === "desktop") {
    return (
      <div className="relative flex flex-col items-center">
        {!isLast && (
          <div
            className={`absolute left-1/2 top-5 h-1 w-full translate-x-1/2 rounded-full ${
              index < currentStepIndex ? "bg-emerald-500" : "bg-gray-200"
            }`}
          />
        )}

        <div
          className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 text-lg ${circleStyle}`}
        >
          {step.icon}
        </div>

        <p className={`mt-3 text-sm font-semibold text-center ${textStyle}`}>
          {step.label}
        </p>

        <p className="mt-1 text-xs text-gray-400">Step {index + 1}</p>
      </div>
    );
  }

  // MOBILE VIEW
  return (
    <div className="flex items-start gap-4">
      <div
        className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full border-2 ${circleStyle}`}
      >
        {step.icon}
      </div>

      <div>
        <p className={`font-semibold ${textStyle}`}>{step.label}</p>
        <p className="text-sm text-gray-400">Step {index + 1}</p>
      </div>
    </div>
  );
};
