import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getContacts } from "../../api/adminApi";
import { HiOutlineRefresh } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import SearchBar from "../../components/reusable-component/SearchBar";
import RefreshButton from "../../components/reusable-component/RefreshButton";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

const AdminContacts = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [contacts, setContacts] = useState([]);

  const [query, setQuery] = useState("");
  const [debouncingQuery, setDebouncingQuery] = useState("");

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncingQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

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

      return direction === "asc" ? String(aValue).localeCompare(bValue) : String(bValue).localeCompare(aValue);
    });
    setContacts(sorted);
    setSorted({ key, direction });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Admin Panel
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Contacts Management
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage details and monitor overview.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-500">Total Contacts</p>
            <p className="mt-1 text-xl font-bold text-gray-900 text-center">
              {contacts?.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search for contacts..."
      />

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 sm:px-6 py-4">
          <div className="left-part">
            <p className="text-sm font-semibold text-gray-900">
              Contacts Directory
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Below is the list of all contacts.
            </p>
          </div>
          {/* Refresh button */}
          <RefreshButton
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            onRefresh={handleData}
          />
        </div>

        {loading ? (
          <p className="text-2xl font-semibold text-center py-12 animate-pulse">
            Loading contacts...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className={LINKS}>Sr No.</th>
                  <th className={LINKS}>
                    <div className="flex items-center justify-between">
                      Name
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
                      User ID
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
                      User ID
                      <div className="flex items-center justify-center gap-3">
                        <IoMdArrowRoundUp
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("subject", "asc")}
                        />
                        <IoMdArrowRoundDown
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("subject", "desc")}
                        />
                      </div>
                    </div>
                  </th>
                  <th className={LINKS}>
                    <div className="flex items-center justify-between">
                      User ID
                      <div className="flex items-center justify-center gap-3">
                        <IoMdArrowRoundUp
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("message", "asc")}
                        />
                        <IoMdArrowRoundDown
                          className="cursor-pointer hover:text-emerald-500 transition duration-300"
                          onClick={() => handleSorted("message", "desc")}
                        />
                      </div>
                    </div>
                  </th>
                  <th className={LINKS}>View</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredContacts?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      No contacts found
                    </td>
                  </tr>
                ) : (
                  filteredContacts?.map((contact, index) => (
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
                        <NavLink
                          to={`/admin/contacts/${contact?._id}`}
                          className="w-fit flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                        >
                          View
                        </NavLink>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="border-t border-gray-100 bg-white px-5 py-4 text-xs text-gray-500">
          Showing {filteredContacts?.length} contact
          {filteredContacts?.length !== 1 ? "s" : ""}.
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
