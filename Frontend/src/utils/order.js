import ORDER_STATUS_CONFIG from "../data/orderComponent"; 

export const getOrderStatusName = (status) =>
    ORDER_STATUS_CONFIG[status]?.label || "Unknown";

export const getOrderBadge = (status) =>
    ORDER_STATUS_CONFIG[status]?.icon || "•";

export const getOrderStatusColor = (status) =>
    ORDER_STATUS_CONFIG[status]?.color ||
    "bg-gray-50 text-gray-700 border border-gray-200";

export const orderSteps = Object.entries(ORDER_STATUS_CONFIG)
    .filter(([key]) => key !== "cancelled")
    .map(([key, value]) => ({
        key,
        label: value.label,
        icon: value.icon,
    }));