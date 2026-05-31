import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addFavorite, removeFavorite, getFavorites } from "../utils/favorites";

const propertiesData = [
  {
    id: 1,
    title: "Luxury Villa",
    type: "Villa",
    category: "Buy",
    price: 15000000,
    location: "Hyderabad",
    status: "Ready to Move",
  },
  {
    id: 2,
    title: "Modern Apartment",
    type: "Apartment",
    category: "Rent",
    price: 25000,
    location: "Bangalore",
    status: "Under Construction",
  },
  {
    id: 3,
    title: "Open Plot",
    type: "Land",
    category: "Buy",
    price: 4000000,
    location: "Vizag",
    status: "Ready to Move",
  },
  {
    id: 4,
    title: "Commercial Shop",
    type: "Shop",
    category: "Rent",
    price: 50000,
    location: "Chennai",
    status: "Ready to Move",
  },
];

function PropertyListing() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const [search, setSearch] = useState(searchQuery);
  const [filter, setFilter] = useState("All");
  const [favorites, setFavorites] = useState(getFavorites());

  // SEARCH + FILTER LOGIC
  const filteredData = propertiesData.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || item.category === filter;

    return matchSearch && matchFilter;
  });

  // FAVORITE TOGGLE
  const toggleFavorite = (item) => {
    const exists = favorites.find((p) => p.id === item.id);

    if (exists) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }

    setFavorites(getFavorites());
  };

  return (
    <div className="p-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-4">
        Explore Properties 🏡
      </h1>

      {/* SEARCH + FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search city or property..."
          value={search}
          className="border p-2 w-full rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FILTER */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>

      </div>

      {/* PROPERTY GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {filteredData.map((item) => {
          const isFav = favorites.some((f) => f.id === item.id);

          return (
            <div
              key={item.id}
              className="shadow-lg rounded-xl p-4 bg-white relative hover:scale-105 transition"
            >

              {/* FAVORITE BUTTON */}
              <button
                onClick={() => toggleFavorite(item)}
                className="absolute top-2 right-2 text-xl"
              >
                {isFav ? "❤️" : "🤍"}
              </button>

              {/* STATUS BADGE */}
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

              {/* VIEW BUTTON */}
              <button
                onClick={() =>
                  navigate(`/property/${item.id}`)
                }
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded w-full"
              >
                View Details
              </button>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default PropertyListing;