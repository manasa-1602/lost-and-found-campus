import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="block">
          <h1 className="text-xl font-bold text-gray-900">
            Lost & Found
          </h1>

          <p className="text-xs text-gray-500">
            Campus Community
          </p>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Home
          </Link>

          <Link
            to="/my-posts"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            My Posts
          </Link>

          <Link
            to="/post"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            + Post Item
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar