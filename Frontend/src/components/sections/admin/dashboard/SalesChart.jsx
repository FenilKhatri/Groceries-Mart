import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { HiOutlineChartBar } from "react-icons/hi";

const SalesChart = ({ monthlyData }) => {
  return (
    <div className="h-full min-h-90 rounded-[30px] border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-bold text-gray-900">Sales Analytics</p>
          <p className="mt-1 text-sm text-gray-500">
            Monthly order and revenue overview.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          <HiOutlineChartBar size={18} />
          Analytics
        </div>
      </div>

      <div className="mt-6 h-86 rounded-[26px] border-2 border-dashed border-emerald-200 bg-linear-to-br from-emerald-50 to-lime-50/60 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#10b981"
              strokeWidth={3}
              name="Orders"
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#f59e0b"
              strokeWidth={3}
              name="Revenue"
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
