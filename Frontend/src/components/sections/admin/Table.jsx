import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";

const AdminTable = ({
  columns = [],
  data = [],
  loading = false,
  onSort,
  emptyMessage = "No data found",
  renderRow,
  children,
  length
}) => {
  const LINKS = "px-5 py-3 text-left font-semibold";

  return (
    <>
      {loading ? (
        <p className="text-2xl font-semibold text-center py-12 animate-pulse">
          Loading...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className={LINKS}>
                    {col.sortable ? (
                      <div className="flex items-center justify-between">
                        {col.label}
                        <div className="flex items-center gap-2">
                          <IoMdArrowRoundUp
                            className="cursor-pointer hover:text-emerald-500 transition"
                            onClick={() => onSort(col.key, "asc")}
                          />
                          <IoMdArrowRoundDown
                            className="cursor-pointer hover:text-emerald-500 transition"
                            onClick={() => onSort(col.key, "desc")}
                          />
                        </div>
                      </div>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-12 text-center text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((item, index) => renderRow(item, index))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="border-t border-gray-100 bg-white px-5 sm:px-6 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {length}
            </span>{" "}
            {children}{length === 1 ? "" : "s"}.
          </p>

          <div className="text-xs text-gray-500">
            Tip: Use desktop view for the best table experience.
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTable;
