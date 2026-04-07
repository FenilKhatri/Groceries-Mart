import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { allOrders } from "../../api/userApi";
import OrderList from "./OrderList";
import UserOrderSkeleton from "../../components/skeleton/UserOrderSkeleton";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOrders = async () => {
    setLoading(true);
    try {
      const res = await allOrders();
      setOrders(res.orders || []);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleOrders();
  }, []);

  return (
    <>
      {loading ? (
        <UserOrderSkeleton count={orders?.length || 3} />
      ) : (
        <OrderList orders={orders} emptyMessage="No orders found." />
      )}
    </>
  );
};

export default AllOrders;
