import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { deleteUser, getUsers } from "../../features/admin/api";

import Description from "../../shared/components/ui/Description";
import H3 from "../../shared/components/ui/H3";

import SearchBar from "../../shared/components/common/SearchBar";
import RefreshButton from "../../shared/components/common/RefreshButton";
import TotalCounts from "../../features/admin/components/TotalCounts";
import useDebounce from "../../hooks/useDebounce";
import TableTitle from "../../features/admin/components/TableTitle";
import AdminTable from "../../features/admin/components/Table";

import { useQuery } from "@tanstack/react-query";
import { userColumns } from "../../data/pages/adminTableData";

const AdminUsers = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [sorted, setSorted] = useState({
    key: "",
    direction: "",
  });

  const {
    data: users = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    select: (res) => res?.users || [],
    staleTime: 5 * 60 * 1000,
    onError: (err) => {
      toast.error(err?.message || "Failed to fetch users!");
    },
  });

  //  DELETE USER
  const handleDeleteUser = async (userId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (!confirmed) return;

      await deleteUser(userId);
      toast.success("User deleted!");
      refetch();
    } catch (error) {
      toast.error(error?.message || "Failed to delete!");
    }
  };

  //  SORTING
  const sortedUsers = useMemo(() => {
    if (!sorted.key) return users;

    return [...users].sort((a, b) => {
      const aValue = a[sorted.key] ?? "";
      const bValue = b[sorted.key] ?? "";

      return sorted.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [users, sorted]);

  //  FILTER
  const filteredUsers = useMemo(() => {
    const search = debouncedQuery.toLowerCase().trim();

    return sortedUsers.filter((user) => {
      return (
        user?.name?.toLowerCase().includes(search) ||
        user?.email?.toLowerCase().includes(search)
      );
    });
  }, [sortedUsers, debouncedQuery]);

  //  SORT HANDLER
  const handleSorted = (key, direction) => {
    setSorted({ key, direction });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
            admin panel
          </p>
          <H3>Users Management</H3>
          <Description className="text-gray-500">
            Monitor users and delete users.
          </Description>
        </div>

        <TotalCounts length={users?.length}>Users</TotalCounts>
      </div>

      {/* SEARCH */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search for users..."
      />

      {/* TABLE */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
          <TableTitle
            Title="User Directory"
            Description="Below is the list of all users."
          />

          <RefreshButton
            refreshing={isFetching}
            setRefreshing={() => {}}
            onRefresh={refetch}
          />
        </div>

        {/* TABLE */}
        <AdminTable
          columns={userColumns}
          data={filteredUsers}
          loading={isLoading}
          onSort={handleSorted}
          emptyMessage="No users found"
          children="users"
          length={users?.length}
          renderRow={(user, index) => (
            <tr
              key={user?._id || index}
              className="hover:bg-emerald-50/60 transition"
            >
              <td className="px-5 py-4">{index + 1}</td>

              <td className="px-5 py-4 font-mono text-xs">{user?._id}</td>

              <td className="px-5 py-4 font-semibold text-gray-900">
                {user?.name || "-"}
              </td>

              <td className="px-5 py-4">{user?.email || "user@gmail.com"}</td>

              <td className="px-5 py-4">{user?.phone || "9876543210"}</td>

              <td className="px-5 py-4">
                <button
                  className="rounded-xl border border-red-300 bg-red-100 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-red-200 transition cursor-pointer"
                  onClick={() => handleDeleteUser(user?._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default AdminUsers;
