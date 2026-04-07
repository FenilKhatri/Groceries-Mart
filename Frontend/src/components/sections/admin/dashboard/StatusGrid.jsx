import { FaBox, FaShop } from "react-icons/fa6";
import { HiMiniUserCircle } from "react-icons/hi2";
import { HiOutlineCube } from "react-icons/hi";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import StatusCard from "./StatusCard";

const StatusGrid = ({
  vendors = 0,
  shops = 0,
  products = 0,
  pendingOrders = 0,
  outForDeliveryOrders = 0,
  deliveredOrders = 0,
  cancelledOrders = 0,
  smallStatusCard = "",
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-7">
      <StatusCard
        icon={<HiMiniUserCircle size={20} />}
        label="Vendors"
        value={vendors}
        iconBg="bg-fuchsia-100 text-fuchsia-700"
        className={smallStatusCard}
      />

      <StatusCard
        icon={<FaShop size={18} />}
        label="Shops"
        value={shops}
        iconBg="bg-amber-100 text-amber-700"
        className={smallStatusCard}
      />

      <StatusCard
        icon={<HiOutlineCube size={20} />}
        label="Products"
        value={products}
        iconBg="bg-orange-100 text-orange-700"
        className={smallStatusCard}
      />

      <StatusCard
        icon={<MdOutlinePendingActions size={20} />}
        label="Pending"
        value={pendingOrders}
        iconBg="bg-yellow-100 text-yellow-700"
        className={smallStatusCard}
      />

      <StatusCard
        icon={<BsTruck size={18} />}
        label="Delivery"
        value={outForDeliveryOrders}
        iconBg="bg-blue-100 text-blue-700"
        className={smallStatusCard}
      />

      <StatusCard
        icon={<FiTrendingUp size={18} />}
        label="Delivered"
        value={deliveredOrders}
        iconBg="bg-emerald-100 text-emerald-700"
        className={smallStatusCard}
      />

      <StatusCard
        icon={<FaBox size={16} />}
        label="Cancelled"
        value={cancelledOrders}
        iconBg="bg-red-100 text-red-700"
        className={smallStatusCard}
      />
    </div>
  );
};

export default StatusGrid;
