function SearchBar() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg flex gap-3 w-full max-w-4xl">
      <input
        type="text"
        placeholder="Search City, Area, Project..."
        className="border p-3 rounded-lg flex-1"
      />

      <select className="border p-3 rounded-lg">
        <option>Buy</option>
        <option>Rent</option>
      </select>

      <button className="bg-red-500 text-white px-6 rounded-lg">
        Search
      </button>
    </div>
  );
}

export default SearchBar;