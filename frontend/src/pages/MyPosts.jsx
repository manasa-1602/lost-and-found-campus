import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  deleteItem,
  getItems,
  updateItemStatus,
} from '../services/itemService'
import StatusBadge from '../components/StatusBadge'

function MyPosts() {
  const [items, setItems] = useState([])
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
      setError('Failed to load your posts.')
    } finally {
      setLoading(false)
    }
  }

  const markAsReturned = async (id) => {
    try {
      const updatedItem = await updateItemStatus(
        id,
        'Returned'
      )

      setItems((previousItems) =>
        previousItems.map((item) =>
          item._id === id ? updatedItem : item
        )
      )
    } catch (error) {
      console.error(error)
      setError('Failed to update item.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteItem(id)

      setItems((previousItems) =>
        previousItems.filter((item) => item._id !== id)
      )
    } catch (error) {
      console.error(error)
      setError('Failed to delete item.')
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Header */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>
          <p className="mb-2 text-sm font-medium text-gray-500">
            CAMPUS LOST & FOUND
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            My Posts
          </h1>

          <p className="mt-2 text-gray-600">
            Manage the items you have reported.
          </p>
        </div>

        <Link
          to="/post"
          className="inline-flex w-fit rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Post Item
        </Link>

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
            Loading your posts...
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

          <h2 className="text-lg font-semibold text-gray-900">
            No posts yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            You haven't posted any lost or found items.
          </p>

          <Link
            to="/post"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Post your first item
          </Link>

        </div>
      ) : (
        <div className="space-y-4">

          {items.map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <div className="flex flex-col md:flex-row">

                {/* Image */}

                <div className="flex h-48 w-full shrink-0 items-center justify-center bg-gray-100 md:h-40 md:w-48">

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">
                      No image
                    </span>
                  )}

                </div>

                {/* Content */}

                <div className="flex flex-1 flex-col justify-between p-5">

                  <div>

                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <StatusBadge status={item.status} />

                      <span className="text-xs text-gray-400">
                        {item.date}
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                      {item.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>
                        📍 {item.location}
                      </span>

                      <span>
                        📁 {item.category}
                      </span>
                    </div>

                  </div>

                  {/* Actions */}

                  <div className="mt-5 flex flex-wrap gap-3">

                    <Link
                      to={`/item/${item._id}`}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View Details
                    </Link>

                    {item.status !== 'Returned' && (
                      <button
                        onClick={() =>
                          markAsReturned(item._id)
                        }
                        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                      >
                        Mark as Returned
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(item._id)
                      }
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </main>
  )
}

export default MyPosts