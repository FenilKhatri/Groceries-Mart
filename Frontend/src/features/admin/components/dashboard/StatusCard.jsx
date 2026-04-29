const StatusCard = ({
  icon,
  label,
  value,
  iconBg = "bg-emerald-100 text-emerald-700",
  className = "bg-white border border-gray-100",
}) => {
  return (
    <div
      className={`${className} group relative overflow-hidden bg-white border border-emerald-100 rounded-2xl p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      {/* subtle hover glow */}
      <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-emerald-100 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-40" />

      {/* header */}
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} shadow-sm transition-transform duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </span>
      </div>

      {/* value */}
      <p className="mt-4 text-2xl font-extrabold tracking-tight text-gray-900">
        {value}
      </p>

      {/* bottom accent */}
      <div className="mt-4 h-0.5 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default StatusCard;
