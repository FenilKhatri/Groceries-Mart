import { useEffect, useMemo } from "react";
import { useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { toast } from "react-toastify";
import { getUsers, deleteUser } from "../../api/adminApi";
import { IoMdArrowRoundDown, IoMdArrowRoundUp, IoMdSearch } from "react-icons/io";
import SearchBar from "../../components/reusable-component/SearchBar";
import RefreshButton from "../../components/reusable-component/RefreshButton";

const AdminUsers = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState(null);

  const [query, setQuery] = useState("");
  const [debouncingQuery, setDeboundingQuery] = useState("");

  const [sorted, setSorted] = useState({ key: "", direction: "" });

  const LINKS = "px-5 py-3 text-left font-semibold";

  const handleData = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.users);
    } catch (error) {
      return toast.error(error?.message || "Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (!confirmed) return;

      await deleteUser(userId);
      toast.success("User deleted!");
      handleData();
    } catch (error) {
      toast.error(error?.message || "Failed to delete!");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboundingQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredUsers = useMemo(() => {
    const search = debouncingQuery.toLowerCase().trim();

    return users?.filter((user) => {
      return (
        user?.name?.toLowerCase().includes(search) ||
        user?.email?.toLowerCase().includes(search)
      );
    });
  }, [users, debouncingQuery]);

  useEffect(() => {
    handleData();
  }, []);

  const handleSorted = (key, direction) => {
    const sorted = [...users].sort((a, b) => {
      const aValue = a[key] ?? "";
      const bValue = b[key] ?? "";
      
      return direction === "asc" ? String(aValue).localeCompare(bValue) : String(bValue).localeCompare(aValue);
    });
    setUsers(sorted);
    setSorted({ key, direction });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Admin Panel
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Users Management
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Monitor users and view user details.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs text-gray-500">Total Users</p>
          <p className="mt-1 text-xl font-bold text-gray-900 text-center">
            {users?.length}
          </p>
        </div>
      </div>

      {/* Search */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search for users..."
      />

      {/* Card */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
          <div className="left-part">
            <p className="text-sm font-semibold text-gray-900">
              Users Directory
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Below is the list of all users.
            </p>
          </div>
          {/* Refresh Button */}
          <RefreshButton
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            onRefresh={handleData}
          />
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-2xl font-semibold text-center py-12 animate-pulse">
            Loading Users...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className={LINKS}>Sr No.</th>
                  <th className={LINKS}>
                    <div className="flex items-center justify-between">
                      User ID
                      <div className="flex items-center justify-center gap-3">
                        <IoMdArrowRoundUp
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("_id", "asc")}
                        />
                        <IoMdArrowRoundDown
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("_id", "desc")}
                        />
                      </div>
                    </div>
                  </th>
                  <th className={LINKS}>
                    <div className="flex items-center justify-between">
                      User Name
                      <div className="flex items-center justify-center gap-3">
                        <IoMdArrowRoundUp
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("name", "asc")}
                        />
                        <IoMdArrowRoundDown
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("name", "desc")}
                        />
                      </div>
                    </div>
                  </th>
                  <th className={LINKS}>
                    <div className="flex items-center justify-between">
                      Phone
                      <div className="flex items-center justify-center gap-3">
                        <IoMdArrowRoundUp
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("email", "asc")}
                        />
                        <IoMdArrowRoundDown
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("email", "desc")}
                        />
                      </div>
                    </div>
                  </th>
                  <th className={LINKS}>
                    <div className="flex items-center justify-between">
                      Phone
                      <div className="flex items-center justify-center gap-3">
                        <IoMdArrowRoundUp
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("phone", "asc")}
                        />
                        <IoMdArrowRoundDown
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("phone", "desc")}
                        />
                      </div>
                    </div>
                  </th>
                  <th className={LINKS}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredUsers?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers?.map((user, index) => {
                    return (
                      <tr
                        key={user?._id || index}
                        className="hover:bg-emerald-50/60 transition"
                      >
                        <td className="px-5 py-4">{index + 1}</td>

                        {/* userId */}
                        <td className="px-5 py-4">
                          <span className="font-mono text-xs bg-gray-50 border px-2 py-1 rounded-lg">
                            {user?._id}
                          </span>
                        </td>

                        {/* user name */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {user?.name || "-"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          {user?.email || "user@gmail.com"}
                        </td>
                        <td className="px-5 py-4">
                          {user?.phone || "9876543210"}
                        </td>

                        <td className="px-5 py-4">
                          <button
                            className="rounded-xl border px-3 py-2 text-xs font-semibold bg-red-100 hover:bg-red-200 cursor-pointer"
                            onClick={() => handleDeleteUser(user?._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-100 bg-white px-5 py-4 text-xs text-gray-500">
          Showing {users?.length} user{users?.length !== 1 ? "s" : ""}.
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
