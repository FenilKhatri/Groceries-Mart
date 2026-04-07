import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ query, setQuery, placeholder = "Search here...", className = "" }) => {
  return (
    <>
      <div className="mt-5 group flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 focus-within:border-emerald-400 focus-within:shadow-lg">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 transition group-focus-within:bg-emerald-100">
          <IoMdSearch size={20} />
        </div>

        <input
          type="text"
          className="flex-1 outline-none"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query && (
          <button
            className="cursor-pointer rounded-xl px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setQuery("")}
          >
            Clear
          </button>
        )}
      </div>
    </>
  );
};

export default SearchBar;
