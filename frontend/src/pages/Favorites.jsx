import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import { getFavorites, removeFavorite } from "../utils/favorites";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // REMOVE FAVORITE
  const handleRemove = (id) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  return (
    <>
      <Navbar />

      <div className="p-6">

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-4">
          My Favorite Properties ❤️
        </h1>

        {/* EMPTY STATE */}
        {favorites.length === 0 ? (
          <div className="text-center mt-10">
            <h2 className="text-xl text-gray-500">
              No Favorites Added Yet 😢
            </h2>

            <button
              onClick={() => navigate("/properties")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Explore Properties
            </button>
          </div>
        ) : (
          /* GRID */
          <div className="grid md:grid-cols-3 gap-6">

            {favorites.map((item) => (
              <div
                key={item.id}
                className="shadow-lg rounded-xl p-4 bg-white relative hover:scale-105 transition"
              >

                {/* REMOVE BUTTON */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 text-xl"
                >
                  ❌
                </button>

                {/* STATUS */}
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  {item.status}
                </span>

                {/* TITLE */}
                <h2 className="font-bold mt-2">
                  {item.title}
                </h2>

                {/* LOCATION */}
                <p className="text-gray-500">
                  📍 {item.location}
                </p>

                {/* TYPE */}
                <p>
                  Type: <b>{item.type}</b>
                </p>

                {/* PRICE */}
                <p className="text-red-500 font-bold mt-2">
                  ₹ {item.price}
                </p>

                {/* VIEW DETAILS */}
                <button
                  onClick={() =>
                    navigate(`/property/${item.id}`)
                  }
                  className="mt-3 bg-blue-500 text-white px-3 py-1 rounded w-full"
                >
                  View Details
                </button>

              </div>
            ))}

          </div>
        )}
      </div>
    </>
  );
}

export default Favorites;