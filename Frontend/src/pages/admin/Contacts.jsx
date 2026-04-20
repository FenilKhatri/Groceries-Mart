import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getContacts } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../components/common/SearchBar";
import RefreshButton from "../../components/common/RefreshButton";
import Description from "../../components/ui/Description";
import H3 from "../../components/ui/H3";
import TotalCounts from "../../components/sections/admin/TotalCounts";
import useDebounce from "../../utils/useDebounce";
import TableTitle from "../../components/sections/admin/TableTitle";
import AdminTable from "../../components/sections/admin/Table";
import { contactColumns } from "../../data/pages/adminTable";
import Button from "../../components/ui/Button";

import { useQuery } from "@tanstack/react-query";

const AdminContacts = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [sorted, setSorted] = useState({
    key: "",
    direction: "",
  });

  const {
    data: contacts = [],
    isLoading,
    refetch,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
    staleTime: 5 * 60 * 1000, // 5 min cache
    onError: (err) => {
      toast.error(err?.message || "Failed to fetch contacts");
    },
    select: (res) => res?.data || [],
  });

  const sortedContacts = useMemo(() => {
    if (!sorted.key) return contacts;

    return [...contacts].sort((a, b) => {
      const aValue = a[sorted.key] ?? "";
      const bValue = b[sorted.key] ?? "";

      return sorted.direction === "asc"
        ? String(aValue).localeCompare(bValue)
        : String(bValue).localeCompare(aValue);
    });
  }, [contacts, sorted]);

  // Search filter
  const filteredContacts = useMemo(() => {
    const search = debouncedQuery.toLowerCase().trim();

    return sortedContacts.filter((contact) => {
      return (
        contact?.name?.toLowerCase().includes(search) ||
        contact?.email?.toLowerCase().includes(search) ||
        contact?.subject?.toLowerCase().includes(search) ||
        contact?.message?.toLowerCase().includes(search)
      );
    });
  }, [sortedContacts, debouncedQuery]);

  // Sorting handler
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
          <H3 children="Contacts Management" />
          <Description
            children="Manage contact informations."
            className="text-gray-500"
          />
        </div>

        <TotalCounts children="Contacts" length={contacts?.length} />
      </div>

      {/* SEARCH */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search for contacts..."
      />

      {/* TABLE CARD */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
          <TableTitle
            Title="Contacts Directory"
            Description="Below is the list of all contacts."
          />

          {/* REFRESH (React Query refetch) */}
          <RefreshButton
            refreshing={isFetching}
            setRefreshing={() => {}}
            onRefresh={refetch}
            aria-label="Refresh"
            title="Refresh"
          />
        </div>

        {/* TABLE */}
        <AdminTable
          columns={contactColumns}
          data={filteredContacts}
          loading={isLoading}
          onSort={handleSorted}
          emptyMessage="No contacts found"
          children="contact"
          length={contacts?.length}
          renderRow={(contact, index) => (
            <tr
              key={contact?._id || index}
              className="hover:bg-emerald-50/60 transition"
            >
              <td className="px-5 py-4">{index + 1}</td>
              <td className="px-5 py-4">{contact?.name || "-"}</td>
              <td className="px-5 py-4">{contact?.email || "-"}</td>
              <td className="px-5 py-4">{contact?.subject || "-"}</td>
              <td className="px-5 py-4">{contact?.message || "-"}</td>
              <td className="px-5 py-4">
                <Button
                  variant="outline"
                  children="View Contact"
                  onClick={() => navigate(`/admin/contacts/${contact?._id}`)}
                />
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default AdminContacts;
