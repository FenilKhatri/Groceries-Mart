import { HiOutlineRefresh } from "react-icons/hi";
import { toast } from "react-toastify";

const RefreshButton = ({
  refreshing,
  setRefreshing,
  onRefresh,
  loadingText = "Refreshing...",
  defaultText = "Refresh",
  successMessage = "Latest data updated!",
  delay = "1000",
}) => {
  const handleRefresh = () => {
    if (refreshing) return;

    try {
      setRefreshing(true);

      setTimeout(async () => {
        await onRefresh();
        toast.success(successMessage);
      }, delay);
    } catch (error) {
      toast.error(error?.message || "Failed to refresh!");
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, delay);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleRefresh}
        disabled={refreshing}
        className={`flex items-center gap-5 bg-white border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-200 shadow-3xl rounded-3xl px-4 py-3 w-fit transition-all ${
          refreshing
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer hover:text-emerald-900"
        }`}
      >
        <HiOutlineRefresh />
        {refreshing ? loadingText : defaultText}
      </button>
    </>
  );
};

export default RefreshButton;
