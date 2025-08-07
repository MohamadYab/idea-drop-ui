import { Link } from "@tanstack/react-router"

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/">
          <h1>IdeaDrop</h1>
        </Link>
        <nav
          className="flex items-center space-x-4"
        >
          <Link
            to="/ideas"
          >
            Ideas
          </Link>
          <Link
            to="/ideas/new"
            className="bg-blue-600 text-white rounded px-4 py-1 hover:bg-blue-700 transition"
          >
            New Idea +
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header