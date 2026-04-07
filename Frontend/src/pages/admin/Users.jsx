import { useEffect, useMemo } from "react";
import { useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { toast } from "react-toastify";
import { getUsers, deleteUser } from "../../api/adminApi";
import {
  IoMdArrowRoundDown,
  IoMdArrowRoundUp,
  IoMdSearch,
} from "react-icons/io";
import SearchBar from "../../components/common/SearchBar";
import RefreshButton from "../../components/common/RefreshButton";
import Description from "../../components/ui/Description";
import H3 from "../../components/ui/H3";
import TotalCounts from "../../components/sections/admin/TotalCounts";
import useDebounce from "../../utils/useDebounce";
import TableTitle from "../../components/sections/about/TableTitle";
import AdminTable from "../../components/sections/admin/Table";
import { userColumns } from "../../data/adminTable";

const AdminUsers = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState(null);

  const [query, setQuery] = useState("");

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

  const debouncingQuery = useDebounce(query, 500);
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

      return direction === "asc"
        ? String(aValue).localeCompare(bValue)
        : String(bValue).localeCompare(aValue);
    });
    setUsers(sorted);
    setSorted({ key, direction });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
            admin panel
          </p>
          <H3 children="Users Management" />
          <Description
            children="Monitor users and delete users."
            className="text-gray-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <TotalCounts children="Users" length={users?.length} />
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
          <TableTitle
            Title="User Directory"
            Description="Below is the list of all users."
          />
          {/* Refresh button */}
          <RefreshButton
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            onRefresh={handleData}
          />
        </div>

        {/* Table */}
        <AdminTable
          columns={userColumns}
          data={filteredUsers}
          loading={loading}
          onSort={handleSorted}
          emptyMessage="No users found"
          renderRow={(user, index) => (
            <tr
              key={user?._id || index}
              className="hover:bg-emerald-50/60 transition"
            >
              <td className="px-5 py-4">{index + 1}</td>
              <td className="px-5 py-4">
                <span className="font-mono text-xs bg-gray-50 border px-2 py-1 rounded-lg">
                  {user?._id}
                </span>
              </td>
              <td className="px-5 py-4">
                <p className="font-semibold text-gray-900">
                  {user?.name || "-"}
                </p>
              </td>
              <td className="px-5 py-4">{user?.email || "user@gmail.com"}</td>
              <td className="px-5 py-4">{user?.phone || "9876543210"}</td>
              <td className="px-5 py-4">
                <button
                  className="rounded-xl border border-red-300 bg-red-100 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-red-200 transition cursor-pointer"
                  onClick={() => handleDeleteUser(user?._id)}
                  aria-label="Delete"
                  title="Delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
          children="users"
          length={users?.length}
        />
      </div>
    </div>
  );
};

export default AdminUsers;
