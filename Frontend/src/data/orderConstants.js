const ORDER_STATUS_CONFIG = {
  placed: {
    label: "Placed",
    icon: "🛒",
    color: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  confirmed: {
    label: "Confirmed",
    icon: "✅",
    color: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  packed: {
    label: "Packed",
    icon: "📦",
    color: "bg-purple-50 text-purple-700 border border-purple-200",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    icon: "🚚",
    color: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  },
  delivered: {
    label: "Delivered",
    icon: "🎉",
    color: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  cancelled: {
    label: "Cancelled",
    icon: "❌",
    color: "bg-red-50 text-red-700 border border-red-200",
  },
};

export default ORDER_STATUS_CONFIG;