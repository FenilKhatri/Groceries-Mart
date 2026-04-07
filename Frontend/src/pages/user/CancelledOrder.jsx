import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { allOrders } from "../../api/userApi";
import OrderList from "./OrderList";
import UserOrderSkeleton from "../../components/skeleton/UserOrderSkeleton";

const ProcessingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await allOrders();
      const filteredOrders = (res.orders || []).filter((order) =>
        ["cancelled"].includes(order.orderStatus),
      );
      setOrders(filteredOrders);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {loading ? (
        <UserOrderSkeleton />
      ) : (
        <OrderList orders={orders} emptyMessage="No orders found." />
      )}
    </>
  );
};

export default ProcessingOrders;
