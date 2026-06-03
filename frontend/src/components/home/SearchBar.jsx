import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveRecentlySearched } from "../../utils/activity";

function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    saveRecentlySearched(search);
    navigate(`/search-results?search=${search}`);
  };

  return (
    <div className="flex gap-3">

      <input
        type="text"
        placeholder="Search city or property..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-lg text-black bg-white placeholder-gray-500 outline-none"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;