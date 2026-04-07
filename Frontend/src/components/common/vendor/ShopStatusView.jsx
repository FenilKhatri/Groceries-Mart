import Description from "../../ui/Description";
import H3 from "../../ui/H3";

const ShopStatusView = ({ shopData, onResubmit }) => {
  const fallback =
    "https://t4.ftcdn.net/jpg/03/22/52/97/360_F_322529755_PtwWWld1VDk66wXltHdVC6eZiMI4Hu8W.jpg";

  const imgSrc = shopData?.image?.url || fallback;
  const status = (shopData?.status || "pending").toLowerCase();
  const statusLabel = status.toUpperCase();

  const statusStyles = {
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
    cancelled: "bg-gray-100 text-gray-700 border-gray-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <div className="min-h-screen w-full bg-white rounded-3xl shadow-2xl px-4">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-3xl border border-gray-200 bg-white/30 p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-orange-600">
                {status === "approved" ? "" : "SHOP REQUEST"}
              </p>
              <H3 children={shopData?.name} />
              <Description className="mt-1 text-sm text-gray-500">
                {status === "approved"
                  ? "Your shop is approved. You can't edit your shop. You can only view details."
                  : "Your request is under review. You can only view details and status."}
              </Description>
            </div>

            <div
              className={`text-xs font-semibold px-3 py-2 rounded-2xl border ${
                statusStyles[status] || statusStyles.pending
              }`}
            >
              {statusLabel}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailCard label="Email" value={shopData?.email} />
            <DetailCard label="Phone" value={shopData?.phone} />
            <DetailCard label="City" value={shopData?.city} />
            <DetailCard label="Pincode" value={shopData?.pincode} />
            <DetailCard
              label="Address"
              value={shopData?.address}
              className="md:col-span-2"
            />
            <DetailCard
              label="Description"
              value={shopData?.description}
              className="md:col-span-2"
            />

            <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-white p-3">
              <p className="text-xs text-gray-500 mb-2">Shop Image</p>
              <img
                src={imgSrc}
                loading="lazy"
                decoding="async"
                alt="shop"
                className="w-full h-full object-cover rounded-2xl border"
              />
            </div>
          </div>

          {status === "rejected" && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={onResubmit}
                className="rounded-2xl px-4 py-3 font-semibold bg-orange-600 text-white hover:bg-orange-700"
              >
                Submit again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ label, value, className = "" }) => (
  <div className={`rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 ${className}`}>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="mt-1 font-semibold text-gray-900">{value || "—"}</p>
  </div>
);

export default ShopStatusView;