import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BsTruck } from "react-icons/bs";

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

const renderInsideLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}) => {
  if (value === 0 || value == null) return null;

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={700}
    >
      {value}
    </text>
  );
};

const DeliveryStatusChart = ({ data = [] }) => {
  const safeData = data.filter((item) => Number(item?.value) > 0);
  const hasData = safeData.length > 0;

  return (
    <div className="rounded-[30px] border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-bold text-gray-900">
            Delivery Status Insights
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Distribution of current order delivery statuses.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          <BsTruck size={16} />
          Delivery
        </div>
      </div>

      <div className="mt-6 h-80 rounded-[26px] border-2 border-dashed border-emerald-200 bg-linear-to-br from-emerald-50 to-lime-50/60 p-4">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Pie
                data={safeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="42%"
                outerRadius={105}
                innerRadius={55}
                paddingAngle={3}
                labelLine={false}
                label={renderInsideLabel}
              >
                {safeData.map((entry, index) => (
                  <Cell
                    key={entry.name || index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="square"
                wrapperStyle={{ paddingTop: "14px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-gray-500">
            No delivery data available
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryStatusChart;
