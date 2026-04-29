import { getOrderStatusName, orderSteps } from "../../../utils/order";
import useOrderDetails from "../../../hooks/OrderDetails";
import { useMemo } from "react";

const getCurrentStepIndex = (status, steps) =>
  status === "cancelled" ? -1 : steps.findIndex((s) => s.key === status);

const OrderStatusProgress = () => {
  const { orderDetails } = useOrderDetails();

  const steps = useMemo(() => orderSteps, []);
  const currentStatus = orderDetails?.orderStatus || "placed";
  const currentStepIndex = getCurrentStepIndex(currentStatus, steps);
  const isCancelled = currentStatus === "cancelled";
  const isDelivered = currentStatus === "delivered";

  const progressPercent =
    currentStepIndex === -1 ? 0 : ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* HEADER */}
      <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-gray-900">Order Activity</p>
          <p className="text-sm text-gray-500">
            Current status: {getOrderStatusName(currentStatus)}
          </p>
        </div>

        <span
          className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold ${
            isCancelled
              ? "bg-red-50 text-red-600"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {isCancelled
            ? "Cancelled"
            : isDelivered
              ? "Delivered"
              : `${currentStepIndex + 1} / ${steps.length} Completed`}
        </span>
      </div>

      {/* BODY */}
      <div className="border-t border-gray-100 p-6">
        {isCancelled ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="font-semibold text-red-700">Order Cancelled</p>
            <p className="text-sm text-red-600 mt-1">
              This order will not proceed further.
            </p>
          </div>
        ) : isDelivered ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="font-semibold text-emerald-700">Order Delivered</p>
            <p className="text-sm text-emerald-600 mt-1">
              This order has been delivered.
            </p>
          </div>
        ) : (
          <>
            {/* PROGRESS BAR */}
            <div className="hidden md:block mb-8">
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block relative">
              {/* FULL LINE (background) */}
              <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full" />

              {/* ACTIVE LINE */}
              <div
                className="absolute top-5 left-0 h-1 bg-emerald-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
                }}
              />

              {/* STEPS */}
              <div className="relative grid grid-cols-5">
                {steps.map((step, index) => {
                  const state =
                    index < currentStepIndex
                      ? "completed"
                      : index === currentStepIndex
                        ? "current"
                        : "upcoming";

                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <StepItem
                        step={step}
                        index={index}
                        state={state}
                        variant="desktop"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MOBILE */}
            <div className="space-y-5 md:hidden">
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

/* ================= STEP ITEM ================= */

const StepItem = ({
  step,
  index,
  state,
  isLast,
  currentStepIndex,
  variant,
}) => {
  const isCompleted = state === "completed";
  const isCurrent = state === "current";

  const baseCircle =
    "flex items-center justify-center rounded-full border-2 transition-all duration-300";

  const circleStyle =
    state === "completed"
      ? "bg-emerald-500 border-emerald-500 text-white"
      : state === "current"
        ? "bg-white border-emerald-500 text-emerald-600 shadow-md scale-110"
        : "bg-white border-gray-300 text-gray-400";

  const textStyle = isCurrent
    ? "text-emerald-700 font-semibold"
    : isCompleted
      ? "text-gray-700"
      : "text-gray-400";

  // DESKTOP
  if (variant === "desktop") {
    return (
      <div className="relative flex flex-col items-center text-center">
        {/* CONNECTOR LINE */}
        {!isLast && (
          <div
            className={`absolute top-5 left-1/2 h-1 w-full translate-x-1/2 ${
              index < currentStepIndex ? "bg-emerald-500" : "bg-gray-200"
            }`}
          />
        )}

        {/* CIRCLE */}
        <div
          className={`h-11 w-11 flex items-center justify-center rounded-full border-2 z-10 transition-all ${circleStyle}`}
        >
          {state === "completed" ? "✓" : step.icon}
        </div>

        {/* LABEL */}
        <p className={`mt-3 text-sm ${textStyle}`}>{step.label}</p>

        <p className="text-xs text-gray-400 mt-1">Step {index + 1}</p>
      </div>
    );
  }

  // MOBILE
  return (
    <div className="flex items-start gap-4">
      <div className={`${baseCircle} h-10 w-10 ${circleStyle}`}>
        {step.icon}
      </div>

      <div>
        <p className={`text-sm ${textStyle}`}>{step.label}</p>
        <p className="text-xs text-gray-400">Step {index + 1}</p>
      </div>
    </div>
  );
};
