import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteItem, getItemById, updateItemStatus } from '../services/itemService'
import StatusBadge from '../components/StatusBadge'

function ItemDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadItem()
  }, [id])

  const loadItem = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getItemById(id)

      setItem(data)
    } catch (error) {
      console.error(error)
      setError('Item not found.')
    } finally {
      setLoading(false)
    }
  }

  const handleReturned = async () => {
    try {
      const updatedItem = await updateItemStatus(
        id,
        'Returned'
      )

      setItem(updatedItem)
    } catch (error) {
      console.error(error)
      setError('Failed to update item.')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteItem(id)

      navigate('/')
    } catch (error) {
      console.error(error)
      setError('Failed to delete item.')
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="text-sm text-gray-500">
          Loading item...
        </p>
      </main>
    )
  }

  if (error || !item) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Item not found
        </h1>

        <p className="mt-2 text-gray-500">
          This item may have been deleted or doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white"
        >
          Back to Home
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">

      <Link
        to="/"
        className="mb-6 inline-block text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        ← Back to Home
      </Link>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="grid md:grid-cols-2">

          {/* Image */}

          <div className="flex min-h-[350px] items-center justify-center bg-gray-100">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="h-full max-h-[500px] w-full object-cover"
              />
            ) : (
              <span className="text-sm text-gray-400">
                No image available
              </span>
            )}
          </div>

          {/* Details */}

          <div className="p-6 sm:p-8">

            <div className="mb-4 flex items-center gap-3">
              <StatusBadge status={item.status} />

              <span className="text-sm text-gray-400">
                {item.type}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {item.title}
            </h1>

            <p className="mt-5 text-sm leading-6 text-gray-600">
              {item.description}
            </p>

            <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Category
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {item.category}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Location
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  📍 {item.location}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Date
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {item.date}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Contact
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {item.contact}
                </p>
              </div>

            </div>

            {/* Actions */}

            <div className="mt-8 flex flex-wrap gap-3">

              {item.status !== 'Returned' && (
                <button
                  onClick={handleReturned}
                  className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Mark as Returned
                </button>
              )}

              <button
                onClick={handleDelete}
                className="rounded-lg border border-red-200 px-5 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Delete Item
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}

export default ItemDetails