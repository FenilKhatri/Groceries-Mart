import { useEffect, useState } from "react";
import { getOrderDetails } from "../api/adminApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const useOrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleOrderDetails = async (id) => {
    setLoading(true);
    try {
      const res = await getOrderDetails(id);
      setOrderDetails(res?.data?.order);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleOrderDetails(id);
  }, [id]);

  return { orderDetails, setOrderDetails, loading, handleOrderDetails, id };
};

export default useOrderDetails;