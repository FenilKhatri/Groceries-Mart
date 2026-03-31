import { FaBox, FaUser } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import StatCard from "./StatCard";

const StatsGrid = ({
  totalRevenue = 0,
  totalOrders = 0,
  totalProducts = 0,
  totalUsers = 0,
  cardBase = "",
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={<HiOutlineCurrencyRupee size={24} />}
        badge="Revenue"
        title="Total Revenue"
        value={`₹${totalRevenue}`}
        description="Overall earnings from all completed orders."
        iconBg="bg-emerald-100 text-emerald-700"
        badgeBg="bg-emerald-50 text-emerald-700"
        cardBase={cardBase}
      />

      <StatCard
        icon={<FaBox size={22} />}
        badge="Orders"
        title="Total Orders"
        value={totalOrders}
        description="Orders placed across the grocery platform."
        iconBg="bg-lime-100 text-lime-700"
        badgeBg="bg-lime-50 text-lime-700"
        cardBase={cardBase}
      />

      <StatCard
        icon={<AiFillProduct size={22} />}
        badge="Inventory"
        title="Total Products"
        value={totalProducts}
        description="All listed grocery items currently in the catalog."
        iconBg="bg-orange-100 text-orange-700"
        badgeBg="bg-orange-50 text-orange-700"
        cardBase={cardBase}
      />

      <StatCard
        icon={<FaUser size={22} />}
        badge="Customers"
        title="Total Users"
        value={totalUsers}
        description="Registered customers using your store platform."
        iconBg="bg-sky-100 text-sky-700"
        badgeBg="bg-sky-50 text-sky-700"
        cardBase={cardBase}
      />
    </div>
  );
};

export default StatsGrid;
