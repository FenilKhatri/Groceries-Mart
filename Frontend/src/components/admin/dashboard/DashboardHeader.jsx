import RefreshButton from "../../reusable-component/RefreshButton";

const DashboardHeader = ({ refreshing, setRefreshing, onRefresh }) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
          Green Leaf Grocers
        </p>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Fresh insights, store activity, and order overview in one place.
        </p>
      </div>

      <RefreshButton
        refreshing={refreshing}
        setRefreshing={setRefreshing}
        onRefresh={onRefresh}
      />
    </div>
  );
};

export default DashboardHeader;
