import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getMyShop, uploadVendorShop } from "../../api/vendorApi";
import cityName from "../../data/cityName";
import categories from "../../data/categories";
import ShopStatusView from "../../components/common/vendor/ShopStatusView";
import ShopRegistrationForm from "../../components/common/vendor/ShopRegistrationForm";
import { useAuth } from "../../context/AuthContext";

const Shop = () => {
  const { auth } = useAuth();

  const vendor = auth?.vendor;
  const vendorId = vendor?._id;

  const [form, setForm] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    category: [],
    address: "",
    city: null,
    pincode: "",
    image: null,
  });

  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const cityOptions = useMemo(
    () => cityName?.map((c) => ({ value: c, label: c })) || [],
    [],
  );

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      email: "",
      phone: "",
      category: [],
      address: "",
      city: null,
      pincode: "",
      image: null,
    });
  };

  const fetchMyShop = async () => {
    try {
      setPageLoading(true);

      if (!vendorId) {
        toast.error("Vendor not found!");
        return;
      }

      const res = await getMyShop(vendorId);
      setShopData(res?.data?.shop || null);
    } catch (err) {
      toast.error(err?.message || "Failed to load shop status");
      setShopData(null);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchMyShop();
  }, [vendorId]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleChange("image", file);
  };

  const validateForm = () => {
    const {
      name,
      description,
      email,
      phone,
      category,
      address,
      city,
      pincode,
      image,
    } = form;

    if (
      !name ||
      !description ||
      !email ||
      !phone ||
      !category?.length ||
      !address ||
      !city ||
      !pincode
    ) {
      toast.warning("Please fill all fields!");
      return false;
    }

    if (!image) {
      toast.warning("Please select image first!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append(
      "category",
      JSON.stringify(form.category.map((c) => c.value)),
    );
    formData.append("address", form.address);
    formData.append("city", form.city?.value || "");
    formData.append("pincode", form.pincode);
    formData.append("shopImage", form.image);

    try {
      setLoading(true);

      const data = await uploadVendorShop(formData);

      toast.success(data?.message || "Shop submitted!");

      if (data?.shop) {
        setShopData(data.shop);
      } else {
        await fetchMyShop();
      }

      resetForm();
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (shopData) {
    return (
      <>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Vendor Panel
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Vendor Shop
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage your shop and shop details.
              </p>
            </div>
          </div>
        </div>

        <ShopStatusView
          shopData={shopData}
          onResubmit={() => setShopData(null)}
        />
      </>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Vendor Panel
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Vendor Shop
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your shop and shop details.
            </p>
          </div>
        </div>
      </div>

      <ShopRegistrationForm
        form={form}
        loading={loading}
        onChange={handleChange}
        onImageChange={handleImage}
        onReset={resetForm}
        onSubmit={handleSubmit}
        cityOptions={cityOptions}
        categoryOptions={categories}
      />
    </>
  );
};

export default Shop;
