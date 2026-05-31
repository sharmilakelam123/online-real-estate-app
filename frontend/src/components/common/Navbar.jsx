import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow bg-white">
      {/* LOGO */}
      <h1 className="text-2xl font-bold text-red-500">
        RealEstate Pro
      </h1>

      {/* LINKS */}
      <div className="flex gap-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-red-500">
          Home
        </Link>

        <Link to="/properties" className="hover:text-red-500">
          Properties
        </Link>

        <Link to="/add-property" className="hover:text-red-500">
          Sell
        </Link>

        <Link to="/favorites" className="hover:text-red-500">
          Favorites
        </Link>

        <Link to="/login" className="hover:text-red-500">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

