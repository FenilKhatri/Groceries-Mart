const TotalCounts = ({ children, length }) => {
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-xs text-gray-500">Total {children}</p>
        <p className="mt-1 text-xl font-bold text-gray-900 text-center">
          {length}
        </p>
      </div>
    </>
  );
};

export default TotalCounts;
