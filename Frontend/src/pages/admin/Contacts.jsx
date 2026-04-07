import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getContacts } from "../../api/adminApi";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import RefreshButton from "../../components/common/RefreshButton";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import Description from "../../components/ui/Description";
import H3 from "../../components/ui/H3";
import TotalCounts from "../../components/sections/admin/TotalCounts";
import useDebounce from "../../utils/useDebounce";
import TableTitle from "../../components/sections/about/TableTitle";
import AdminTable from "../../components/sections/admin/Table";
import { contactColumns } from "../../data/adminTable";
import Button from "../../components/ui/Button";

const AdminContacts = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [contacts, setContacts] = useState([]);

  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const [sorted, setSorted] = useState({ key: "", direction: "" });

  const LINKS = "px-5 py-3 text-left font-semibold";

  const handleData = async () => {
    try {
      setLoading(true);
      const res = await getContacts();
      setContacts(res?.data || []);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch!");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncingQuery = useDebounce(query, 500);
  const filteredContacts = useMemo(() => {
    const search = debouncingQuery.toLowerCase().trim();

    return contacts.filter((contact) => {
      return (
        contact?.name?.toLowerCase().includes(search) ||
        contact?.email?.toLowerCase().includes(search) ||
        contact?.subject?.toLowerCase().includes(search) ||
        contact?.message?.toLowerCase().includes(search)
      );
    });
  }, [contacts, debouncingQuery]);

  useEffect(() => {
    handleData();
  }, []);

  const handleSorted = (key, direction) => {
    const sorted = [...contacts].sort((a, b) => {
      const aValue = a[key] ?? "";
      const bValue = b[key] ?? "";

      return direction === "asc"
        ? String(aValue).localeCompare(bValue)
        : String(bValue).localeCompare(aValue);
    });
    setContacts(sorted);
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
          <H3 children="Contacts Management" />
          <Description
            children="Manage contact informations."
            className="text-gray-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <TotalCounts children="Contacts" length={contacts?.length} />
        </div>
      </div>

      {/* Search */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search for contacts..."
      />

      {/* Card */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
          <TableTitle
            Title="Contacts Directory"
            Description="Below is the list of all contacts."
          />
          {/* Refresh button */}
          <RefreshButton
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            onRefresh={handleData}
          />
        </div>

        <AdminTable
          columns={contactColumns}
          data={filteredContacts}
          loading={loading}
          onSort={handleSorted}
          emptyMessage="No contacts found"
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
          children="contact"
          length={contacts?.length}
        />
      </div>
    </div>
  );
};

export default AdminContacts;
