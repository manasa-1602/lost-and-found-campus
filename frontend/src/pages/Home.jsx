import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import FilterBar from '../components/FilterBar'
import SearchBar from '../components/SearchBar'
import { getItems } from '../services/itemService'

function Home() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      setLoading(true)

      const data = await getItems()

      setItems(data)
    } catch (error) {
      console.error(error)
      setError('Failed to load items.')
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      filter === 'All' ||
      item.type === filter ||
      item.location === filter ||
      item.category === filter

    return matchesSearch && matchesFilter
  })

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Header */}

      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-gray-500">
          CAMPUS LOST & FOUND
        </p>

        <h1 className="text-3xl font-bold text-gray-900">
          Lost something? Found something?
        </h1>

        <p className="mt-2 max-w-2xl text-gray-600">
          Find lost belongings or help someone reunite with
          something they lost on campus.
        </p>
      </div>

      {/* Search */}

      <div className="mb-6">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
      </div>

      {/* Filters */}

      <div className="mb-8">
        <FilterBar
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      {/* Error */}

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <div className="py-16 text-center">
          <p className="text-sm text-gray-500">
            Loading items...
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            No items found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
            />
          ))}
        </div>
      )}

    </main>
  )
}

export default Home