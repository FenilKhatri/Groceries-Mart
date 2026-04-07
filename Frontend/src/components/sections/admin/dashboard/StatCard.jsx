const StatCard = ({
  icon,
  badge,
  title,
  value,
  description,
  iconBg = "bg-emerald-100 text-emerald-700",
  badgeBg = "bg-emerald-50 text-emerald-700",
  cardBase,
}) => {
  return (
    <div className={`${cardBase} p-5`}>
      <div className="flex items-start justify-between">
        <div className={`rounded-2xl p-3 ${iconBg}`}>{icon}</div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeBg}`}
        >
          {badge}
        </span>
      </div>

      <p className="mt-5 text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
      <p className="mt-3 text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default StatCard;
