const ShopProductsSection = ({ products }) => {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 px-5 sm:px-6 py-4 bg-white">

                    {/* Left */}
                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            Shop Products
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Below is the list of products added by this shop vendor.
                        </p>
                    </div>
                    
                    {/* Right */}
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl">
                        <span className="text-xs text-gray-500 font-medium">
                            Total Products
                        </span>

                        <span className="text-lg font-bold text-emerald-600">
                            {products?.length || 0}
                        </span>
                    </div>

                </div>

                {products.length === 0 ? (
                    <div className="py-12 text-center text-gray-500 font-medium">
                        No products found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5 sm:p-6">
                        {products.map((product) => (
                            <div
                                key={product?._id}
                                className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
                            >
                                <img
                                    src={product?.thumbnail?.url}
                                    alt={product?.name}
                                    className="h-48 w-full object-cover"
                                />

                                <div className="p-4 space-y-2">
                                    <p className="text-lg font-bold text-gray-900">
                                        {product?.name || "Product"}
                                    </p>

                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {product?.shortDescription || "No description available."}
                                    </p>

                                    <div className="flex items-center justify-between pt-2">
                                        <p className="text-emerald-700 font-bold">
                                            ₹{product?.price || 0}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Stock: {product?.stock || 0}
                                        </p>
                                    </div>

                                    <div className="text-xs text-gray-500 pt-1">
                                        Category: {product?.category || "—"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopProductsSection;