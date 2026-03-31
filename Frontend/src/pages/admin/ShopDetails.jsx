import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getShopById,
  approveShop,
  rejectShop,
  cancelShop,
  deleteShop,
  shopProducts,
} from "../../api/adminApi";
import ShopDetailsCard from "../../components/common/vendor/ShopDetailsCard";
import ShopProductsSection from "../../components/common/vendor/ShopProductsSection";

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  const fetchShopDetails = async () => {
    try {
      setLoading(true);

      const shopRes = await getShopById(id);
      setShop(shopRes?.shop || null);

      const productRes = await shopProducts(id);
      setProducts(productRes?.data || []);

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch shop details!"
      );

      setShop(null);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShopDetails();
  }, [id]);

  const handleAction = async (type) => {
    if (!shop || actionLoading) return;

    try {
      setActionLoading(type);

      const apiMap = {
        approve: approveShop,
        reject: rejectShop,
        cancel: cancelShop,
        delete: deleteShop,
      };

      const res = await apiMap[type](id);

      toast.success(
        res?.message ||
        (type === "approve"
          ? "Shop approved!"
          : type === "reject"
            ? "Shop rejected!"
            : type === "cancel"
              ? "Shop cancelled!"
              : "Shop deleted!")
      );

      if (type === "delete") {
        navigate(-1);
        return;
      }

      setShop((prev) =>
        prev
          ? {
            ...prev,
            status:
              type === "approve"
                ? "approved"
                : type === "reject"
                  ? "rejected"
                  : "cancelled",
          }
          : prev
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!"
      );
    } finally {
      setActionLoading("");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-4xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center font-semibold text-2xl animate-pulse">
            Loading Shop Details...
          </p>
        </div>
      </div>
    );
  }

  if (!shop) {
    return <div className="p-6 text-center text-lg font-medium">Shop not found.</div>;
  }

  return (
    <div className="space-y-8">
      <ShopDetailsCard
        shop={shop}
        navigate={navigate}
        onAction={handleAction}
        actionLoading={actionLoading}
      />

      <ShopProductsSection products={products} />
    </div>
  );
};

export default ShopDetails;