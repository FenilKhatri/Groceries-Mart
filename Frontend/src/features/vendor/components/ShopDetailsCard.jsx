import { FaLongArrowAltLeft } from "react-icons/fa";
import { SHOP_STATUS } from "../../../utils/constants";

const ShopDetailsCard = ({ shop, navigate, onAction, actionLoading }) => {
  const fallBackImg =
    "https://t4.ftcdn.net/jpg/03/22/52/97/360_F_322529755_PtwWWld1VDk66wXltHdVC6eZiMI4Hu8W.jpg";

  const imgUrl = shop?.image?.url || fallBackImg;
  const status = shop?.status || SHOP_STATUS.PENDING;
  const statusLabel = status.toUpperCase();

  const canApprove = [SHOP_STATUS.PENDING, SHOP_STATUS.REJECTED, SHOP_STATUS.CANCELLED].includes(status);
  const canReject = [SHOP_STATUS.PENDING].includes(status);
  const canCancel = status === SHOP_STATUS.PENDING;
  const canDelete = [SHOP_STATUS.PENDING, SHOP_STATUS.REJECTED, SHOP_STATUS.APPROVED, SHOP_STATUS.CANCELLED].includes(status);

  const busy = !!actionLoading;

  const badgeClass =
    status === SHOP_STATUS.APPROVED
      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
      : status === SHOP_STATUS.REJECTED
        ? "bg-red-100 text-red-700 border border-red-200"
        : status === SHOP_STATUS.CANCELLED
          ? "bg-gray-100 text-gray-700 border border-gray-200"
          : "bg-amber-50 text-amber-700 border border-amber-200";

  return (
    <div className="bg-gray-50 rounded-4xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Admin Panel
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Shop Details
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Review shop information and take action on the request.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div
              className={`text-xs font-semibold px-2 py-1 rounded-lg ${badgeClass}`}
            >
              {statusLabel}
            </div>

            <button
              aria-label="Back"
              title="Back"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer"
            >
              <FaLongArrowAltLeft />
              Back
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {shop?.name || "Shop"}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Status: <span className="font-semibold">{shop?.status}</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-end border-t border-gray-100 bg-gray-50 px-5 sm:px-6 py-4">
              <button
                onClick={() => onAction("approve")}
                aria-label="Approve"
                title="Approve"
                disabled={!canApprove || busy}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                  !canApprove
                    ? "border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                    : actionLoading === "approve"
                      ? "border-emerald-200 bg-emerald-100 text-emerald-700 cursor-not-allowed"
                      : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                {actionLoading === "approve" ? "Approving..." : "Approve"}
              </button>

              <button
                onClick={() => onAction("reject")}
                disabled={!canReject || busy}
                aria-label="Reject"
                title="Reject"
                className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                  !canReject
                    ? "border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                    : actionLoading === "reject"
                      ? "border-red-200 bg-red-100 text-red-700 cursor-not-allowed"
                      : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                }`}
              >
                {actionLoading === "reject" ? "Rejecting..." : "Reject"}
              </button>

              <button
                onClick={() => onAction("cancel")}
                disabled={!canCancel || busy}
                aria-label="Cancel"
                title="Cancel"
                className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                  !canCancel
                    ? "border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                    : actionLoading === "cancel"
                      ? "border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {actionLoading === "cancel"
                  ? "Cancelling..."
                  : "Cancel Request"}
              </button>

              <button
                onClick={() => onAction("delete")}
                disabled={!canDelete || busy}
                aria-label="Delete"
                title="Delete"
                className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                  !canDelete
                    ? "border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                    : actionLoading === "delete"
                      ? "border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
                }`}
              >
                {actionLoading === "delete" ? "Deleting..." : "Delete Shop"}
              </button>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-6 space-y-6">
            <img
              loading="lazy"
              decoding="async"
              src={imgUrl}
              alt="shop"
              width="full"
              height="full"
              className="w-full h-auto object-cover rounded-2xl border border-gray-200"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                <p className="text-xs text-gray-500">Shop Name</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {shop?.name || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                <p className="text-xs text-gray-500">Category</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {Array.isArray(shop?.category)
                    ? shop.category.join(", ")
                    : shop?.category || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {shop?.phone || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                <p className="text-xs text-gray-500">City</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {shop?.city || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 md:col-span-2">
                <p className="text-xs text-gray-500">Address</p>
                <p className="mt-1 font-semibold text-gray-900 wrap-break-word">
                  {shop?.address || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                <p className="text-xs text-gray-500">Vendor ID</p>
                <p className="mt-1 font-semibold text-gray-900 font-mono break-all">
                  {shop?.vendor?.vendorId || shop?.vendor?._id || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                <p className="text-xs text-gray-500">Shop ID</p>
                <p className="mt-1 font-semibold text-gray-900 font-mono break-all">
                  {shop?._id || "—"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
              <p className="text-xs text-gray-500">Description</p>
              <p className="mt-1 text-gray-800">{shop?.description || "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsCard;