const StatusCard = ({ icon, label, value, iconBg, className }) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div className={`rounded-2xl p-2.5 ${iconBg}`}>{icon}</div>
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default StatusCard;
