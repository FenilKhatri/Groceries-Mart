import { PiCurrencyInrBold } from "react-icons/pi";
import useOrderDetails from "../../../hooks/OrderDetails";
import Description from "../ui/Description";

const OrderCard = () => {
  const { orderDetails } = useOrderDetails();

  const items = orderDetails?.items || [];

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-md font-bold uppercase tracking-widest text-black">
              Order Items
            </p>

            <Description className="text-gray-500">
              {items.length} {items.length === 1 ? "item" : "items"} in this
              order
            </Description>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300">
        {items.length === 0 ? (
          <div className="p-6">
            <p className="text-sm font-medium text-gray-500">No items found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item, index) => {
              const product = item?.product;
              const quantity = item?.quantity || 0;
              const unitPrice = item?.price ?? product?.price ?? 0;
              const total = quantity * unitPrice;

              return (
                <div
                  key={item?._id || product?._id || index}
                  className="p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                        <img
                          src={product?.thumbnail?.url || "/placeholder.png"}
                          alt={product?.name || "Product"}
                          loading="lazy"
                          decoding="async"
                          width="full"
                          height="full"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 space-y-2">
                        <h3 className="line-clamp-2 text-base font-semibold text-gray-800">
                          {product?.name || "Unnamed Product"}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                          <span className="rounded-full bg-gray-100 px-3 py-1 font-medium">
                            Qty: {quantity}
                          </span>

                          <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                            {product?.category || "General"}
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                            {product?.unit || "1 pc"}
                          </span>
                        </div>

                        {product?.shortDescription ? (
                          <p className="line-clamp-2 text-sm text-gray-500">
                            {product.shortDescription}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 sm:min-w-65">
                      <div className="rounded-xl bg-slate-50 p-3 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Price
                        </p>
                        <p className="mt-1 flex items-center justify-center font-semibold text-gray-700">
                          <PiCurrencyInrBold />
                          {unitPrice}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Qty
                        </p>
                        <p className="mt-1 font-semibold text-gray-700">
                          {quantity}
                        </p>
                      </div>

                      <div className="rounded-xl bg-emerald-50 p-3 text-center">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                          Total
                        </p>
                        <p className="mt-1 flex items-center justify-center font-bold text-emerald-700">
                          <PiCurrencyInrBold />
                          {total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
