import React, { useEffect, useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { CgDetailsLess, CgDetailsMore } from "react-icons/cg";
import { MdBrandingWatermark, MdCategory } from "react-icons/md";
import { FaBarcode, FaImage, FaImages } from "react-icons/fa";
import { GiKitchenScale } from "react-icons/gi";
import { IoMdPricetags } from "react-icons/io";
import { TbNumbers } from "react-icons/tb";
import LazySelect from "../../common/LazySelect";
import { toast } from "react-toastify";
import { getShopCategories, updateProductDetails, vendorAddProduct } from "../../../api/vendorApi";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails } from "../../../api/vendorApi";

const selectStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: "transparent",
        border: "none",
        boxShadow: "none",
        minHeight: "40px",
        fontSize: "14px",
    }),
    valueContainer: (base) => ({
        ...base,
        padding: 0,
    }),
    placeholder: (base) => ({
        ...base,
        color: "#9CA3AF",
        marginLeft: 0,
    }),
    singleValue: (base) => ({
        ...base,
        color: "#111827",
        marginLeft: 0,
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({
        ...base,
        padding: 0,
        color: "#6B7280",
        ":hover": { color: "#111827" },
    }),
    menu: (base) => ({
        ...base,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        zIndex: 50,
    }),
    menuList: (base) => ({
        ...base,
        padding: 8,
    }),
    option: (base, state) => ({
        ...base,
        borderRadius: 12,
        padding: "10px 12px",
        fontSize: 14,
        backgroundColor: state.isSelected
            ? "#D1FAE5"
            : state.isFocused
                ? "#ECFDF5"
                : "white",
        color: "#111827",
        cursor: "pointer",
    }),
};

const SelectField = ({
    label,
    icon,
    required,
    wrap,
    iconBox,
    hint,
    containerClass = "sm:col-span-2",
    ...props
}) => {
    return (
        <div className={containerClass}>
            <label className="text-sm font-semibold text-gray-800">
                {label} {required ? "*" : null}
            </label>

            <div className={wrap}>
                <div className={iconBox}>{icon}</div>

                <div className="w-full">
                    <LazySelect
                        {...props}
                        styles={selectStyles}
                        classNamePrefix="rs"
                        isSearchable={props.isSearchable ?? true}
                    />
                </div>
            </div>

            {hint ? <p className="text-xs text-gray-400 mt-1">{hint}</p> : null}
        </div>
    );
};

const ProductForm = () => {

    const wrap =
        "flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition " +
        "focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-100 hover:border-gray-300";
    const iconBox =
        "grid place-items-center h-10 w-10 rounded-xl bg-gray-50 border border-gray-200 text-gray-700";
    const labelCls = "text-sm font-semibold text-gray-800";
    const fieldCls =
        "w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm";
    const hintCls = "text-xs text-gray-400 mt-1";

    const [name, setName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [productCode, setProductCode] = useState("");

    const [category, setCategory] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [loadingCats, setLoadingCats] = useState(false);

    const [price, setPrice] = useState("");
    const [unit, setUnit] = useState(null);
    const [stock, setStock] = useState("");

    const [images, setImages] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    const [loading, setLoading] = useState(false);
    const [fileResetKey, setFileResetKey] = useState(0);

    const { id, productId } = useParams();
    const isEditMode = Boolean(productId);
    const navigate = useNavigate();

    const unitOptions = [
        { value: "kg", label: "kg" },
        { value: "grams", label: "grams" },
        { value: "liter", label: "liter" },
        { value: "ml", label: "ml" },
        { value: "dozen", label: "dozen" },
        { value: "piece", label: "piece" },
        { value: "bundle", label: "bundle" },
        { value: "packets", label: "packets" },
        { value: "others", label: "others" },
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoadingCats(true);
                const res = await getShopCategories();

                const opts = (res?.data?.categories || []).map((c) => ({
                    value: c,
                    label: c,
                }));

                setCategoryOptions(opts);
            } catch (error) {
                toast.error(error?.message || "Failed to fetch categories!");
                setCategoryOptions([]);
            } finally {
                setLoadingCats(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!productId) return;

            try {
                setLoading(true);

                const res = await getProductDetails(id, productId);
                const product = res?.product;

                if (!product) {
                    toast.error("Product not found!");
                    return;
                }

                setName(product?.name || "");
                setShortDescription(product?.shortDescription || "");
                setLongDescription(product?.longDescription || "");
                setBrand(product?.brand || "");
                setProductCode(product?.productCode || "");
                setPrice(product?.price || "");
                setStock(product?.stock || "");

                setCategory(
                    product?.category
                        ? { value: product.category, label: product.category }
                        : null
                );

                setUnit(
                    product?.unit
                        ? { value: product.unit, label: product.unit }
                        : null
                );
            } catch (error) {
                toast.error(error?.message || "Failed to fetch product details!");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id, productId]);

    const handleForm = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (!name.trim()) return toast.error("Please enter product name!");
        if (!category?.value) return toast.error("Please select category!");
        if (!price || Number(price) <= 0)
            return toast.error("Please enter valid price!");
        if (!unit?.value) return toast.error("Please select unit!");
        if (stock === "" || Number(stock) < 0)
            return toast.error("Please enter valid stock!");

        if (!isEditMode) {
            if (!images || images.length === 0)
                return toast.error("Please select product images!");
            if (!thumbnail)
                return toast.error("Please select thumbnail!");
        }

        try {
            setLoading(true);

            let data;

            if (isEditMode) {
                const payload = {
                    name,
                    shortDescription,
                    longDescription,
                    brand,
                    productCode,
                    price,
                    stock,
                };

                data = await updateProductDetails(id, productId, payload);
            } else {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("shortDescription", shortDescription);
                formData.append("longDescription", longDescription);
                formData.append("brand", brand);
                formData.append("productCode", productCode);
                formData.append("category", category?.value || "");
                formData.append("price", price);
                formData.append("unit", unit?.value || "");
                formData.append("stock", stock);

                images.forEach((file) => formData.append("images", file));
                if (thumbnail) formData.append("thumbnail", thumbnail);

                data = await vendorAddProduct(formData);
            }

            toast.success(
                data?.message ||
                (isEditMode
                    ? "Product updated successfully!"
                    : "Product added successfully!")
            );

            if (isEditMode) {
                navigate(`/vendors/${id}/products`);
            } else {
                resetForm(true);
            }
        } catch (error) {
            toast.error(error?.message || "Failed!");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = (keepCategories = false) => {
        setName("");
        setShortDescription("");
        setLongDescription("");
        setBrand("");
        setProductCode("");
        setCategory(null);
        setPrice("");
        setUnit(null);
        setStock("");
        setImages(null);
        setThumbnail(null);

        setFileResetKey((prev) => prev + 1);

        if (!keepCategories) setCategoryOptions([]);
        toast.info("Form reset successfully!");
    };

    return (
        <>

            <div className="mx-auto max-w-4xl space-y-6 mt-5">
                {/* Header */}
                <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-7 shadow-2xl">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                        {isEditMode ? "Edit Product" : "Add Product"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {isEditMode
                            ? "Update your product details."
                            : "Add clean product details (name, category, price, unit, stock and images)."}
                    </p>
                    {
                        isEditMode && (
                            <p className="font-bold text-lg pt-3">Note: <span className="text-sm font-semibold text-gray-300 p-2 rounded-lg">You can only edit product's name, shortDescription, longDescription, price, stock, brand, and productCode.</span></p>
                        )
                    }
                </div>

                {/* Form Card */}
                <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-2xl">
                    <form className="space-y-8" onSubmit={handleForm}>
                        {/* BASIC PRODUCT DETAILS */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-lg font-extrabold text-gray-900">
                                    Basic Product Details
                                </p>
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
                                    Required*
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Product Name */}
                                <div className="sm:col-span-2">
                                    <label className={labelCls}>Product Name *</label>
                                    <div className={wrap}>
                                        <div className={iconBox}>
                                            <AiFillProduct size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Fresh Apples 1kg"
                                            className={fieldCls}
                                        />
                                    </div>
                                </div>

                                {/* Short Description */}
                                <div className="sm:col-span-2">
                                    <label className={labelCls}>
                                        Short Description{" "}
                                        <span className="font-normal text-gray-400">
                                            (1–2 lines)
                                        </span>
                                    </label>
                                    <div className={wrap}>
                                        <div className={iconBox}>
                                            <CgDetailsLess size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            value={shortDescription}
                                            onChange={(e) => setShortDescription(e.target.value)}
                                            placeholder="Crisp, juicy, farm-fresh."
                                            className={fieldCls}
                                        />
                                    </div>
                                </div>

                                {/* Detailed Description */}
                                <div className="sm:col-span-2">
                                    <label className={labelCls}>
                                        Detailed Description{" "}
                                        <span className="font-normal text-gray-400">
                                            (optional)
                                        </span>
                                    </label>
                                    <div className={wrap}>
                                        <div className={iconBox}>
                                            <CgDetailsMore size={18} />
                                        </div>
                                        <textarea
                                            rows={4}
                                            value={longDescription}
                                            onChange={(e) => setLongDescription(e.target.value)}
                                            placeholder="Add more info like taste, storage, usage..."
                                            className={`${fieldCls} resize-none`}
                                        />
                                    </div>
                                </div>

                                {/* Brand */}
                                <div>
                                    <label className={labelCls}>
                                        Brand{" "}
                                        <span className="font-normal text-gray-400">
                                            (optional)
                                        </span>
                                    </label>
                                    <div className={wrap}>
                                        <div className={iconBox}>
                                            <MdBrandingWatermark size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                            placeholder="e.g., FreshMart"
                                            className={fieldCls}
                                        />
                                    </div>
                                </div>

                                {/* SKU */}
                                <div>
                                    <label className={labelCls}>
                                        SKU / Product Code{" "}
                                        <span className="font-normal text-gray-400">
                                            (optional)
                                        </span>
                                    </label>
                                    <div className={wrap}>
                                        <div className={iconBox}>
                                            <FaBarcode size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            value={productCode}
                                            onChange={(e) => setProductCode(e.target.value)}
                                            placeholder="e.g., APPLE-1KG-001"
                                            className={fieldCls}
                                        />
                                    </div>
                                    <p className={hintCls}>
                                        If empty, you can generate it automatically in backend.
                                    </p>
                                </div>

                                {/* Category */}
                                <SelectField
                                    label="Product Category"
                                    required
                                    wrap={wrap}
                                    iconBox={iconBox}
                                    icon={<MdCategory size={18} />}
                                    options={categoryOptions}
                                    value={category}
                                    onChange={setCategory}
                                    isLoading={loadingCats}
                                    isDisabled={isEditMode}
                                    placeholder={
                                        loadingCats ? "Loading categories..." : "Select category"
                                    }
                                    hint={
                                        isEditMode
                                            ? "Category cannot be changed after product creation."
                                            : "Shows only categories selected during shop registration."
                                    }
                                />
                            </div>
                        </div>

                        {/* PRICING & INVENTORY */}
                        <div>
                            <p className="text-lg font-extrabold text-gray-900 mb-4">
                                Pricing & Inventory
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Price */}
                                <div>
                                    <label className={labelCls}>Original Price (₹) *</label>
                                    <div className={wrap}>
                                        <div className={iconBox}>
                                            <IoMdPricetags size={18} />
                                        </div>
                                        <input
                                            type="number"
                                            min="0"
                                            step="1"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            placeholder="e.g., 150"
                                            className={fieldCls}
                                        />
                                    </div>
                                </div>

                                {/* Unit */}
                                <SelectField
                                    containerClass="sm:col-span-1"
                                    label="Product Unit"
                                    required
                                    wrap={wrap}
                                    iconBox={iconBox}
                                    icon={<GiKitchenScale size={18} />}
                                    options={unitOptions}
                                    value={unit}
                                    onChange={setUnit}
                                    placeholder="Select unit"
                                    hint={
                                        isEditMode
                                            ? "Unit cannot be changed after product creation."
                                            : "Choose how you sell this item."
                                    }
                                    isSearchable={false}
                                    isDisabled={isEditMode}
                                />

                                {/* Stock */}
                                <div className="sm:col-span-2">
                                    <label className={labelCls}>Stock *</label>
                                    <div className={wrap}>
                                        <div className={iconBox}>
                                            <TbNumbers size={18} />
                                        </div>
                                        <input
                                            type="number"
                                            min="0"
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            placeholder="e.g., 60"
                                            className={fieldCls}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* IMAGES */}
                        <div>
                            <p className="text-lg font-extrabold text-gray-900 mb-4">
                                Product Images
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Images */}
                                <div className="sm:col-span-2">
                                    <label className={labelCls}>Product Images *</label>
                                    <div className={wrap}>
                                        <div className={iconBox}>
                                            <FaImages size={18} />
                                        </div>
                                        <input
                                            key={`images-${fileResetKey}`}
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            disabled={isEditMode}
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files || []);
                                                if (files.length > 6) toast.warning("Max 6 images allowed!");
                                                setImages(files.slice(0, 6));
                                            }}
                                            className="w-full text-sm text-gray-600 file:mr-4 file:rounded-xl file:border-0 file:bg-orange-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-orange-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                                        />
                                    </div>
                                    <p className={hintCls}>
                                        {isEditMode
                                            ? "Product images cannot be changed after creation."
                                            : "Upload 2–4 clear images for best look."}
                                    </p>
                                </div>

                                {/* Thumbnail */}
                                <div className="sm:col-span-2">
                                    <label className={labelCls}>Thumbnail *</label>
                                    <div className={wrap}>
                                        <div className={iconBox}>
                                            <FaImage size={18} />
                                        </div>
                                        <input
                                            key={`thumb-${fileResetKey}`}
                                            type="file"
                                            disabled={isEditMode}
                                            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                                            className="w-full text-sm text-gray-600 file:mr-4 file:rounded-xl file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full sm:flex-1 rounded-2xl px-5 py-3 font-semibold text-white transition-all shadow-lg shadow-orange-100
                                    ${loading
                                        ? "bg-orange-400 cursor-not-allowed opacity-70"
                                        : "bg-orange-600 hover:bg-orange-700 cursor-pointer"
                                    }`}
                            >
                                {loading
                                    ? isEditMode
                                        ? "Updating product..."
                                        : "Adding product..."
                                    : isEditMode
                                        ? "Update Product"
                                        : "Add Product"}
                            </button>

                            {
                                !isEditMode && (
                                    <button
                                        type="button"
                                        onClick={() => resetForm(false)}
                                        className="w-full sm:w-auto rounded-2xl px-5 py-3 font-semibold text-gray-800 bg-white border border-gray-200 hover:bg-gray-100 cursor-pointer transition-all"
                                    >
                                        Reset
                                    </button>
                                )
                            }

                            <button
                                type="button"
                                className="w-full sm:w-auto rounded-2xl px-5 py-3 font-semibold text-gray-800 bg-red-200/40 border border-red-200 hover:bg-red-200 cursor-pointer transition-all"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default ProductForm