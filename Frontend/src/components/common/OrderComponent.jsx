export const getOrderStatusName = (status) => {
  switch (status) {
    case "placed":
      return "Placed";
    case "confirmed":
      return "Confirmed";
    case "packed":
      return "Packed";
    case "out_for_delivery":
      return "Out for Delivery";
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return "Unknown";
  }
};

export const getOrderBadge = (status) => {
  switch (status) {
    case "placed":
      return "📦";
    case "confirmed":
      return "✅";
    case "packed":
      return "📦";
    case "out_for_delivery":
      return "🚚";
    case "delivered":
      return "🎉";
    case "cancelled":
      return "❌";
    default:
      return "•";
  }
};

export const getOrderStatusColor = (status) => {
  switch (status) {
    case "placed":
      return "bg-blue-50 text-blue-700 border border-blue-200";
    case "confirmed":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "packed":
      return "bg-purple-50 text-purple-700 border border-purple-200";
    case "out_for_delivery":
      return "bg-cyan-50 text-cyan-700 border border-cyan-200";
    case "delivered":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "cancelled":
      return "bg-red-50 text-red-700 border border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border border-gray-200";
  }
};
