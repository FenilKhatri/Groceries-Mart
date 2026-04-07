import RefreshButton from "../../../common/RefreshButton";
import Description from "../../../ui/Description";
import H3 from "../../../ui/H3";

const DashboardHeader = ({ refreshing, setRefreshing, onRefresh }) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
          admin panel
        </p>
        <H3 children="Admin Dashboard" />
        <Description
          children="Fresh insights, store activity, and order overview in one place."
          className="text-gray-500"
        />
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
