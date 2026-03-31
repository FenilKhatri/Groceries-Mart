import { IoLockClosedOutline } from "react-icons/io5";
import { PiCurrencyInrBold } from "react-icons/pi";

const OrderSummary = ({ items, handlePayment }) => {
  return (
    <div className="sticky top-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4 md:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">
            Order Summary
          </h3>
          <span className="rounded-full bg-slate-200/80 px-3 py-1 text-xs font-semibold text-slate-600">
            {items?.items?.length || 0} Items
          </span>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Items
          </p>

          <div className="mt-3 space-y-3">
            {items?.items?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-300 p-3 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14">
                    <img
                      src={item?.product?.thumbnail?.url}
                      alt={item?.product?.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full rounded-md object-cover"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center gap-2">
                    <p className="text-sm font-medium">
                      {item?.product?.name}
                    </p>
                    <p className="text-sm font-medium text-slate-500">
                      Qty: {item?.quantity}
                    </p>
                  </div>
                </div>

                <p className="flex items-center font-semibold text-slate-700">
                  <PiCurrencyInrBold />
                  {(item?.product?.price || 0) * (item?.quantity || 0)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-200 pt-5">
          <div className="flex items-center justify-between">
            <p className="font-medium text-slate-500">Subtotal</p>
            <p className="flex items-center font-semibold text-slate-800">
              <PiCurrencyInrBold />
              {items?.totalAmount || 0}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-medium text-slate-500">Delivery Charges</p>
            <p className="font-semibold text-emerald-600">Free</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-medium text-slate-500">Discount</p>
            <p className="font-semibold text-slate-800">-</p>
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4">
            <p className="text-lg font-bold text-slate-800">Total</p>
            <p className="flex items-center text-xl font-bold text-slate-800">
              <PiCurrencyInrBold />
              {items?.totalAmount || 0}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <button
            type="button"
            onClick={handlePayment}
            className="w-full cursor-pointer rounded-xl bg-emerald-600 px-4 py-3.5 text-base font-semibold text-white shadow-md transition duration-300 hover:bg-emerald-700"
          >
            Place Order
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <IoLockClosedOutline className="text-emerald-600" />
            Secure SSL encrypted checkout
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;