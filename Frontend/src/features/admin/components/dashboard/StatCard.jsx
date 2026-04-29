const StatCard = ({
  icon,
  badge,
  title,
  value,
  description,
  iconBg = "bg-emerald-100 text-emerald-700",
  badgeBg = "bg-emerald-50 text-emerald-700",
  cardBase = "bg-white border border-gray-100",
}) => {
  return (
    <div
      className={`${cardBase} group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg border border-emerald-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >
      {/* subtle glow background */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-emerald-100 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-40" />

      {/* header */}
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} shadow-sm transition-transform duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${badgeBg}`}
        >
          {badge}
        </span>
      </div>

      {/* content */}
      <p className="mt-5 text-sm font-medium text-gray-500">{title}</p>

      <p className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900">
        {value}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-gray-500">
        {description}
      </p>

      {/* bottom accent line */}
      <div className="mt-5 h-0.5 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default StatCard;
