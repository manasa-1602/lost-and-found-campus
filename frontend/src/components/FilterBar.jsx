function FilterBar({
  category,
  setCategory,
  location,
  setLocation,
  status,
  setStatus,
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        <option value="ID Cards">ID Cards</option>
        <option value="Bags">Bags</option>
        <option value="Clothing">Clothing</option>
        <option value="Accessories">Accessories</option>
        <option value="Keys">Keys</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
      >
        <option value="">All Locations</option>
        <option value="Library">Library</option>
        <option value="Classroom">Classroom</option>
        <option value="Laboratory">Laboratory</option>
        <option value="Cafeteria">Cafeteria</option>
        <option value="Parking">Parking</option>
        <option value="Playground">Playground</option>
        <option value="Hostel">Hostel</option>
        <option value="Auditorium">Auditorium</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
      >
        <option value="">All Items</option>
        <option value="Lost">Lost</option>
        <option value="Found">Found</option>
        <option value="Returned">Returned</option>
      </select>
    </div>
  )
}

export default FilterBar