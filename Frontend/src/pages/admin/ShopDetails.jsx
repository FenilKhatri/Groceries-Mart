import { useMemo, useState } from "react";
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

import { useQuery } from "@tanstack/react-query";

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [actionLoading, setActionLoading] = useState("");

  //  SHOP DETAILS 
  const {
    data: shop = null,
    isLoading: shopLoading,
    refetch: refetchShop,
  } = useQuery({
    queryKey: ["shop", id],
    queryFn: () => getShopById(id),
    select: (res) => res?.shop || null,
    enabled: !!id,
    onError: (err) => {
      toast.error(err?.message || "Failed to fetch shop!");
    },
  });

  //  SHOP PRODUCTS 
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["shop-products", id],
    queryFn: () => shopProducts(id),
    select: (res) => res?.data || [],
    enabled: !!id,
    onError: (err) => {
      toast.error(err?.message || "Failed to fetch products!");
    },
  });

  //  ACTION HANDLER 
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
                : "Shop deleted!"),
      );

      // invalidate / refresh cache
      if (type === "delete") {
        navigate(-1);
        return;
      }

      await refetchShop();
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setActionLoading("");
    }
  };

  //  LOADING STATE 
  if (shopLoading) {
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

  //  NOT FOUND 
  if (!shop) {
    return (
      <div className="p-6 text-center text-lg font-medium">Shop not found.</div>
    );
  }

  //  UI 
  return (
    <div className="space-y-8">
      <ShopDetailsCard
        shop={shop}
        navigate={navigate}
        onAction={handleAction}
        actionLoading={actionLoading}
      />

      <ShopProductsSection products={products} loading={productsLoading} />
    </div>
  );
};

export default ShopDetails;
