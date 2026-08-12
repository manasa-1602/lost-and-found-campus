function SearchBar({ search, setSearch }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for an item..."
        className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3.5 pl-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
      />

      <svg
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
        />
      </svg>
    </div>
  )
}

export default SearchBar