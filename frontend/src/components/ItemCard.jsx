import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

function ItemCard({ item }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      {/* Image */}

      <div className="h-48 bg-gray-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-gray-400">
              No image
            </span>
          </div>
        )}
      </div>

      {/* Content */}

      <div className="p-5">

        <div className="mb-3 flex items-center justify-between">
          <StatusBadge status={item.status} />

          <span className="text-xs text-gray-400">
            {item.type}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          {item.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {item.description}
        </p>

        <div className="mt-4 space-y-1 text-sm text-gray-500">
          <p>📍 {item.location}</p>
          <p>📁 {item.category}</p>
          <p>📅 {item.date}</p>
        </div>

        <Link
          to={`/item/${item._id}`}
          className="mt-5 block rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-medium text-white hover:bg-gray-800"
        >
          View Details
        </Link>

      </div>
    </div>
  )
}

export default ItemCard